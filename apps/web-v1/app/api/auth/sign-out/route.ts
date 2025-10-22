import { cookies } from "next/headers";

export const POST = async (_: Request): Promise<Response> => {
  try {
    const cookieStore = await cookies();

    const sessionCookie = cookieStore.get("session");
    if (!sessionCookie) {
      return new Response("No active session", { status: 400 });
    }

    cookieStore.delete("session");

    return new Response("Signed out successfully", { status: 200 });
  } catch (error) {
    console.error("Error during sign-out:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
