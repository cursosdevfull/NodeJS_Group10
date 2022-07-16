import { Request, Response } from "express";

export default class {
  description(req: Request, res: Response) {
    res.send("<h2>User: Sergio</h2>");
  }

  list(req: Request, res: Response) {
    res.json([
      { username: "shidalgo", active: true },
      { username: "pneira", active: true },
    ]);
  }

  detail(req: Request, res: Response) {
    res.json({ username: "shidalgo", active: false });
  }

  delete(req: Request, res: Response) {
    res.send("User deleted successfully");
  }
}
