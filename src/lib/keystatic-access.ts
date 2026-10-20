/**
 * The editor is available in development (local files) and in production only when
 * GitHub storage is configured, where Keystatic requires a GitHub login with write
 * access to the repo. Otherwise /keystatic and its API return 404.
 */
export const keystaticEnabled = process.env.NODE_ENV !== "production" || process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github";
