import { AppDataSource } from "./data-source";
import { Medic } from "./entity/Medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const medic = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .update()
      .set({ name: "Juan" })
      .where("medico.id = :id", { id: 6 })
      .execute();

    //console.log(medic);

    await AppDataSource.manager.connection.getRepository(Medic).delete(6);

    await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .delete()
      .where("medico.id = :id", { id: 7 })
      .execute();

    const medico = await AppDataSource.manager
      .createQueryBuilder()
      .from(Medic, "medico")
      .select(["medico.id", "medico.lastname"])
      .where("medico.id = :id")
      .setParameters({ id: 9 })
      .getOne();

    console.log(medico);
  })
  .catch(console.log);
