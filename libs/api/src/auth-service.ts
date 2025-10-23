interface IAuthApiService {
  signIn(email: string, password: string): Promise<boolean>;
  signOut(): Promise<boolean>;
}

export class AuthApiService implements IAuthApiService {
  private origin: string | null = null;

  constructor(origin: string) {
    this.origin = origin;
  }

  public async signIn(email: string, password: string): Promise<boolean> {
    try {
      const res = await fetch(`${this.origin}/api/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        throw new Error(`Sign-in failed with status: ${res.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error during sign-in:", error);
      return false;
    }
  }

  public async signOut(): Promise<boolean> {
    try {
      const res = await fetch(`${this.origin}/api/auth/sign-out`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(`Sign-out failed with status: ${res.status}`);
      }

      return true;
    } catch (error) {
      console.error("Error during sign-out:", error);
      return false;
    }
  }
}
