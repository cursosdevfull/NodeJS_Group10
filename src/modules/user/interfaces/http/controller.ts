import { Request, Response } from "express";
import UserApplication from "../../application/user.application";
import User, { UserProperties } from "../../domain/user";
import { UserRepository } from "../../domain/user.repository";
import UserInfrastructure from "../../infrastructure/user.infrastructure";

export default class {
  constructor(private application: UserApplication) {
    //this.list = this.list.bind(this);
  }

  list(req: Request, res: Response) {
    const list = this.application.list();
    res.json(list);
  }

  listOne(req: Request, res: Response) {
    return this.application.listOne(1);
  }

  insert(req: Request, res: Response) {
    const properties: UserProperties = {
      id: 10,
      name: "John",
      lastname: "Travolta",
      email: "travolta@gmail.com",
      password: "1234",
      refreshToken: "abc",
    };
    const user: User = new User(properties);

    return this.application.insert(user);
  }

  update(req: Request, res: Response) {
    const properties: UserProperties = {
      id: 1,
      name: "John",
      lastname: "Travolta",
      email: "travolta@gmail.com",
      password: "1234",
      refreshToken: "abc",
    };
    const user: User = new User(properties);
    return this.application.update(user);
  }

  delete(req: Request, res: Response) {
    const properties: UserProperties = {
      id: 1,
      name: "John",
      lastname: "Travolta",
      email: "travolta@gmail.com",
      password: "1234",
      refreshToken: "abc",
    };
    const user: User = new User(properties);
    return this.application.delete(user);
  }

  /*  description(req: Request, res: Response) {
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
  } */
}
