import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car.entity";
import { User } from "./entity/User.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    const car = new Car();
    car.brand = "Kia";
    car.model = "Sorento";
    car.year = 2010;
    car.color = "Black";

    const car2 = new Car();
    car2.brand = "Hyundai";
    car2.model = "Elantra";
    car2.year = 2020;
    car2.color = "White";

    const user = new User();
    user.name = "Claudia";
    user.lastname = "Luque";
    user.email = "claudialuque@gmail.com";
    user.age = 50;
    user.cars = [car, car2];

    const userInserted = await userRepository.save(user);
    console.log("User inserted: ", userInserted);
  })
  .catch(console.log);
