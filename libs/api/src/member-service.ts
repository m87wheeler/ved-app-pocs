import type { DBMember } from "@ved-poc-monorepo/shared";

interface IMemberApiService {
  get(): Promise<DBMember | null>;
}

export class MemberApiService implements IMemberApiService {
  private origin: string | null = null;

  constructor(origin: string) {
    this.origin = origin;
  }

  public async get(): Promise<DBMember | null> {
    try {
      const res = await fetch(`${this.origin}/api/membership`);

      if (!res.ok) {
        throw new Error(`Get member failed with status: ${res.status}`);
      }

      const member: DBMember = await res.json();
      return member;
    } catch (error) {
      console.error("Error retrieving member:", error);
      return null;
    }
  }
}
