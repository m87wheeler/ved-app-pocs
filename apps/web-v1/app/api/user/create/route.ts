import { RedisClient } from "@/libs/redis";
import type { DBUser } from "@ved-poc-monorepo/shared";

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = await req.json();
    const { email, password, confirmPassword, firstName, lastName } = body;

    if (!email || !password || !confirmPassword || !firstName || !lastName) {
      return new Response("All fields are required", { status: 400 });
    }

    if (password !== confirmPassword) {
      return new Response("Passwords do not match", { status: 400 });
    }

    const newUser: DBUser = {
      id: Date.now().toString(), // Simulated unique ID
      email,
      password,
      firstName,
      lastName,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const redis = new RedisClient<DBUser>(process.env.REDIS_URL || "");
    await redis.connect();

    const existingUser = await redis.get(email);
    if (existingUser) {
      await redis.disconnect();
      return new Response("User already exists", { status: 409 });
    }

    await redis.set(email, newUser);
    await redis.disconnect();

    return Response.json(newUser, { status: 201 });
  } catch (error) {
    console.error("Error during user creation:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
