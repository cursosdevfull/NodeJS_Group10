import { AppDataSource } from "./data-source";
import { Medic } from "./entity/Medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const medic = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .where("medico.age BETWEEN 20 AND 30", { age1: 20, age2: 30 })
      .getRawMany();

    console.log(medic);

    const medicBySetAge = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .where("medico.age IN (:...ages)", { ages: [25, 21] })
      .getRawMany();

    console.log(medicBySetAge);
  })
  .catch(console.log);
