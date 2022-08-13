import { Request, Response } from "express";
import UserApplication from "../../application/user.application";
import User from "../../domain/user";
import UserFactory from "../../domain/user-factory";
import { EmailVO } from "../../domain/value-objects/email.vo";
import { UserInsertMapping } from "./dto/response/user-insert.dto";
import { UserListOneMapping } from "./dto/response/user-list-one.dto";
import { UserListDTO, UserListMapping } from "./dto/response/user-list.dto";
import { GuidVO } from "../../domain/value-objects/guid.vo";

export default class {
  constructor(private application: UserApplication) {
    this.list = this.list.bind(this);
    this.listOne = this.listOne.bind(this);
    this.insert = this.insert.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
  }

  async list(req: Request, res: Response) {
    const list = await this.application.list();
    const result: UserListDTO = new UserListMapping().execute(
      list.map((user) => user.properties())
    );
    res.json(result);
  }

  async listOne(req: Request, res: Response) {
    const { guid } = req.params;

    const guidResult = GuidVO.create(guid);
    if (guidResult.isErr()) {
      return res.status(411).send(guidResult.error.message);
    }

    const userResult = await this.application.listOne(guid);

    if (userResult.isErr()) {
      return res.status(404).send(userResult.error.message);
    } else if (userResult.isOk()) {
      const result = new UserListOneMapping().execute(
        userResult.value.properties()
      );
      return res.json(result);
    }
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
    const result = new UserInsertMapping().execute(data.properties());
    res.json(result);
  }

  async update(req: Request, res: Response) {
    const { guid } = req.params;
    const fieldsToUpdate = req.body;

    const dataResult = await this.application.update(guid, fieldsToUpdate);
    if (dataResult.isErr()) {
      res.status(404).send(dataResult.error.message);
    } else {
      const result = new UserInsertMapping().execute(
        dataResult.value.properties()
      );
      res.json(result);
    }
  }

  async delete(req: Request, res: Response) {
    const { guid } = req.params;

    const data = await this.application.delete(guid);
    /*     const result = new UserDeleteMapping().execute(data.properties());
    res.json(result); */
  }
}
