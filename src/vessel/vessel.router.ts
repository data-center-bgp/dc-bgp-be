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
    const token = String(
      req.headers["authorization"]?.split(" ")[1].replace("'", "")
    );
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
};

const authorizationMiddleware =
  (allowedRoles: Role[]) =>
  (req: CustomRequest, res: Response, next: NextFunction) => {
    try {
      const token = String(
        req.headers["authorization"]?.split(" ")[1].replace("'", "")
      );
      const userRole = vesselGuard.getRoleFromToken(token);
      const userType = vesselGuard.getTypeFromToken(token);
      if (userRole === null || userType === null) {
        res.status(401).json("Invalid token!");
      } else if (userType !== "user") {
        res.status(403).json("You don't have permission to access this!");
      } else if (allowedRoles.includes(userRole)) {
        next();
      }
    } catch (err) {
      res.status(500).json("Server error!");
    }
  };

vesselRouter.post("/auth/register", async (req: Request, res: Response) => {
  try {
    const response = await vesselAuth.register(req.body);
    res.status(response.code).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

vesselRouter.post("/auth/login", async (req: Request, res: Response) => {
  try {
    const response = await vesselAuth.login(req.body);
    res.status(response.code).json(response);
  } catch (err) {
    res.status(500).json(err);
  }
});

vesselRouter.get("/", authorizationMiddleware, async (req: Request, res: Response) => {
  try {
    const response = await vesselService.getAllVessel();
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

vesselRouter.get("/:id", authorizationMiddleware, async (req: Request, res: Response) => {
  try {
    let id = req.params.id;
    if (typeof req.query.id === "string") {
      id = req.query.id;
    } else {
      id = "";
    }
    const response = await vesselService.getVesselById(id);
    res.status(response.code).json(response.response)
  } catch (err) {
    res.status(500).json(err);
  }
});

vesselRouter.get("/name/:name", authorizationMiddleware, async (req: Request, res: Response) => {
  try {
    let name = req.params.name;
    if (typeof req.query.name === "string") {
      name = req.query.name;
    } else {
      name = "";
    }
    const response = await vesselService.getVesselByName(name);
    res.status(response.code).json(response.response)
  } catch (err) {
    res.status(500).json(err);
  }
});

vesselRouter.patch("/edit/:id", authorizationMiddleware([Role.MASTER]), async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await vesselService.editVesselData(id, req.body);
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

vesselRouter.delete("/delete/:id", authorizationMiddleware([Role.MASTER]), async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const response = await vesselService.deleteVessel(id);
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

export { vesselRouter };