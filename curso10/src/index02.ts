import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car.entity";
import { User } from "./entity/User.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);
    const carRepository = conn.getRepository(Car);

    const car = new Car();
    car.brand = "Toyota";
    car.model = "Tercel";
    car.year = 1960;
    car.color = "Brown";

    //const carInserted = await AppDataSource.manager.save(car);
    const carInserted = await carRepository.save(car);
    console.log("Car inserted: ", carInserted);
  })
  .catch(console.log);
