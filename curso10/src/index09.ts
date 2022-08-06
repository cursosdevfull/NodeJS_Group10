import { AppDataSource } from "./data-source";
import { Medic } from "./entity/Medic.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const medicRepository = conn.getRepository(Medic);

    const medics = await medicRepository.find({
      order: { lastname: "DESC", name: "ASC" },
    });

    console.log(medics);
  })
  .catch(console.log);
