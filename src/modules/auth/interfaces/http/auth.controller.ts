import { AuthApplication } from "../../application/auth.application";
import { Request, Response } from "express";
import { AuthFactory } from "../../domain/auth.factory";

export class AuthController {
  constructor(private application: AuthApplication) {
    this.login = this.login.bind(this);
    this.getNewAccessToken = this.getNewAccessToken.bind(this);
  }

  async login(req: Request, res: Response) {
    const { email, password } = req.body;

    const auth = AuthFactory.create({ email, password });
    const authResult = await this.application.login(auth);

    res.json(authResult);
  }

  async getNewAccessToken(req: Request, res: Response) {
    const { refreshToken } = req.body;

    const authResult = await this.application.getNewAccessToken(refreshToken);

    res.json(authResult);
  }
}
