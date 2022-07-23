import { Request, Response } from "express";
import UserApplication from "../../application/user.application";
import User, { UserInsert, UserProperties } from "../../domain/user";

export default class {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.insert = this.insert.bind(this);
  }

  list(req: Request, res: Response) {
    const list = this.application.list();
    res.json(list);
  }

  listOne(req: Request, res: Response) {
    //const id = (req.params.id as unknown) as number;
    //const id = +req.params.id
    //const { id } = req.params;
    const { guid } = req.params;
    //const result = this.application.listOne(+id);
    const result = this.application.listOne(guid);
    res.json(result);
  }

  insert(req: Request, res: Response) {
    const body: UserInsert = req.body;
    res.json(req.body);
    const properties: UserProperties = {
      name: body.name,
      lastname: body.lastname,
      email: body.email,
      password: body.password,
    };
    const user = new User(properties);
    const result = this.application.insert(user);
    /* const properties: UserProperties = {
      id: 10,
      name: "John",
      lastname: "Travolta",
      email: "travolta@gmail.com",
      password: "1234",
      refreshToken: "abc",
    };
    const user: User = new User(properties); */
    // return this.application.insert(user);
  }

  update(req: Request, res: Response) {
    /*  const properties: UserProperties = {
      id: 1,
      name: "John",
      lastname: "Travolta",
      email: "travolta@gmail.com",
      password: "1234",
      refreshToken: "abc",
    };
    const user: User = new User(properties);
    return this.application.update(user); */
  }

  delete(req: Request, res: Response) {
    /*  const properties: UserProperties = {
      id: 1,
      name: "John",
      lastname: "Travolta",
      email: "travolta@gmail.com",
      password: "1234",
      refreshToken: "abc",
    };
    const user: User = new User(properties);
    return this.application.delete(user); */
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
