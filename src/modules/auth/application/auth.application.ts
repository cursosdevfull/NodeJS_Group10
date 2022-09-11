import { UserRepository } from "../../user/domain/user.repository";
import { UserPasswordService } from "../../user/domain/services/user-password.service";
import { Auth } from "../domain/auth";
import { AuthRepository } from "../domain/auth.repository";
import { Tokens } from "../domain/tokens.interface";
import { AuthService } from "./auth.service";

export class AuthApplication {
  constructor(
    private readonly authRepository: AuthRepository,
    private readonly userRepository: UserRepository
  ) {}

  async login(auth: Auth): Promise<Tokens> {
    const user = await this.authRepository.getUser(auth);

    if (!user) {
      throw new Error("User not found");
    } else {
      const { password, refreshToken } = user;
      const isUserValid = UserPasswordService.compare(
        auth.properties().password,
        password
      );

      if (!isUserValid) {
        throw new Error("Invalid password");
      } else {
        return {
          accessToken: AuthService.generateAccessToken(user),
          refreshToken,
        };
      }
    }
  }

  async getNewAccessToken(refreshToken: string): Promise<Tokens> {
    const user = await this.authRepository.getUserByRefreshToken(refreshToken);

    if (!user) {
      throw new Error("User not found");
    } else {
      const guid = user.guid;
      const newRefreshToken = AuthService.generateRefreshToken();
      await this.userRepository.update(guid, { refreshToken: newRefreshToken });

      const newAccessToken = AuthService.generateAccessToken(user);
      return {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken
      };
    }
  }
}
