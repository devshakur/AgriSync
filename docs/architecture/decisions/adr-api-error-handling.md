# ADR: Centralized API error handling

Date: 2026-09-08

## Status
Accepted

## Context
We are making network requests through Axios across multiple features and screens. Each request can fail with different payload shapes depending on the backend, such as:

- `{ message: "Invalid credentials" }`
- `{ error: "Something went wrong" }`
- `{ errors: ["A field is required"] }`
- `{ errors: { email: ["Email is invalid"] } }`

If we access these values directly in each component or service, we end up repeating logic like:

```ts
error?.response?.data?.message
```

This leads to repeated error parsing, inconsistent UI messages, and brittle handling when the backend API shape changes.

## Decision
We will normalize Axios and other runtime errors into a single `ApiError` abstraction and expose a small `getErrorMessage(error)` helper for UI usage.

The flow is:

1. Catch the raw error.
2. Pass it through `normalizeApiError(error)`.
3. Use `ApiError.message` or `getErrorMessage(error)` for toasts, alerts, or inline error states.
4. Preserve the original status, code, data, and cause for debugging and logging.

This keeps the application code focused on behavior instead of backend payload details.

## Why this pattern
This gives us a consistent contract:

```ts
try {
  await apiClient.get("/profile");
} catch (error) {
  const message = getErrorMessage(error);
  setError(message);
}
```

Benefits:
- no repeated `error.response.data` access across the codebase
- consistent user-facing messages
- easier testing
- better handling of backend variation
- cleaner separation between transport errors and UI logic

## Resulting API
```ts
import { getErrorMessage, normalizeApiError } from "@/lib/api/errors";
```

Example:

```ts
const message = getErrorMessage(error);
```

This returns the most relevant user-facing text while keeping the richer error object available through `normalizeApiError(error)`.

## Consequences
- Components should prefer the abstraction rather than raw Axios fields.
- New API integrations should return standardized backend messages when possible.
- UI code can remain simple and consistent while the transport layer remains flexible.
