import UsersRepository from "./users.repository.ts";
import { IUser } from "./users.model.ts";
import throwlhos from "throwlhos";
import bcrypt from "bcrypt";

const repository = new UsersRepository();

export default class UsersService {
  async create(email: string, password: string) {
    const alreadyExists = await repository.findByEmail(email);

    if (alreadyExists) {
      throw throwlhos.default.err_conflict("Usuário já cadastrado.");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    return await repository.create({
      email,
      password: hashedPassword,
    });
  }

  async findAll() {
    return await repository.findAll();
  }

  async findById(id: string) {
    const user = await repository.findById(id);

    if (!user) {
      throw throwlhos.default.err_notFound("Usuário não encontrado.");
    }

    return user;
  }

  async findByEmail(email: string) {
    const user = await repository.findByEmail(email);

    if (!user) {
      throw throwlhos.default.err_notFound("Usuário não encontrado.");
    }

    return user;
  }

  async update(id: string, data: Partial<IUser>) {
    if (data.password) {
      data.password = await bcrypt.hash(data.password, 10);
    }

    const updatedUser = await repository.update(id, data);

    if (!updatedUser) {
      throw throwlhos.default.err_notFound("Usuário não encontrado.");
    }

    return updatedUser;
  }

  async delete(id: string) {
    const deleted = await repository.delete(id);

    if (!deleted) {
      throw throwlhos.default.err_notFound("Usuário não encontrado.");
    }

    return {
      message: "Usuário deletado com sucesso.",
    };
  }
}
