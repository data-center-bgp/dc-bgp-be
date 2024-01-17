import express, { NextFunction, Request, Response } from "express";
import { PrismaService } from "../prisma.service";
import { DelayNotesCOAService } from "./delayNotesCOA.service";
import { DelayNotesCOAGuard } from "./delayNotesCOA.guard";
import { Role } from "@prisma/client";

const prismaService = new PrismaService();
const delayNotesCOAService = new DelayNotesCOAService(prismaService);
const delayNotesCOAGuard = new DelayNotesCOAGuard();
const delayNotesCOARouter = express.Router();

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
    const checkToken = delayNotesCOAGuard.authentication(token);
    if (checkToken) {
      req.id = checkToken.id;
      req.role = checkToken.role;
      next();
    } else {
      res.status(401).json("Invalid token!");
    }
  } catch (err) {
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
      const userRole = delayNotesCOAGuard.getRoleFromToken(token);
      if (userRole === null) {
        res.status(401).json("Invalid token!");
      } else if (allowedRoles.includes(userRole)) {
        next();
      } else {
        res
          .status(403)
          .json("You don't have permission to access this resource!");
      }
    } catch (err) {
      res.status(500).json("Server error!");
    }
  };

delayNotesCOARouter.get("/", authenticationMiddleware, async (req, res) => {
  try {
    const response = await delayNotesCOAService.getAllDelayNotesCOA();
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

delayNotesCOARouter.get("/:id", authenticationMiddleware, async (req, res) => {
  try {
    const response = await delayNotesCOAService.getDelayNotesCOAById(
      req.params.id
    );
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

delayNotesCOARouter.post(
  "/create",
  authorizationMiddleware([Role.MASTER, Role.ADMIN]),
  async (req, res) => {
    try {
        const { cycleTimeCOAId, ...data } = req.body;
      const response = await delayNotesCOAService.createDelayNotesCOA(data, cycleTimeCOAId);
      res.status(response.code).json(response.response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

delayNotesCOARouter.patch(
  "/update/:id",
  authorizationMiddleware([Role.MASTER, Role.ADMIN]),
  async (req, res) => {
    try {
        const { cycleTimeCOAId, ...data } = req.body;
      const response = await delayNotesCOAService.editDelayNotesCOA(
        req.params.id,
        cycleTimeCOAId,
        data
      );
      res.status(response.code).json(response.response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

delayNotesCOARouter.delete(
  "/delete/:id",
  authenticationMiddleware,
  authorizationMiddleware([Role.MASTER]),
  async (req, res) => {
    try {
      const response = await delayNotesCOAService.deleteDelayNotesCOA(
        req.params.id
      );
      res.status(response.code).json(response.response);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

export { delayNotesCOARouter };