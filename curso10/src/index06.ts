import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car.entity";
import { User } from "./entity/User.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);
    const carRepository = conn.getRepository(Car);

    const users = await userRepository.find({ relations: ["cars"] });
    console.log("Users: ", JSON.stringify(users, null, "\t"));

    const cars = await carRepository.find({ relations: ["users"] });
    console.log("Cars: ", JSON.stringify(cars, null, "\t"));
  })
  .catch(console.log);
