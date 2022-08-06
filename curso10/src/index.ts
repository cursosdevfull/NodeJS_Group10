import { AppDataSource } from "./data-source";
import { Hospital } from "./entity/Hospital.entity";

AppDataSource.initialize()
  .then(async () => {
    const report = await AppDataSource.manager
      .createQueryBuilder()
      .from(Hospital, "hospital")
      .select(["hospital.title", "medic.name", "medic.lastname"])
      .innerJoin("hospital.medics", "medic")
      //.leftJoin("hospital.medics", "medic")
      .where("char_length(medic.name) > 3")
      .getRawMany();

    console.log(report);
  })
  .catch(console.log);
