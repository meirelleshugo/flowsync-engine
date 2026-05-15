import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import throwlhos from "throwlhos";

import UserRepository from "../../models/user/UserRepository.ts";

const userRepository = new UserRepository();

class AuthService {
  async login(data: any) {
    const user = await userRepository.findOne({
      email: data.email,
      active: true,
    });

    if (!user) {
      throw throwlhos.default.err_unauthorized("Invalid credentials");
    }

    const passwordIsValid = await bcrypt.compare(data.password, user.password);

    if (!passwordIsValid) {
      throw throwlhos.default.err_unauthorized("Invalid credentials");
    }

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      Deno.env.get("JWT_SECRET")!,
      {
        expiresIn: "1d",
      },
    );

    return {
      user,
      token,
    };
  }
}

export default new AuthService();
