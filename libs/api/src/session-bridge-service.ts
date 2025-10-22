import { DBSessionBridge } from "@ved-poc-monorepo/shared";

interface ISessionBridgeApiService {
  create(memberId: string, promoId: string): Promise<DBSessionBridge | null>;
  verify(session: DBSessionBridge): Promise<boolean>;
}

export class SessionBridgeApiService implements ISessionBridgeApiService {
  private origin: string | null = null;

  constructor(origin: string) {
    this.origin = origin;
  }

  public async create(
    memberId: string,
    promoId: string
  ): Promise<DBSessionBridge | null> {
    try {
      const response = await fetch(`${this.origin}/api/session-bridge/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ memberId, promoId }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to create session bridge: ${response.statusText}`
        );
      }

      const data = await response.json();
      return JSON.parse(data) as DBSessionBridge;
    } catch (error) {
      console.error("Error creating session bridge:", error);
      return null;
    }
  }

  public async verify(session: DBSessionBridge): Promise<boolean> {
    try {
      const response = await fetch(`${this.origin}/api/session-bridge/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ session }),
      });

      if (!response.ok) {
        throw new Error(
          `Failed to verify session bridge: ${response.statusText}`
        );
      }

      return true;
    } catch (error) {
      console.error("Error verifying session bridge:", error);
      return false;
    }
  }
}
