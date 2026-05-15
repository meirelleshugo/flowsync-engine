import throwlhos from "throwlhos";

import User from "../../models/user/User.ts";
import UserRepository from "../../models/user/UserRepository.ts";

const userRepository = new UserRepository();

class UsersService {
  async create(data: any) {
    const alreadyExists = await userRepository.exists({
      email: data.email,
    });

    if (alreadyExists) {
      throw throwlhos.default.err_conflict("User already exists");
    }

    const user = new User({
      ...data,
      active: true,
    });

    return userRepository.createOne(user.object);
  }

  async findAll() {
    return userRepository.findMany({
      active: true,
    });
  }

  async findById(id: string) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw throwlhos.default.err_notFound("User not found");
    }

    return user;
  }

  async update(id: string, data: any) {
    const user = await userRepository.updateOne(
      {
        _id: id,
      },
      data,
    );

    if (!user) {
      throw throwlhos.default.err_notFound("User not found");
    }

    return user;
  }

  async delete(id: string) {
    const user = await userRepository.updateOne(
      {
        _id: id,
      },
      {
        active: false,
      },
    );

    if (!user) {
      throw throwlhos.default.err_notFound("User not found");
    }

    return user;
  }
}

export default new UsersService();
