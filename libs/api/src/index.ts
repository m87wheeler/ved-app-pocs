import { AuthApiService } from "./auth-service";
import { MemberApiService } from "./member-service";
import { SessionBridgeApiService } from "./session-bridge-service";

interface IApiService {
  healthcheck(): Promise<boolean>;
  auth: AuthApiService;
  sessionBridge: SessionBridgeApiService;
  member: MemberApiService;
}

export class ApiService implements IApiService {
  private origin: string | null = null;

  public auth: AuthApiService;
  public sessionBridge: SessionBridgeApiService;
  public member: MemberApiService;

  constructor(origin: string) {
    console.log("API Service initialized with origin:", origin);
    this.origin = origin;
    this.auth = new AuthApiService(origin);
    this.sessionBridge = new SessionBridgeApiService(origin);
    this.member = new MemberApiService(origin);
  }

  public async healthcheck(): Promise<boolean> {
    return healthCheck(this.origin);
  }
}

/**
 * Performs a health check by sending a GET request to the `/api/health` endpoint of the specified origin.
 *
 * @param origin - The base URL of the server to check. Can be `null`.
 * @returns A promise that resolves to `true` if the server responds with a 200 status, otherwise `false`.
 */
async function healthCheck(origin: string | null): Promise<boolean> {
  try {
    const res = await fetch(`${origin}/api/health`, { method: "GET" });
    if (res.status === 200) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  }
}
