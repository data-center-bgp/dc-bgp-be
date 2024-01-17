import {
  CreateDelayNoteCOA,
  EditDelayNoteCOA,
} from "./delayNotesCOA.interface";
import { PrismaService } from "../prisma.service";

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

  async createDelayNotesCOA(data: CreateDelayNoteCOA, cycleTimeCOAId: string) {
    try {
      const cycleTimeCOA = await this.prismaService.cycleTimeCOA.findUnique({
        where: {
          id: cycleTimeCOAId,
        },
      });
      if (!cycleTimeCOA) {
        return {
          code: 404,
          response: "Data is not found!",
        };
      }
      const delayNotesCOAData = {
        ...data,
        cycleTimeCOAId: cycleTimeCOAId,
        route: cycleTimeCOA.route,
      };
      const response = await this.prismaService.delayNotesCOA.create({
        data: delayNotesCOAData,
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

  async editDelayNotesCOA(
    delayNotesCOAId: string,
    cycleTimeCOAId: string,
    data: EditDelayNoteCOA
  ) {
    try {
      const cycleTimeCOA = await this.prismaService.cycleTimeCOA.findUnique({
        where: {
          id: cycleTimeCOAId,
        },
      });
      if (!cycleTimeCOA) {
        return {
          code: 404,
          response: "CycleTimeCOA data is not found!",
        };
      }
      const delayNotesCOAData = {
        ...data,
        route: cycleTimeCOA.route,
      };
      const response = await this.prismaService.delayNotesCOA.update({
        where: {
          id: delayNotesCOAId,
        },
        data: delayNotesCOAData,
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
