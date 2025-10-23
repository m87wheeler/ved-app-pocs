import { RedisClient } from "@/libs/redis";
import { DBSessionBridge } from "@ved-poc-monorepo/shared";

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = await req.json();
    const { session } = body;

    if (!session) {
      return new Response("session is required", { status: 400 });
    }

    const sessionData = JSON.parse(session);
    const { key, memberId, promoId } = sessionData ?? {};

    if (!key || !memberId || !promoId) {
      return new Response("Invalid session data", { status: 400 });
    }

    const redis = new RedisClient<DBSessionBridge>(process.env.REDIS_URL || "");
    await redis.connect();

    const sessionBridge = await redis.get(key);
    await redis.disconnect();
    if (!sessionBridge) {
      return new Response("Session bridge not found", { status: 404 });
    }

    if (
      sessionBridge.memberId !== memberId ||
      sessionBridge.promoId !== promoId
    ) {
      return new Response("Session data mismatch", { status: 400 });
    }

    if (sessionBridge.expiresAt < Date.now()) {
      return new Response("Session bridge has expired", { status: 410 });
    }

    return new Response("Session bridge verified", { status: 200 });
  } catch (error) {
    console.error("Error during session bridge verification:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
