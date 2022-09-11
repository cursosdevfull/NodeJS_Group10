import { Auth } from "./auth";

export interface AuthRepository {
  getUser(auth: Auth): Promise<{
    name: string;
    lastname: string;
    password: string;
    email: string;
    refreshToken: string;
  }>;

  getUserByRefreshToken(refreshToken: string): Promise<{
    name: string;
    lastname: string;
    password: string;
    email: string;
    refreshToken: string;
    guid: string
  }>;
}
