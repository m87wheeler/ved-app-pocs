import { RedisClient } from "@/libs/redis";
import type { DBSessionBridge } from "@ved-poc-monorepo/shared";
import { v4 as uuidv4 } from "uuid";

export const POST = async (req: Request): Promise<Response> => {
  try {
    const body = await req.json();
    const { memberId, promoId } = body;

    if (!memberId || !promoId) {
      return new Response("memberId and promoId are required", { status: 400 });
    }

    const sessionBridgeKey = uuidv4();

    const redis = new RedisClient<DBSessionBridge>(process.env.REDIS_URL || "");
    await redis.connect();

    const newSessionBridge: DBSessionBridge = {
      id: sessionBridgeKey,
      key: sessionBridgeKey,
      memberId,
      promoId,
      expiresAt: Date.now() + 1000 * 60 * 15, // 15 minutes from now
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    const success = await redis.set(sessionBridgeKey, newSessionBridge);
    await redis.disconnect();
    if (!success) {
      return new Response("Failed to create session bridge", { status: 500 });
    }

    return Response.json(JSON.stringify(newSessionBridge), { status: 201 });
  } catch (error) {
    console.error("Error during session bridge creation:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
};
