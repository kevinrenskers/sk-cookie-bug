import type { Handle } from "@sveltejs/kit";
import cookie from "cookie";

export const handle: Handle = async ({ event, resolve }) => {
  const cookies = cookie.parse(event.cookies.get("cookie") || "");
  event.locals.token = cookies.token;
  return await resolve(event);
};
