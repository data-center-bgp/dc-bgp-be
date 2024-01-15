import express, { NextFunction, Request, Response } from "express";
import { PrismaService } from "../prisma.service";
import { CycleTimeCOAService } from "./cycleTimeCOA.service";
import { CycleTimeCOAGuard } from "./cycleTimeCOA.guard";
import { Role } from "@prisma/client";

const prismaService = new PrismaService();
const cycleTimeCOAService = new CycleTimeCOAService(prismaService);
const cycleTimeCOAGuard = new CycleTimeCOAGuard();
const cycleTimeCOARouter = express.Router();

const authenticationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = String(
            req.headers["authorization"]?.split(" ")[1].replace("'", "")
        );
        const checkToken = cycleTimeCOAGuard.authenticate(token);
        if (checkToken) {
            next();
        } else {
            res.status(401).json("Invalid token!")
        };
    } catch (err) {
        res.status(500).json("Error authenticating!")
    }
}

const authorizationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = String(
            req.headers["authorization"]?.split(" ")[1].replace("'", "")
        );
        if (cycleTimeCOAGuard.authorize(req.params.id, token, req.params.requiredRole)) {
            next();
        } else {
            res.status(403).json("Forbidden!");
        }
    } catch (err) {
        res.status(500).json("Server error!")
    }
};

const roleGuard = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = String(
            req.headers["authorization"]?.split(" ")[1].replace("'", "")
        );
        if (cycleTimeCOAGuard.roleGuard(req.params.id, token, req.params.requiredRole)) {
            next();
        } else {
            res.status(403).json("Forbidden!");
        }
    } catch (err) {
        res.status(500).json("Server error!")
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
        const response = await cycleTimeCOAService.getCycleTimeCOAByID(req.params.id);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json(err);
    }
});

cycleTimeCOARouter.get("/:month", authenticationMiddleware, async (req, res) => {
    try {
        const response = await cycleTimeCOAService.getCycleTimeCOAByMonth(req.params.month);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json(err);
    }
});

cycleTimeCOARouter.get("/:fleet", authenticationMiddleware, async (req, res) => {
    try {
        const response = await cycleTimeCOAService.getCycleTimeCOAByFleet(req.params.fleet);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json(err);
    }
});

cycleTimeCOARouter.post("/create", authenticationMiddleware, async (req, res) => {
    try {
        const response = await cycleTimeCOAService.createCycleTimeCOA(req.body);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json(err);
    }
});

cycleTimeCOARouter.patch("/update/:id", authenticationMiddleware, async (req, res) => {
    try {
        const response = await cycleTimeCOAService.editCycleTimeCOA(req.params.id, req.body);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json(err);
    }
});

cycleTimeCOARouter.delete("/delete/:id", authenticationMiddleware, authorizationMiddleware, async (req, res) => {
    try {
        const response = await cycleTimeCOAService.deleteCycleTimeCOA(req.params.id);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json(err);
    }
})

export { cycleTimeCOARouter }; 