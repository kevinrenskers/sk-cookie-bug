import { json, type RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ cookies }) => {
  console.log("Deleting token cookie");
  cookies.delete("token");
  return json({ ok: true });
};
