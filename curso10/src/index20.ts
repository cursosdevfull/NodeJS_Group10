import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car.entity";
import { Medic } from "./entity/Medic.entity";
import { UnitOfWork } from "./unit-of-work/uow";
import { EntityManager } from "typeorm";

AppDataSource.initialize()
  .then(async () => {
    const uow = new UnitOfWork(AppDataSource.manager);
    await uow.start();

    const work = async () => {
      const manager: EntityManager = uow.getManager();

      const medic = new Medic();
      medic.name = "Francisco";
      medic.lastname = "Paredes";
      medic.age = 55;

      const car = new Car();
      car.brand = "Hyundai";
      car.model = "Elantra";
      car.year = 1990;
      car.color = "red";

      await manager.save(medic);
      await manager.save(car);
    };

    await uow.complete(work);
  })
  .catch(console.log);
