import { PrismaService } from "../prisma.service";
import { EditUser } from "./user.interface";
import { Role } from "@prisma/client";

export class UserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllUser() {
    const response = await this.prismaService.user.findMany();
    response.map((res) => {
      res.password = "";
    });
    return {
      code: 200,
      response: response,
    };
  }

  async getUserByEmail(email: string) {
    const response = await this.prismaService.user.findFirst({
      where: {
        email: email,
      },
    });
    if (response) {
      response.password = "";
      return {
        code: 200,
        response: response,
      };
    }
    return {
      code: 403,
      response: "User is not found!",
    };
  }

  async editUserData(id: string, data: EditUser) {
    const isExist = await this.prismaService.user.findFirst({
      where: {
        id: id,
      },
    });
    if (isExist) {
      const updateUserData = {
        email: data.email || isExist.email,
        password: data.password || isExist.password,
        name: data.name || isExist.name,
        role: data.role || isExist.role,
      };
      const response = await this.prismaService.user.update({
        where: {
          id: id,
        },
        data: updateUserData,
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
        response: "Bad request!",
      };
    }
    return {
      code: 404,
      response: "User not found!",
    };
  }

  async deleteUser(id: string) {
    const response = await this.prismaService.user.delete({
      where: {
        id: id,
      },
    });
    return {
      code: 200,
      response: response,
    };
  }
}
