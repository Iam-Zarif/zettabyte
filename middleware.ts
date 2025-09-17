export { default as middleware } from "@/auth/auth"; // Use the default export as middleware
export const config = { matcher: ["/profile"] }; // Protect the profile route
