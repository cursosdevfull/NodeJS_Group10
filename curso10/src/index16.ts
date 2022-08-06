import { Brackets } from "typeorm";
import { AppDataSource } from "./data-source";
import { Medic } from "./entity/Medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const medic = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .where("medico.age > :age", { age: 30 })
      .getRawMany();

    console.log(medic);

    const medicByAge = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .where("medico.age >= :age1 and medico.age<= :age2", {
        age1: 20,
        age2: 40,
      })
      .getRawMany();

    console.log(medicByAge);

    const medicByAge2 = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .where("medico.age >= :age1", {
        age1: 20,
      })
      .andWhere("medico.age<= :age2", { age2: 40 })
      .getRawMany();

    console.log(medicByAge2);

    const medicByAge3 = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .where("medico.age <= :age", {
        age: 30,
      })
      .orWhere("medico.age >= :age", { age: 60 })
      .getRawMany();

    console.log(medicByAge3);

    const medicByBrackets = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .where("medico.age > :age", {
        age: 20,
      })
      .andWhere(
        new Brackets((qb) => {
          qb.where("medico.name = :name", { name: "Aldo" }).orWhere(
            "medico.name = :name2",
            { name2: "Carmela" }
          );
        })
      )
      .getRawMany();

    console.log(medicByBrackets);
  })
  .catch(console.log);
