import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car.entity";
import { User } from "./entity/User.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);
    const carRepository = conn.getRepository(Car);

    const users = await userRepository.find();
    console.log("Users: ", JSON.stringify(users, null, "\t"));
  })
  .catch(console.log);
