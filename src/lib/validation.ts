/**
 * Returns true when any of the provided field values is empty or
 * contains only whitespace.
 *
 * Reusable across any form (signup, login, etc.).
 */
export const hasEmptyFields = (...fields: string[]): boolean =>
  fields.some((field) => field.trim() === "");
