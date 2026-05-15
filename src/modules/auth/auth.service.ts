import RefreshTokenRepository from "../../models/refreshToken/RefreshTokenRepository.ts";
import RefreshToken from "../../models/refreshToken/RefreshToken.ts";
import UserRepository from "../../models/user/UserRepository.ts";
import throwlhos from "throwlhos";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const refreshTokenRepository = new RefreshTokenRepository();
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

    const accessToken = jwt.sign(
      {
        id: user._id,
        email: user.email,
      },
      Deno.env.get("JWT_SECRET")!,
      {
        expiresIn: Deno.env.get("JWT_ACCESS_EXPIRES") || "15m",
      },
    );

    const refreshTokenValue = jwt.sign(
      {
        id: user._id,
      },
      Deno.env.get("JWT_REFRESH_SECRET")!,
      {
        expiresIn: Deno.env.get("JWT_REFRESH_EXPIRES") || "7d",
      },
    );

    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

    const refreshToken = new RefreshToken({
      userId: user._id!.toString(),

      token: refreshTokenValue,

      expiresAt,

      revoked: false,
    });

    await refreshTokenRepository.createOne(refreshToken.object);

    return {
      user,

      accessToken,

      refreshToken: refreshTokenValue,
    };
  }
  async refresh(refreshToken: string) {
    const payload = jwt.verify(
      refreshToken,
      Deno.env.get("JWT_REFRESH_SECRET")!,
    ) as any;

    const storedToken = await refreshTokenRepository.findOne({
      token: refreshToken,
      revoked: false,
    });

    if (!storedToken)
      throw throwlhos.default.err_unauthorized("Invalid refresh token");

    const accessToken = jwt.sign(
      {
        id: payload.id,
      },
      Deno.env.get("JWT_SECRET")!,
      {
        expiresIn: Deno.env.get("JWT_ACCESS_EXPIRES") || "15m",
      },
    );

    return {
      accessToken,
    };
  }
}

export default new AuthService();
