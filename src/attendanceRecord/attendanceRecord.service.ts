import { PrismaService } from "../prisma.service";
import {
  CreateAttendanceRecord,
  EditAttendanceRecord,
} from "./attendanceRecord.interface";

export class AttendanceRecordService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAllAttendanceRecord() {
    try {
      const response = await this.prismaService.attendanceRecord.findMany();
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

  async getAttendanceRecordById(id: string) {
    try {
      const response = await this.prismaService.attendanceRecord.findUnique({
        where: {
          id: id,
        },
      });
      if (response === null) {
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

  async getAttendanceRecordByCrewId(crewId: string) {
    try {
      const response = await this.prismaService.attendanceRecord.findMany({
        where: {
          crewId: crewId,
        },
      });
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

  async createAttendanceRecord(data: CreateAttendanceRecord) {
    try {
      const response = await this.prismaService.attendanceRecord.create({
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

  async editAttendanceRecord(id: string, data: EditAttendanceRecord) {
    try {
      const response = await this.prismaService.attendanceRecord.update({
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

  async deleteAttendanceRecord(id: string) {
    try {
      const response = await this.prismaService.attendanceRecord.delete({
        where: {
          id: id,
        },
      });
      return {
        code: 200,
        response: `Attendance record with ID ${id} has been deleted!`,
      };
    } catch (err) {
      return {
        code: 500,
        response: "Internal server error!",
      };
    }
  }
}
