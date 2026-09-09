# Authentication Architecture Decision

## Status

**Accepted**

## Context

Agrisync uses token-based authentication between the frontend and backend.

The frontend communicates with the backend through an Axios API client. Authentication uses two tokens:

* **Access Token** — used to authenticate API requests.
* **Refresh Token** — used to obtain a new access token when the access token expires.

### Token Lifetime

| Token         | Lifetime | Purpose                   |
| ------------- | -------: | ------------------------- |
| Access Token  |    1 day | Authenticate API requests |
| Refresh Token |   7 days | Obtain a new access token |

The access token is intentionally shorter-lived than the refresh token. This allows the application to continue the user's session without requiring the user to log in every day.

---

# Decision

We will implement authentication using an **access token + refresh token** architecture.

During the current development phase, tokens are stored in `localStorage`.

The API client is responsible for:

1. Attaching the access token to outgoing requests.
2. Detecting `401 Unauthorized` responses.
3. Refreshing the access token when necessary.
4. Retrying the failed request once.
5. Preventing infinite retry loops.
6. Preventing multiple simultaneous refresh requests.
7. Logging the user out when the refresh token is invalid or expired.

---

# Token Storage

During development, tokens are stored in `localStorage`.

```text
localStorage
│
├── accessToken
└── refreshToken
```

Example:

```ts
localStorage.setItem("accessToken", accessToken);
localStorage.setItem("refreshToken", refreshToken);
```

The access token is used for normal API requests.

The refresh token is only used when the access token needs to be renewed.

---

# Normal Request Flow

Every authenticated API request uses the access token.

The Axios request interceptor retrieves the token from storage and attaches it to the `Authorization` header.

```http
Authorization: Bearer <accessToken>
```

The flow is:

```text
Component
   │
   ▼
apiClient.get("/farms")
   │
   ▼
Request Interceptor
   │
   ├── Read accessToken
   │
   └── Add Authorization header
   │
   ▼
Backend
   │
   ▼
Response
```

The application code does not need to manually attach the access token to every request.

Instead of:

```ts
apiClient.get("/farms", {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

engineers should simply use:

```ts
apiClient.get("/farms");
```

The API client handles authentication automatically.

---

# Access Token Expiration

The access token has a lifetime of **1 day**.

When the token expires, the backend returns:

```http
401 Unauthorized
```

The frontend treats this as a possible authentication expiration.

The response interceptor then attempts to obtain a new access token using the refresh token.

```text
API Request
     │
     ▼
Backend
     │
     ▼
401 Unauthorized
     │
     ▼
Response Interceptor
     │
     ▼
Refresh Access Token
     │
     ▼
Retry Original Request
```

---

# Refresh Token Flow

When an access token expires:

```text
                    API Request
                        │
                        ▼
                  Access Token
                        │
                        ▼
                    Backend
                        │
                  Token expired
                        │
                        ▼
                  401 Unauthorized
                        │
                        ▼
              Response Interceptor
                        │
                        ▼
                 Refresh Token
                        │
                        ▼
                GET /auth/refresh
                        │
                        ▼
                New Access Token
                        │
                        ▼
              Save new access token
                        │
                        ▼
               Retry original request
                        │
                        ▼
                    Backend
                        │
                        ▼
                    200 OK
```

The user does not need to log in again when the access token expires, as long as the refresh token is still valid.

---

# Refresh Token Lifetime

The refresh token has a lifetime of **7 days**.

Therefore:

```text
Access Token
1 day
│
├── expires
│
└── can be renewed using refresh token

Refresh Token
7 days
│
├── remains valid after access token expires
│
└── expires after 7 days
```

Once the refresh token expires or becomes invalid, the user must authenticate again.

---

# Refresh Request Deduplication

A critical part of the architecture is preventing multiple refresh requests from being sent simultaneously.

This can happen when several API requests are made at approximately the same time.

For example:

```text
GET /profile       → 401
GET /farms         → 401
GET /notifications → 401
GET /orders        → 401
GET /messages      → 401
```

Without refresh deduplication, the application could make:

```text
401 → refresh
401 → refresh
401 → refresh
401 → refresh
401 → refresh
```

This results in five refresh requests.

That is unnecessary and can create race conditions.

---

# Shared Refresh Promise

The API client maintains a shared `refreshPromise`.

```ts
let refreshPromise: Promise<string> | null = null;
```

The first request that encounters a `401` starts the refresh request.

```text
Request A
   │
   ▼
401
   │
   ▼
Start refresh
   │
   ▼
refreshPromise
```

If another request encounters `401` while the refresh is already running, it does not start another refresh request.

Instead, it waits for the existing promise.

```text
Request A → 401 ─────────┐
                         │
Request B → 401 ─────────┤
                         │
Request C → 401 ─────────┤
                         ▼
                  ONE refresh request
                         │
                         ▼
                  New access token
                         │
              ┌──────────┼──────────┐
              ▼          ▼          ▼
           Request A  Request B  Request C
             retry      retry      retry
```

This means multiple failed requests share one refresh operation.

---

# Why `refreshPromise` Is Reset

After the refresh operation finishes, the shared promise must be cleared.

```ts
refreshPromise = refreshAccessToken().finally(() => {
  refreshPromise = null;
});
```

This allows future token-expiration events to create a new refresh request.

The lifecycle is:

```text
No refresh running
      │
      ▼
401 detected
      │
      ▼
Create refreshPromise
      │
      ▼
Refresh token request
      │
      ▼
Refresh succeeds/fails
      │
      ▼
refreshPromise = null
```

---

# `_retry` Protection

Every failed request is marked with a `_retry` property.

```ts
originalRequest._retry = true;
```

This prevents an infinite refresh loop.

Without `_retry`, the following could happen:

```text
Request
   │
   ▼
401
   │
   ▼
Refresh
   │
   ▼
Retry request
   │
   ▼
401
   │
   ▼
Refresh again
   │
   ▼
Retry again
   │
   ▼
401
   │
   ▼
...
```

With `_retry`:

```text
Request
   │
   ▼
401
   │
   ▼
_retry = true
   │
   ▼
Refresh
   │
   ▼
Retry request
   │
   ▼
401
   │
   ▼
Already retried
   │
   ▼
Reject request
```

Each request can therefore trigger the refresh-and-retry process **at most once**.

---

# Refresh Failure

If the refresh request fails, the user's session can no longer be renewed.

Possible causes include:

* Refresh token expired.
* Refresh token is invalid.
* Refresh token has been revoked.
* Backend rejects the refresh request.
* Network/server failure prevents refreshing.

When refresh fails, the frontend removes both tokens:

```ts
localStorage.removeItem("accessToken");
localStorage.removeItem("refreshToken");
```

The application should then redirect the user to the login page or otherwise transition the application into an unauthenticated state.

Flow:

```text
401
 │
 ▼
Refresh token
 │
 ▼
Refresh fails
 │
 ▼
Remove tokens
 │
 ▼
Unauthenticated state
 │
 ▼
Login
```

---

# Logout

Logout must clear both credentials.

```text
Logout
  │
  ├── Remove accessToken
  │
  └── Remove refreshToken
```

If the backend provides a logout/revocation endpoint, the frontend should also notify the backend.

Example:

```http
POST /auth/logout
```

The backend can then invalidate/revoke the refresh token.

---

# Authentication Responsibilities

Authentication responsibilities are intentionally divided between the application and the API client.

### Application

Responsible for:

* Login UI.
* Collecting credentials.
* Calling the login endpoint.
* Storing returned tokens.
* Logout UI.
* Redirecting unauthenticated users where appropriate.

### API Client

Responsible for:

* Attaching access tokens.
* Detecting `401` responses.
* Refreshing expired access tokens.
* Deduplicating refresh requests.
* Retrying failed requests.
* Preventing infinite retry loops.
* Clearing authentication state when refresh fails.

This keeps authentication behavior centralized rather than duplicated across components.

---

# High-Level Architecture

```text
┌─────────────────────────────────────────────┐
│                  Agrisync UI                │
│                                             │
│ Login / Dashboard / Farms / Orders / etc.  │
└──────────────────────┬──────────────────────┘
                       │
                       ▼
                ┌──────────────┐
                │  apiClient   │
                │    Axios     │
                └──────┬───────┘
                       │
             ┌─────────┴─────────┐
             │                   │
             ▼                   ▼
      Request Interceptor   Response Interceptor
             │                   │
             ▼                   ▼
       accessToken              401
             │                   │
             │                   ▼
             │             refreshPromise
             │                   │
             │                   ▼
             │             /auth/refresh
             │                   │
             │                   ▼
             │            new accessToken
             │                   │
             │                   ▼
             │              retry request
             │
             ▼
          Backend
```

---

# Current Development Storage

For the current development environment:

```text
localStorage
├── accessToken
└── refreshToken
```

This is a development implementation and is not considered the final production authentication storage strategy.

---

# Production Migration

Before production, authentication storage should be reviewed and migrated toward a more secure browser-based session architecture.

The production implementation is expected to use **HttpOnly cookies** for authentication credentials where appropriate.

The exact production architecture will be documented separately once the backend authentication contract is finalized.

The development API-client architecture should therefore keep token handling centralized so that changing the storage mechanism later does not require rewriting every API call throughout the application.

---

# Engineering Rules

When working with authentication in Agrisync:

1. **Do not manually attach access tokens to individual API calls.**
2. Use `apiClient` for authenticated API requests.
3. Use `accessToken` for normal API authentication.
4. Use `refreshToken` only for the refresh operation.
5. Never use the refresh token as the normal `Authorization` token.
6. Never create a separate refresh implementation inside individual components.
7. Respect the `_retry` mechanism.
8. Do not create multiple independent refresh requests.
9. Keep refresh logic centralized inside the API client/authentication layer.
10. If refresh fails, clear the authentication credentials and transition the user to an unauthenticated state.

---

# Summary

The current authentication architecture is:

```text
                    LOGIN
                      │
                      ▼
          accessToken + refreshToken
                      │
                      ▼
                  localStorage
                      │
             ┌────────┴────────┐
             │                 │
       accessToken        refreshToken
             │                 │
             ▼                 │
       Normal API calls        │
             │                 │
             ▼                 │
           401 ────────────────┘
             │
             ▼
      Refresh access token
             │
             ▼
       Save new token
             │
             ▼
       Retry request
             │
             ▼
           Success

If refresh fails:

             401
              │
              ▼
       Refresh fails
              │
              ▼
       Clear both tokens
              │
              ▼
          Login again
```

The key architectural principles are:

**Centralized token handling + automatic refresh + `_retry` protection + refresh-request deduplication + clear separation between access and refresh tokens.**

---

# Session Restoration (`/auth/profile`)

Tokens are the only thing persisted in `localStorage`; the authenticated `user` object is never stored client-side. `GET /auth/profile` is the endpoint used to restore/verify the current authenticated user whenever the frontend does not already have that user in its auth state.

```text
                   LOGIN
                     │
                     ▼
            login response (has user)
                     │
                     ▼
                setUser()
                     │
                     ▼
                 Dashboard
                     │
              ┌──────┴──────┐
              │             │
          navigate       refresh
              │             │
              ▼             ▼
         keep state    GET /auth/profile
                              │
                              ▼
                          setUser()
```

Rules:

1. On login/signup, the response already contains the `user` — call `setUser()` directly. Do **not** call `/auth/profile` right after login.
2. `/auth/profile` is only called once, when the app mounts (covers first load and full-page refresh) and only if an access token exists in storage.
3. Client-side navigation between routes reuses the in-memory auth state; it must not re-trigger `/auth/profile`.
4. A `401` from `/auth/profile` clears the stored tokens and puts the app into an unauthenticated state (redirect to login).

This keeps `/auth/profile` as the single source of truth for "who is the current user" without requiring a network call on every page.
