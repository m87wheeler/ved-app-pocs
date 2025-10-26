interface IAuthApiService {
  signIn(
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }>;
  signOut(): Promise<{ success: boolean; error?: string }>;
}

export class AuthApiService implements IAuthApiService {
  private origin: string | null = null;

  constructor(origin: string) {
    this.origin = origin;
  }

  public async signIn(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: string;
  }> {
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

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error during sign-in:", errorMessage);
      return { success: false, error: errorMessage };
    }
  }

  public async signOut(): Promise<{ success: boolean; error?: string }> {
    try {
      const res = await fetch(`${this.origin}/api/auth/sign-out`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error(`Sign-out failed with status: ${res.status}`);
      }

      return { success: true };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error";
      console.error("Error during sign-out:", errorMessage);
      return { success: false, error: errorMessage };
    }
  }
}
