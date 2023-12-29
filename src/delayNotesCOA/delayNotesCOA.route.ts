import express, { NextFunction, Request, Response } from "express";
import { PrismaService } from "../prisma.service";
import { DelayNotesCOAService } from "./delayNotesCOA.service";
import { DelayNotesCOAGuard } from "./delayNotesCOA.guard";

const prismaService = new PrismaService();
const delayNotesCOAService = new DelayNotesCOAService(prismaService);
const delayNotesCOAGuard = new DelayNotesCOAGuard();
const delayNotesCOARouter = express.Router();

const authenticationMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = String(
            req.headers["authorization"]?.split(" ")[1].replace("'", "")
        );
        const checkToken = delayNotesCOAGuard.authenticate(token);
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
        if (delayNotesCOAGuard.authorize(req.params.id, token, req.params.requiredRole)) {
            next();
        } else {
            res.status(403).json("Forbidden!")
        };
    } catch (err) {
        res.status(500).json("Server error!")
    }
}

delayNotesCOARouter.get("/delayNotesCOA", authenticationMiddleware, async (req, res) => {
    try {
        const response = await delayNotesCOAService.getAllDelayNotesCOA();
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json(err);
    }
});

delayNotesCOARouter.get("/delayNotesCOA/:id", authenticationMiddleware, async (req, res) => {
    try {
        const response = await delayNotesCOAService.getDelayNotesCOAById(req.params.id);
        res.status(response.code).json(response.response)
    } catch (err) {
        res.status(500).json(err);
    }
});

delayNotesCOARouter.post("/delayNotesCOA", authenticationMiddleware, async (req, res) => {
    try {
        const response = await delayNotesCOAService.createDelayNotesCOA(req.body);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json(err);
    }
});

delayNotesCOARouter.patch("/delayNotesCOA/:id", authenticationMiddleware, async (req, res) => {
    try {
        const response = await delayNotesCOAService.editDelayNotesCOA(req.params.id, req.body);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json(err);
    }
});

delayNotesCOARouter.delete("/delayNotesCOA/:id", authenticationMiddleware, authorizationMiddleware, async (req, res) => {
    try {
        const response = await delayNotesCOAService.deleteDelayNotesCOA(req.params.id);
        res.status(response.code).json(response.response);
    } catch (err) {
        res.status(500).json(err);
    }
});

export { delayNotesCOARouter }