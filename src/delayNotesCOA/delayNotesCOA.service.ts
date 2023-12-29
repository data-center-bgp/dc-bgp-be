import {
  CreateDelayNoteCOA,
  EditDelayNoteCOA,
} from "./delayNotesCOA.interface";
import { PrismaService } from "../prisma.service";
import { response } from "express";

export class DelayNotesCOAService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllDelayNotesCOA() {
    try {
      const response = await this.prismaService.delayNotesCOA.findMany();
      if (response.length === 0) {
        return {
          code: 404,
          response: "Data is not found!",
        };
      }
      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      };
    }
  }

  async getDelayNotesCOAById(id: string) {
    try {
      const response = await this.prismaService.delayNotesCOA.findFirst({
        where: {
          id: id,
        },
      });
      if (!response) {
        return {
          code: 404,
          response: "Data is not found!",
        };
      }
      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      };
    }
  }

  async createDelayNotesCOA(data: CreateDelayNoteCOA) {
    try {
      const response = await this.prismaService.delayNotesCOA.create({
        data: data,
      });
      return {
        code: 201,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      };
    }
  }

  async editDelayNotesCOA(id: string, data: EditDelayNoteCOA) {
    try {
      const response = await this.prismaService.delayNotesCOA.update({
        where: {
          id: id,
        },
        data: data,
      });
      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      };
    }
  }

  async deleteDelayNotesCOA(id: string) {
    try {
      const response = await this.prismaService.delayNotesCOA.delete({
        where: {
          id: id,
        },
      });
      return {
        code: 200,
        response: response,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      };
    }
  }
}
