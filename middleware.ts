export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard", "/assistants", "/call-logs", "/phone-numbers"],
};
