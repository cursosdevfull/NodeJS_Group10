import { AppDataSource } from "./data-source";
import { User } from "./entity/User.entity";

AppDataSource.initialize()
  .then(async (conn) => {
    const userRepository = conn.getRepository(User);

    const listUsers = await userRepository.find();
    console.log("List All", listUsers);

    const user = await userRepository.findOne({ where: { id: 1 } });
    console.log("Find One", user);

    const newUser = new User();
    newUser.name = "John";
    newUser.lastname = "Doe";
    newUser.email = "john@correo.com";
    newUser.age = 30;

    /* const userSaved = await userRepository.save(newUser);
    console.log("Save", userSaved); */

    //const user25 = await userRepository.findOne({ where: { age: 25 } });
    const user25 = await userRepository.find({ where: { age: 40 } });
    console.log("Find One", user25);

    const [records, count] = await userRepository.findAndCount();
    console.log("Find And Count", records, count);
  })
  .catch(console.log);
