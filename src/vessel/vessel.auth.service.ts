import { PrismaService } from "../prisma.service";
import {
  VesselRegister,
  VesselLogin,
  ChangePassword,
} from "./vessel.interface";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export class VesselAuth {
  constructor(private readonly prismaService: PrismaService) {}

  async register(data: VesselRegister) {
    const isExist = await this.prismaService.vessel.findFirst({
      where: {
        email: data.email,
      },
    });
    if (isExist) {
      return {
        code: 409,
        response: "Vessel is already registered!",
      };
    }
    const response = await this.prismaService.vessel.create({
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

  async login(data: VesselLogin) {
    const response = await this.prismaService.vessel.findFirst({
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
        fleet: response.fleet,
        type: response.type,
      };
      const token = jwt.sign(payload, String(process.env["JWT_KEY"]), {
        expiresIn: "24h",
        algorithm: "HS256",
      });
      const returnValue = {
        id: response.id,
        access_token: token,
        name: response.name,
      };
      return {
        code: 200,
        response: returnValue,
      };
    }
    return {
      code: 404,
      response: "Vessel is not found!",
    };
  }

  async changePassword(id: string, data: ChangePassword) {
    const isExist = await this.prismaService.vessel.findFirst({
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
        response: "Incorrect password!",
      };
    }
    const response = await this.prismaService.vessel.update({
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
