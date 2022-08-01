import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car.entity";
import { User } from "./entity/User.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);
    //const carRepository = conn.getRepository(Car);

    const car = new Car();
    car.brand = "Kia";
    car.model = "Santa Fe";
    car.year = 2010;
    car.color = "Black";

    //await carRepository.save(car);

    const user = new User();
    user.name = "Claudia";
    user.lastname = "Luque";
    user.email = "claudialuque@gmail.com";
    user.age = 50;
    user.car = car;

    const userInserted = await userRepository.save(user);
    console.log("User inserted: ", userInserted);

    /* const user2 = new User();
    user2.name = "Antonio";
    user2.lastname = "Luque";
    user2.email = "antonioluque@gmail.com";
    user2.age = 50;
    user2.car = car;

    const userInserted2 = await userRepository.save(user2);
    console.log("User inserted2: ", userInserted2); */
  })
  .catch(console.log);
