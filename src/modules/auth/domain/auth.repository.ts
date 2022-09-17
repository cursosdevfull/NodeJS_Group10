import { Role } from '../../role/domain/role';
import { Auth } from './auth';

export interface AuthRepository {
  getUser(auth: Auth): Promise<{
    name: string;
    lastname: string;
    password: string;
    email: string;
    refreshToken: string;
    roles: string[] | number[] | Role[];
  }>;

  getUserByRefreshToken(refreshToken: string): Promise<{
    name: string;
    lastname: string;
    password: string;
    email: string;
    refreshToken: string;
    guid: string;
    roles: string[] | number[] | Role[];
  }>;
}
