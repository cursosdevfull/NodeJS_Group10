import { AppDataSource } from "./data-source";
import { Medic } from "./entity/Medic.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const medicRepository = conn.getRepository(Medic);

    const id = 5;
    const medic = await medicRepository
      //.createQueryBuilder("doctor")
      .createQueryBuilder()
      .select(["Medic.id", "Medic.name"])
      .where("Medic.id = :id", { id })
      //.getSql();
      .getOne();

    console.log(medic);
  })
  .catch(console.log);
