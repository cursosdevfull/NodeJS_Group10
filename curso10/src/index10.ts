import { AppDataSource } from "./data-source";
import { Medic } from "./entity/Medic.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const medicRepository = conn.getRepository(Medic);

    const PAGE_SIZE = 4;
    const page = 1;

    const [medics, totalRecords] = await medicRepository.findAndCount({
      order: { lastname: "ASC" },
      skip: page * PAGE_SIZE,
      take: PAGE_SIZE,
    });

    console.log(medics);
    console.log(totalRecords);
  })
  .catch(console.log);
