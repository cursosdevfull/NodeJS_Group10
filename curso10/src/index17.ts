import { Brackets } from "typeorm";
import { AppDataSource } from "./data-source";
import { Medic } from "./entity/Medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const sumAges = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .select("sum(medico.age) sum_ages")
      .getRawOne();
    console.log(sumAges);

    const medicsById = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .select("medico.name, medico.id")
      .having("medico.id > :id", { id: 6 })
      .getRawMany();
    console.log(medicsById);

    const medicsOrdered = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .select("medico.name, medico.lastname")
      .orderBy("medico.name", "DESC")
      .addOrderBy("medico.lastname", "ASC")
      .offset(4)
      .limit(4)
      .getRawMany();

    console.log(medicsOrdered);
  })
  .catch(console.log);
