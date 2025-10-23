import { AuthApiService } from "./auth-service";
import { MemberApiService } from "./member-service";
import { SessionBridgeApiService } from "./session-bridge-service";

interface IApiService {
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
    this.origin = origin;
    this.auth = new AuthApiService(origin);
    this.sessionBridge = new SessionBridgeApiService(origin);
    this.member = new MemberApiService(origin);
  }
}
