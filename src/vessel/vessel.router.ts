import express, { NextFunction, Request, Response } from "express";
import { PrismaService } from "../prisma.service";
import { VesselAuth } from "./vessel.auth.service";
import { VesselService } from "./vessel.service";
import { ChangePassword, EditVessel } from "./vessel.interface";
import { VesselGuard } from "./vessel.guard";
import { Role } from "@prisma/client";

const prismaService = new PrismaService();
const vesselAuth = new VesselAuth(prismaService);
const vesselService = new VesselService(prismaService);
const vesselRouter = express.Router();
const vesselGuard = new VesselGuard();

interface CustomRequest extends Request {
  id?: string;
  role?: Role;
}

const authenticationMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = String(req.headers["authorization"]?.split(" ")[1].replace("'", ""));
    const checkToken = vesselGuard.authentication(token);
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
}

const authorizationMiddleware = (allowedRoles: Role[], ) => (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = String(req.headers["authorization"]?.split(" ")[1].replace("'", ""));
    const userRole = vesselGuard.getRoleFromToken(token);
    const userType = vesselGuard.getTypeFromToken(token);
    if (userRole === null || userType === null) {
      res.status(401).json("Invalid token!");
    } else if (userType !== 'user' ) {
      res.status(403).json("You don't have permission to access this!");
    } else if (allowedRoles.includes(userRole)) {
      next();
    }
  } catch (err) {
    res.status(500).json("Server error!");
  }
}
