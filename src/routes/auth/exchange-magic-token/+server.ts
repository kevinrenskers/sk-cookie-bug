import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies }) => {
  const token = "ABC123";
  console.log(`Storing token in cookie: ${token}`);
  cookies.set("token", token, { path: "/", httpOnly: true, maxAge: 31536000 });
  return json({ token });
};
