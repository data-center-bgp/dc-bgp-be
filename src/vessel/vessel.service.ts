import { PrismaService } from "../prisma.service";
import { EditUser } from "../user/user.interface";
import { EditVessel } from "./vessel.interface";

export class VesselService {
  constructor(private readonly prismaservice: PrismaService) {}

  async getAllVessel() {
    const response = await this.prismaservice.vessel.findMany();
    response.map((res) => {
      res.password = "";
    });
    return {
      code: 200,
      response: response,
    };
  }

  async getUserById(id: string) {
    const response = await this.prismaservice.vessel.findUnique({
      where: {
        id: id,
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

  async getUserByVesselName(name: string) {
    const response = await this.prismaservice.vessel.findFirst({
      where: {
        name: name,
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

  async editVesselData(id: string, data: EditVessel) {
    const isExist = await this.prismaservice.vessel.findFirst({
      where: {
        id: id,
      },
    });
    if (isExist) {
      const updateVesselData = {
        name: data.name || isExist.name,
        email: data.email || isExist.email,
        fleet: data.fleet || isExist.fleet,
        type: data.type || isExist.type,
      };
      const response = await this.prismaservice.vessel.update({
        where: {
          id: id,
        },
        data: updateVesselData,
      });
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

  async deleteVessel(id: string) {
    const isExist = await this.prismaservice.vessel.findFirst({
        where: {
            id: id,
        },
    });
    if (isExist) {
        const response = await this.prismaservice.vessel.delete({
            where: {
                id: id,
            },
        });
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
}
