import { CreateCycleTimeCOA, EditCycleTimeCOA } from "./cycleTimeCOA.interface";
import { PrismaService } from "../prisma.service";

export class CycleTimeCOAService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllCycleTimeCOA() {
    try {
      const response = await this.prismaService.cycleTimeCOA.findMany();
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

  async getCycleTimeCOAByID(id: string) {
    try {
      const response = await this.prismaService.cycleTimeCOA.findFirst({
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

  async getCycleTimeCOAByMonth(month: string) {
    try {
      const response = await this.prismaService.cycleTimeCOA.findMany({
        where: {
          month: month,
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
      }
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      }
    }
  }

  async getCycleTimeCOAByFleet(fleet: string) {
    try {
      const response = await this.prismaService.cycleTimeCOA.findMany({
        where: {
          fleet: fleet
        }
      })
      return {
        code: 200,
        response: response
      }
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      }
    }
  }

  async createCycleTimeCOA(data: CreateCycleTimeCOA) {
    try {
      const response = await this.prismaService.cycleTimeCOA.create({
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

  async editCycleTimeCOA(id: string, data: EditCycleTimeCOA) {
    try {
      const response = await this.prismaService.cycleTimeCOA.update({
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

  async deleteCycleTimeCOA(id: string) {
    try {
      const response = await this.prismaService.cycleTimeCOA.delete({
        where: {
          id: id,
        },
      });
      return {
        code: 200,
        response: `Data with ID ${id} is deleted successfully!`,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      };
    }
  }
}
