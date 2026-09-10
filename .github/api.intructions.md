---
applyTo: "src/features/**/api/**/*.ts,src/features/**/hooks/**/*.ts,src/lib/api/**/*.ts"
---

# AgriSync API & TanStack Query Instructions

## 1. API Architecture

Use this architecture for all server communication:

UI Component
→ Feature Hook
→ TanStack Query
→ Feature API Service
→ Central Axios Client
→ Backend API

Never skip layers without a clear reason.

UI components must not make direct Axios/API calls.

---

## 2. Central Axios Client

All HTTP requests must use the centralized Axios client.

Example location:

src/lib/api/client.ts

Do not:
 
- Create Axios instances inside features.
- Import Axios directly into React components.
- Duplicate base URL configuration.
- Hardcode API URLs.
- Duplicate authentication configuration.

Feature API services should import and use the centralized client.

Example:

```ts
import { apiClient } from "@/lib/api/client";

export const farmersApi = {
  getAll: async () => {
    const response = await apiClient.get("/farmers");
    return response.data;
  },
};