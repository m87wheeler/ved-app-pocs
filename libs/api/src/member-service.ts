import type { DBMember } from "@ved-poc-monorepo/shared";

interface IMemberApiService {
  get(memberId: string): Promise<DBMember | null>;
}

export class MemberApiService implements IMemberApiService {
  private origin: string | null = null;

  constructor(origin: string) {
    this.origin = origin;
  }

  public async get(memberId: string): Promise<DBMember | null> {
    try {
      const res = await fetch(
        `${this.origin}/api/membership?memberId=${memberId}`
      );

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
