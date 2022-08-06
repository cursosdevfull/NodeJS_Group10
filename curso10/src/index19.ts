import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car.entity";
import { Medic } from "./entity/Medic.entity";

AppDataSource.initialize()
  .then(async () => {
    const queryRunner = AppDataSource.manager.connection.createQueryRunner();

    await queryRunner.startTransaction();

    const manager = queryRunner.manager;

    try {
      const medicInserted = await manager
        .createQueryBuilder()
        .from(Medic, "medico")
        .insert()
        .values({ name: "Juan", lastname: "Paredes", age: 50 })
        .execute();

      console.log(medicInserted);

      const newId = medicInserted.identifiers[0].id;

      await manager
        .createQueryBuilder()
        .from(Car, "car")
        .insert()
        .values({
          brand: "Hyundai",
          model: "Elantra",
          year: 2000 + newId,
          color: "red",
        })
        .execute();

      /*  await manager
        .createQueryBuilder()
        .from(Car, "car")
        .insert()
        .values({
          brand: "Hyundai",
          model: "Elantra",
          year: 2022,
          color: "red",
        })
        .execute();

      await manager.query(
        "insert into medico (name, lastname, age) values (?, ?, ?)",
        ["Javier", "Luque", 25]
      ); */

      await queryRunner.commitTransaction();
      console.log("Transaction commited");
    } catch (error) {
      await queryRunner.rollbackTransaction();
      console.log("Transaction rolled back");
    } finally {
      await queryRunner.release();
    }
  })
  .catch(console.log);
