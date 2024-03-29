import { Role } from "@prisma/client";
import { PrismaService } from "../prisma.service";
import { UserRegister, UserLogin, ChangePassword } from "./user.interface";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class UserAuth {
  constructor(private readonly prismaService: PrismaService) {}

  async register(data: UserRegister) {
    const isExist = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (isExist) {
      return {
        code: 409,
        response: "User is already registered!",
      };
    }
    const response = await this.prismaService.user.create({
      data: {
        ...data,
        password: bcrypt.hashSync(
          data.password,
          Number(process.env["HASH_SALT"])
        ),
      },
    });
    response.password = "";
    if (response) {
      return {
        code: 201,
        response: response,
      };
    }
    return {
      code: 400,
      response: "Bad request",
    };
  }

  async login(data: UserLogin) {
    const response = await this.prismaService.user.findFirst({
      where: {
        email: data.email,
      },
    });
    if (response) {
      const isPasswordMatch = bcrypt.compareSync(
        data.password,
        response.password
      );
      if (!isPasswordMatch) {
        return {
          code: 401,
          response: "Incorrect password!",
        };
      }
      const payload = {
        id: response.id,
        email: response.email,
        name: response.name,
        role: response.role,
        userType: 'user'
      };
      const token = jwt.sign(payload, String(process.env["JWT_KEY"]), {
        expiresIn: "24h",
        algorithm: "HS256",
      });
      const returnValue = {
        id: response.id,
        access_token: token,
        role: response.role,
        userType: 'user'
      };
      return {
        code: 200,
        response: returnValue,
      };
    }
    return {
      code: 404,
      response: "User is not found!",
    };
  }

  async changePassword(id: string, data: ChangePassword) {
    const isExist = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
    if (!isExist) {
      return {
        code: 404,
        response: "User is not found!",
      };
    }
    const passwordCheck = bcrypt.compareSync(
      data.oldPassword,
      isExist.password
    );
    if (!passwordCheck) {
      return {
        code: 403,
        response: "Invalid password!",
      };
    }
    const response = await this.prismaService.user.update({
      where: {
        id: id,
      },
      data: {
        password: bcrypt.hashSync(
          data.newPassword,
          Number(process.env["HASH_SALT"])
        ),
      },
    });
    return {
      code: 201,
      response: response,
    };
  }
}
