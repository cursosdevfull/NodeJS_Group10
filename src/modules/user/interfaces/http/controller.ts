import { Request, Response } from "express";
import UserApplication from "../../application/user.application";
import User from "../../domain/user";
import UserFactory from "../../domain/user-factory";
import { EmailVO } from "../../domain/value-objects/email.vo";
import { UserInsertMapping } from "./dto/response/user-insert.dto";
import { UserListOneMapping } from "./dto/response/user-list-one.dto";
import { UserListDTO, UserListMapping } from "./dto/response/user-list.dto";

export default class {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  list(req: Request, res: Response) {
    const list = this.application.list();
    const result: UserListDTO = new UserListMapping().execute(list);
    res.json(result);
  }

  listOne(req: Request, res: Response) {
    const { guid } = req.params;
    const data = this.application.listOne(guid).properties();
    const result = new UserListOneMapping().execute(data);
    res.json(result);
  }

  async insert(req: Request, res: Response) {
    const { name, lastname, email, password } = req.body;
    const user: User = await new UserFactory().create(
      name,
      lastname,
      EmailVO.create(email),
      password
    );
    const data = await this.application.insert(user);
    const result = new UserInsertMapping().execute(data);
    res.json(result);
  }

  update(req: Request, res: Response) {
    const { guid } = req.params;
    const { name, lastname, email, password } = req.body;

    const user = this.application.listOne(guid);
    user.update({ name, lastname, email: EmailVO.create(email), password });

    const result = this.application.update(user);
    res.json(result);
  }

  delete(req: Request, res: Response) {
    const { guid } = req.params;

    const user = this.application.listOne(guid);
    user.delete();

    const result = this.application.update(user);
    res.json(result);
  }
}
