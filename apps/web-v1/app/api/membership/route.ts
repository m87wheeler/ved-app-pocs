import { RedisClient } from "@/libs/redis";
import type { DBMember } from "@ved-poc-monorepo/shared";

export const GET = async (req: Request): Promise<Response> => {
  try {
    const { searchParams } = new URL(req.url);
    const memberId = searchParams.get("memberId");

    if (!memberId) {
      return new Response("Bad Request: memberId is required", { status: 400 });
    }

    const redis = new RedisClient<DBMember>(process.env.REDIS_URL || "");
    await redis.connect();

    const member = await redis.get(memberId);
    await redis.disconnect();
    if (!member) {
      return new Response("Member not found", { status: 404 });
    }

    return Response.json(member, { status: 200 });
  } catch (error) {
    console.error("Error retrieving member:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
