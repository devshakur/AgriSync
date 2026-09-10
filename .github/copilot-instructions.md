# AgriSync — GitHub Copilot Instructions

## 1. Project Overview

AgriSync is a modern web application built with Next.js and TypeScript.

The project should be developed using clean, maintainable, scalable, and production-oriented frontend architecture.

Before making changes, always inspect the existing codebase and understand the current structure, conventions, reusable components, and implementation patterns.

Do not assume that a new implementation should replace an existing pattern unless there is a clear architectural reason to do so.

---

# 2. Technology Stack

Use the following technologies and conventions:

- Next.js
- App Router
- TypeScript
- React
- Tailwind CSS
- Axios
- TanStack Query
- Context
- Formik
- Yup
- REST APIs

Do not introduce another library when an existing project dependency can solve the problem.

Do not add dependencies without a clear reason.

---

# 3. General Development Principles

Always prioritize:

1. Readability
2. Maintainability
3. Reusability
4. Type safety
5. Separation of concerns
6. Consistent architecture
7. Responsive design
8. Accessibility
9. Performance
10. Simplicity

Prefer simple solutions over unnecessarily complex abstractions.

Do not over-engineer small features.

Do not create abstractions until they provide a clear benefit.

---

# 4. Inspect Before Coding

Before implementing a feature or modifying existing code:

1. Inspect the relevant directories.
2. Identify existing components that can be reused.
3. Identify existing utilities and hooks.
4. Check existing naming conventions.
5. Check existing API patterns.
6. Check existing state-management patterns.
7. Check how similar features are implemented.
8. Follow the existing architecture unless there is a strong reason to improve it.

Never blindly create a new component, hook, utility, API service, or state store if an existing one can be reused.

---

# 5. Architecture

Use a feature-based architecture.

Feature-specific code should live inside its corresponding feature directory.

Preferred structure:

src/
├── app/
├── components/
├── features/
│   ├── auth/
│   ├── users/
│   ├── farmers/
│   └── ...
├── lib/
├── providers/
└── store/

A feature may contain:

features/
└── farmers/
    ├── api/
    ├── components/
    ├── hooks/
    ├── schemas/
    ├── types/
    └── utils/

Only create directories that are actually needed.

Do not create empty architectural folders just for the sake of following a template.

---

# 6. Component Architecture

Keep components focused on presentation and user interaction.

Avoid putting large amounts of business logic inside page components.

Prefer:

Page
→ Feature Component
→ Feature Hook
→ API / State

instead of placing everything inside the page.

Create reusable components when:

- The same UI is used multiple times.
- A component has a clear reusable purpose.
- Extracting it improves readability.

Do not create abstractions for one-off trivial elements unnecessarily.

---

# 7. React Rules

Use functional React components.

Use TypeScript for all new code.

Avoid `any`.

Prefer explicit types.

Use meaningful component and variable names.

Avoid unnecessary `useEffect`.

Do not use `useEffect` to replace proper data-fetching libraries or event-driven logic.

Keep React components as declarative as possible.

Prefer composition over complicated conditional logic.

---

# 8. Server State

Use TanStack Query for server/API state.

Examples of server state include:

- Farmers
- Users
- Orders
- Requests
- Products
- Notifications
- Dashboard data
- Marketplace data
- API responses

Do not store server/API data in Context unless there is a specific architectural reason.

Do not manually manage API loading, caching, refetching, and synchronization when TanStack Query can handle it.

Preferred architecture:

UI
→ TanStack Query Hook
→ Feature API Service
→ Axios Client
→ Backend API

---

# 9. TanStack Query

Feature-specific query hooks should live inside the feature's `hooks` directory.

Example:

features/farmers/hooks/useFarmers.ts

API functions should remain separate from React Query hooks.

Example:

features/farmers/api/farmers.api.ts

The API service should know how to communicate with the backend.

The React Query hook should manage:

- Query state
- Caching
- Refetching
- Mutations
- Query invalidation

Use query key factories for larger features.

Example:

const farmerKeys = {
  all: ["farmers"] as const,
  lists: () => [...farmerKeys.all, "list"] as const,
  details: () => [...farmerKeys.all, "detail"] as const,
};

Use consistent query keys.

After successful mutations, invalidate or update the appropriate queries.

Avoid unnecessary refetches.

---

# 10. Client State

Use Context only for client-side state that needs to be shared across components.

Examples:

- Sidebar state
- Modal state
- UI preferences
- Temporary client workflows
- Global UI state

Do not use Context as a replacement for TanStack Query.

Do not duplicate server state between Context and TanStack Query.

For state that is only needed by one component, prefer React state.

---

# 11. API Architecture

All API requests must go through the centralized Axios client.

Do not create Axios instances inside components.

Do not call `axios.get`, `axios.post`, etc. directly from UI components.

Preferred flow:

Component
→ Hook
→ Feature API Service
→ Central Axios Client
→ Backend

Example:

features/farmers/api/farmers.api.ts

The API service should contain backend communication logic.

Example responsibilities:

- GET requests
- POST requests
- PUT/PATCH requests
- DELETE requests
- Request parameters
- Request payloads
- Response typing

Keep API logic out of UI components.

---

# 12. Axios Client

Use a centralized Axios instance.

The Axios client should be responsible for common HTTP concerns such as:

- Base URL
- Common headers
- Credentials
- Request configuration
- Authentication handling when the backend contract is established
- Response handling
- Common error handling

Do not duplicate these configurations across feature APIs.

Never hardcode production API URLs inside application code.

Use environment variables.

---

# 13. Environment Variables

Use environment variables for environment-specific configuration.

Examples:

.env.local
.env.development
.env.production

Never hardcode:

- API URLs
- Secrets
- Tokens
- Private credentials
- Environment-specific configuration

Never expose private secrets through `NEXT_PUBLIC_*`.

Only variables that are intentionally safe for the browser should use the `NEXT_PUBLIC_` prefix.

---

# 14. Authentication

Authentication must remain centralized.

Do not implement authentication logic independently inside every page or feature.

The authentication architecture should support:

- Sign in
- Sign out
- Authenticated requests
- Session persistence
- Session renewal/refresh
- Protected routes

Do not invent authentication behavior when the backend contract is unknown.

Before implementing token refresh, inspect the existing backend/API contract or existing authentication implementation.

Do not assume the exact refresh endpoint, token format, cookie behavior, or authorization header format.

Authentication implementation must follow the actual backend contract.

---

# 15. Security

Never expose sensitive authentication credentials unnecessarily.

Do not store sensitive tokens in `localStorage` unless the project explicitly requires it and the security implications have been considered.

Prefer secure cookie-based authentication when supported by the backend.

Never log:

- Access tokens
- Refresh tokens
- Passwords
- Sensitive authentication data

Never hardcode credentials.

---

# 16. API Types

All API requests and responses should be properly typed.

Avoid:

any

Prefer interfaces or types that accurately represent the backend contract.

Example:

interface Farmer {
  id: string;
  name: string;
  phone: string;
}

Keep feature-specific API types inside the feature's `types` directory.

Do not duplicate the same type in multiple files.

If a type is genuinely shared across multiple features, move it to an appropriate shared location.

---

# 17. Runtime Validation

TypeScript provides compile-time type safety but does not validate runtime API responses.

Use Zod when runtime validation of external API data is necessary.

Keep runtime schemas separate from TypeScript types when appropriate.

Do not introduce runtime validation everywhere unnecessarily.

Prioritize validation at important external boundaries.

---

# 18. Forms

Use Formik for form state management.

Use Yup for form validation.

Keep validation schemas separate from the UI when they become substantial.

Preferred structure:

features/
└── farmers/
    ├── components/
    ├── schemas/
    └── ...

Forms should properly handle:

- Initial values
- Validation
- Submission
- Loading state
- Server errors
- Field errors
- Disabled states

Do not manually recreate form-state management when Formik is appropriate.

---

# 19. Error Handling

API errors should be handled consistently.

Do not expose raw technical errors directly to users.

Use a centralized API error abstraction where appropriate.

Differentiate between:

- Network errors
- Authentication errors
- Authorization errors
- Validation errors
- Not found errors
- Server errors

User-facing error messages should be clear and actionable.

Do not silently swallow errors unless there is a deliberate reason.

---

# 20. Loading States

Every asynchronous UI should have an appropriate loading state.

Prefer existing loading components or skeleton components when available.

Do not duplicate loading UI unnecessarily.

Loading states should prevent accidental duplicate submissions where appropriate.

---

# 21. Empty States

When a successful API request returns no data, use an appropriate empty state.

Do not treat an empty result as an error.

Empty states should explain:

- What is empty
- Why the user may be seeing the empty state
- What action the user can take, when applicable

Reuse existing empty-state components and illustrations where available.

---

# 22. Error and Not Found States

Use dedicated UI states for:

- API errors
- Network failures
- Unauthorized access
- Not found resources
- Empty data

Do not display generic blank screens.

Follow the project's existing visual language.

---

# 23. Responsive Design

All UI must be responsive.

Design for:

- Mobile
- Tablet
- Desktop

Use Tailwind responsive utilities.

Do not create separate pages for mobile and desktop unless there is a strong architectural reason.

Avoid fixed widths that cause horizontal scrolling.

Check layouts at common responsive breakpoints.

---

# 24. Styling

Use Tailwind CSS for styling.

Follow the existing design system and visual language.

Before introducing new colors, spacing, typography, shadows, or border styles, inspect existing components for established conventions.

Avoid arbitrary styling when an existing design token or utility already exists.

Do not use inline styles unless necessary.

---

# 25. Accessibility

Build accessible interfaces.

Use:

- Semantic HTML
- Proper labels
- Keyboard navigation
- Accessible buttons
- Meaningful alt text
- Appropriate ARIA attributes when necessary

Do not use a `<div>` as a button when a `<button>` is appropriate.

Interactive elements must be keyboard accessible.

---

# 26. Performance

Avoid unnecessary re-renders.

Do not add `useMemo`, `useCallback`, or `React.memo` automatically.

Only use memoization when there is a measurable or reasonable performance benefit. use React compiler 

Use Next.js image optimization where appropriate.

Avoid unnecessary client components.

---

# 27. Server vs Client Components

Use Next.js Server Components by default.

Add `"use client"` only when the component requires client-side functionality such as:

- React state
- Event handlers
- Browser APIs
- Client-side hooks
- TanStack Query
- Context

Do not turn an entire page into a Client Component when only a child component needs client-side behavior.

Keep the client boundary as small as reasonably possible.

---

# 28. Routing

Use Next.js App Router conventions.

Keep route-specific logic inside the appropriate `app` directory.

Do not create custom routing systems when Next.js routing can handle the requirement.

Keep role-based navigation and route mappings centralized rather than scattering route strings throughout components.

---

# 29. Naming Conventions

Use descriptive and consistent names.

Components:

PascalCase

Examples:

FarmerCard
RequestTable
ProfileForm

Hooks:

camelCase with `use` prefix

Examples:

useFarmers
useCreateFarmer
useCurrentUser

API services:

descriptive feature names

Examples:

farmers.api.ts
auth.api.ts

Types:

descriptive names ending with `.types.ts` where that convention is used.

Schemas:

descriptive names ending with `.schema.ts` where appropriate.

---

# 30. Reusability

Before creating a new component, search for an existing reusable component.

Examples:

- Button
- Input
- Select
- Modal
- Table
- Card
- Badge
- Dialog
- Empty state
- Loading state

Prefer extending an existing reusable component rather than creating a duplicate.

If a reusable component needs a new capability, consider whether the capability belongs in the shared component.

---

# 31. Avoid Duplication

Do not duplicate:

- API logic
- Validation logic
- UI components
- Types
- Constants
- Utility functions

If the same logic appears repeatedly, determine whether it should become a shared abstraction.

However, do not abstract code prematurely.

---

# 32. Pagination and Filtering

Use a consistent pattern for paginated APIs.

Common parameters may include:

- page
- limit
- search
- sort
- filters

Keep pagination/filtering types reusable where appropriate.

Do not create different pagination implementations for every feature unless the backend APIs genuinely differ.

---

# 33. Mutations

Use TanStack Query mutations for operations that modify server data.

Examples:

- Create
- Update
- Delete
- Approve
- Reject
- Assign
- Cancel

After mutations:

1. Handle success.
2. Handle errors.
3. Update or invalidate affected queries.
4. Provide appropriate user feedback.

Do not manually reload the entire browser after a mutation.

---

# 34. Code Quality

New code should:

- Be strongly typed
- Be readable
- Follow existing conventions
- Avoid unnecessary complexity
- Avoid duplication
- Have clear responsibilities
- Be easy to test

Do not leave:

- Debugging `console.log`
- Unused imports
- Unused variables
- Dead code
- Temporary hacks
- Commented-out old implementations

unless they are intentionally required.

---

# 35. Existing Code

Do not rewrite working code simply because another implementation is preferred.

When modifying an existing feature:

- Preserve existing behavior.
- Make the smallest appropriate change.
- Avoid unrelated refactoring.
- Do not change public APIs unnecessarily.
- Do not break existing components.

If a broader architectural change is genuinely necessary, explain why before making extensive changes.

---

# 36. New Features

When implementing a new feature, follow this process:

1. Inspect the existing architecture.
2. Identify the feature boundary.
3. Identify reusable components.
4. Identify required API endpoints.
5. Define request/response types.
6. Create the API service.
7. Create TanStack Query hooks where needed.
8. Create validation schemas where needed.
9. Build the UI.
10. Connect the UI to the feature hooks.
11. Handle loading, empty, error, and success states.
12. Verify responsive behavior.
13. Check for TypeScript errors.
14. Check for linting errors.
15. Avoid modifying unrelated code.

---

# 37. API Contract

Never invent backend fields, endpoints, query parameters, or response structures.

If the API contract is unclear:

- Inspect existing API usage.
- Inspect available backend documentation if provided.
- Ask for clarification when necessary.
- Clearly identify assumptions.

Do not silently invent an API contract just to make the UI work.

---

# 38. Copilot Behavior

When asked to implement something:

- First understand the existing code.
- Follow these instructions.
- Follow existing project conventions.
- Reuse existing code where possible.
- Make focused changes.
- Do not modify unrelated files.
- Do not introduce unnecessary dependencies.
- Do not over-engineer.

When there are multiple reasonable approaches, prefer the simplest approach that fits the existing architecture.

If an implementation conflicts with these instructions, prioritize:

1. Existing project requirements
2. Explicit developer/user instructions
3. Existing backend/API contract
4. These project conventions

---

# 39. Before Finishing Any Task

Before considering a task complete, verify:

- TypeScript types are correct.
- Imports are correct.
- No unnecessary files were created.
- No unrelated files were modified.
- Existing components were reused where appropriate.
- Loading states are handled.
- Error states are handled.
- Empty states are handled where applicable.
- Responsive behavior is considered.
- Accessibility is considered.
- API calls follow the centralized architecture.
- Server state uses TanStack Query.
- Client state uses the appropriate local state/Context approach.
- No secrets or sensitive credentials were exposed.
- No unnecessary dependencies were added.