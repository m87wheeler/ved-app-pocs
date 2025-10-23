import type { DBUser } from "@ved-poc-monorepo/shared";
import { RedisClient } from "@/libs/redis";
import { cookies } from "next/headers";

export const POST = async (req: Request): Promise<Response> => {
  try {
    const cookieStore = await cookies();

    const body = await req.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response("Email and password are required", { status: 400 });
    }

    const redis = new RedisClient<DBUser>(process.env.REDIS_URL || "");
    await redis.connect();

    const user = await redis.get(email);
    await redis.disconnect();
    if (!user || user.password !== password) {
      return new Response("Invalid email or password", { status: 401 });
    }

    cookieStore.set(
      "session",
      JSON.stringify({ userId: user.id, email: user.email }),
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
      }
    );

    return new Response("Signed in successfully", { status: 200 });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
