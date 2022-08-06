import { AppDataSource } from "./data-source";
import { Medic } from "./entity/Medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const medic = await AppDataSource.manager
      .createQueryBuilder()
      .select(["medico.id", "medico.name"])
      .from(Medic, "medico")
      .where("medico.id = :id", { id: 6 })
      .getOne();

    console.log(medic);
  })
  .catch(console.log);
