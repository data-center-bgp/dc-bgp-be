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