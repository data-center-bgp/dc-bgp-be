import express, { Request, Response, NextFunction } from "express";
import { PrismaService } from "../prisma.service";
import { AttendanceRecordService } from "./attendanceRecord.service";
import { AttendanceRecordGuard } from "./attendanceRecord.guard";
import { Role } from "@prisma/client";

const prismaService = new PrismaService();
const attendanceRecordService = new AttendanceRecordService(prismaService);
const attendanceRecordGuard = new AttendanceRecordGuard();
const attendanceRecordRouter = express.Router();

interface CustomRequest extends Request {
  id?: string;
  role?: string;
}

const authenticationMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = String(
      req.headers["authorization"]?.split(" ")[1].replace("'", "")
    );
    const checkToken = attendanceRecordGuard.authentication(token);
    if (checkToken) {
      req.id = checkToken.id;
      req.role = checkToken.role;
      next();
    } else {
      res.status(401).json("Invalid token!");
    }
  } catch (err) {
    req.id = "";
    res.status(500).json("Error authenticating!");
  }
};

const authorizationMiddleware =
  (allowedRoles: Role[]) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = String(
        req.headers["authorization"]?.split(" ")[1]?.replace("'", "")
      );
      const decodedRole = attendanceRecordGuard.getRoleFromToken(token);
      const decodedType = attendanceRecordGuard.getTypeFromToken(token);
      if (decodedRole === null || decodedType === null) {
        res.status(401).json("Invalid token!");
      } else if (decodedType !== "user" || !allowedRoles.includes(decodedRole)) {
        next();
      }
    } catch (err) {
      console.error("Error in authorizationMiddleware:", err);
      res.status(500).json("Server error!");
    }
  };

attendanceRecordRouter.get(
  "/",
  authorizationMiddleware([Role.ADMIN, Role.MANAGER, Role.MASTER]),
  async (req: Request, res: Response) => {
    try {
      const response =
        await attendanceRecordService.getAllAttendanceRecord();
      res.status(response.code).json(response.response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

attendanceRecordRouter.get(
  "/:id",
  authorizationMiddleware([Role.ADMIN, Role.MANAGER, Role.MASTER]),
  async (req, res) => {
    try {
      const attendanceRecord =
        await attendanceRecordService.getAttendanceRecordById(req.params.id);
      res.status(200).json(attendanceRecord);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

attendanceRecordRouter.get(
  "/crew/:crewId",
  authorizationMiddleware([Role.ADMIN, Role.MANAGER, Role.MASTER]),
  async (req, res) => {
    try {
      const attendanceRecord =
        await attendanceRecordService.getAttendanceRecordByCrewId(
          req.params.crewId
        );
      res.status(200).json(attendanceRecord);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

attendanceRecordRouter.post("/create", async (req, res) => {
  try {
    const attendanceRecord =
      await attendanceRecordService.createAttendanceRecord(req.body);
    res.status(200).json(attendanceRecord);
  } catch (err) {
    res.status(500).json(err);
  }
});

attendanceRecordRouter.patch(
  "/update/:id",
  authorizationMiddleware([Role.MASTER, Role.ADMIN]),
  async (req, res) => {
    try {
      const attendanceRecord =
        await attendanceRecordService.editAttendanceRecord(
          req.params.id,
          req.body
        );
      res.status(200).json(attendanceRecord);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

attendanceRecordRouter.delete(
  "/delete/:id",
  authorizationMiddleware([Role.MASTER]),
  async (req, res) => {
    try {
      const attendanceRecord =
        await attendanceRecordService.deleteAttendanceRecord(req.params.id);
      res.status(200).json(attendanceRecord);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

export { attendanceRecordRouter };
