import { RedisClient } from "@/libs/redis";
import { RedisKeys } from "@/libs/redis/types";
import type { DBMember, MemberDTO } from "@ved-poc-monorepo/shared";
import { cookies } from "next/headers";

export const GET = async (_: Request): Promise<Response> => {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");
    if (!sessionCookie) {
      return new Response("Unauthorized: No session cookie", { status: 401 });
    }

    const session = JSON.parse(sessionCookie.value);
    if (!session || !session.email) {
      return new Response("Unauthorized: Invalid session", { status: 401 });
    }

    const memberId = session.email;
    if (!memberId) {
      return new Response("Member ID not found in session", { status: 400 });
    }

    const redis = new RedisClient<DBMember>(
      process.env.REDIS_URL || "",
      RedisKeys.MEMBER_PREFIX
    );
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

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = (await req.json()) as MemberDTO;

    const email = body.email;
    const level = body.level;
    const promotions = body.promotions || [];

    if (!email || !level) {
      return new Response("Invalid member data", { status: 400 });
    }

    const memberId = email; // Using email as the unique identifier

    const memberData: DBMember = {
      id: memberId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      level: body.level,
      memberSince: body.memberSince,
      promotions: Array.isArray(promotions)
        ? promotions.map((promo) => ({
            ...promo,
            id: promo.code,
            createdAt: Date.now(),
            updatedAt: Date.now(),
          }))
        : [],
    };

    const redis = new RedisClient<DBMember>(
      process.env.REDIS_URL || "",
      RedisKeys.MEMBER_PREFIX
    );
    await redis.connect();

    await redis.set(memberId, memberData);
    await redis.disconnect();

    return new Response("Member data saved successfully", { status: 200 });
  } catch (error) {
    console.error("Error saving member data:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
