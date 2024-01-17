import express, { NextFunction, Request, Response } from "express";
import { PrismaService } from "../prisma.service";
import { CycleTimeCOAService } from "./cycleTimeCOA.service";
import { CycleTimeCOAGuard } from "./cycleTimeCOA.guard";
import { Role } from "@prisma/client";

const prismaService = new PrismaService();
const cycleTimeCOAService = new CycleTimeCOAService(prismaService);
const cycleTimeCOAGuard = new CycleTimeCOAGuard();
const cycleTimeCOARouter = express.Router();

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
    const checkToken = cycleTimeCOAGuard.authentication(token);
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
      const userRole = cycleTimeCOAGuard.getRoleFromToken(token);
      if (userRole === null) {
        res.status(401).json("Invalid token!");
      } else if (allowedRoles.includes(userRole)) {
        next();
      } else {
        res.status(403).json("You don't have permission to access this!");
      }
    } catch (err) {
      res.status(500).json("Server error!");
    }
  };

cycleTimeCOARouter.get("/", authenticationMiddleware, async (req, res) => {
  try {
    const response = await cycleTimeCOAService.getAllCycleTimeCOA();
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

cycleTimeCOARouter.get("/:id", authenticationMiddleware, async (req, res) => {
  try {
    const response = await cycleTimeCOAService.getCycleTimeCOAByID(
      req.params.id
    );
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

cycleTimeCOARouter.get(
  "/:month",
  authenticationMiddleware,
  async (req, res) => {
    try {
      const response = await cycleTimeCOAService.getCycleTimeCOAByMonth(
        req.params.month
      );
      res.status(response.code).json(response.response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

cycleTimeCOARouter.get(
  "/:fleet",
  authenticationMiddleware,
  async (req, res) => {
    try {
      const response = await cycleTimeCOAService.getCycleTimeCOAByFleet(
        req.params.fleet
      );
      res.status(response.code).json(response.response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

cycleTimeCOARouter.post(
  "/create",
  authorizationMiddleware([Role.MASTER, Role.ADMIN]),
  async (req, res) => {
    try {
      const response = await cycleTimeCOAService.createCycleTimeCOA(req.body);
      res.status(response.code).json(response.response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

cycleTimeCOARouter.patch(
  "/edit/:id",
  authorizationMiddleware([Role.MASTER, Role.ADMIN]),
  async (req, res) => {
    try {
      const response = await cycleTimeCOAService.editCycleTimeCOA(
        req.params.id,
        req.body
      );
      res.status(response.code).json(response.response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

cycleTimeCOARouter.delete(
  "/delete/:id",
  authenticationMiddleware,
  authorizationMiddleware([Role.MASTER]),
  async (req, res) => {
    try {
      const response = await cycleTimeCOAService.deleteCycleTimeCOA(
        req.params.id
      );
      res.status(response.code).json(response.response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

export { cycleTimeCOARouter };
