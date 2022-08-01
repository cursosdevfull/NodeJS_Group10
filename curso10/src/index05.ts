import { AppDataSource } from "./data-source";
import { Car } from "./entity/Car.entity";
import { User } from "./entity/User.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    const car1 = new Car();
    car1.brand = "Kia";
    car1.model = "Sorento";
    car1.year = 2010;
    car1.color = "Black";

    const car2 = new Car();
    car2.brand = "Hyundai";
    car2.model = "Elantra";
    car2.year = 2020;
    car2.color = "White";

    const user1 = new User();
    user1.name = "Claudia";
    user1.lastname = "Luque";
    user1.email = "claudialuque@gmail.com";
    user1.age = 50;
    user1.cars = [car1, car2];

    const userInserted1 = await userRepository.save(user1);
    console.log("User inserted1: ", userInserted1);

    const user2 = new User();
    user2.name = "Felipe";
    user2.lastname = "Luque";
    user2.email = "felipeluque@gmail.com";
    user2.age = 50;
    user2.cars = [car1];

    const userInserted2 = await userRepository.save(user2);
    console.log("User inserted2: ", userInserted2);
  })
  .catch(console.log);
