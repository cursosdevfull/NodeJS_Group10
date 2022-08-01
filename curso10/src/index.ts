import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car.entity";
import { User } from "./entity/User.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    const users = await userRepository.find();
    const cars = await users[1].cars;
    console.log("User", users);
    console.log("Cars: ", JSON.stringify(cars, null, "\t"));
    //console.log("Users: ", JSON.stringify(users, null, "\t"));
  })
  .catch(console.log);
