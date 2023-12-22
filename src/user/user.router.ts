import express, { NextFunction, Request, Response } from "express";
import { PrismaService } from "../prisma.service";
import { UserAuth } from "./user.auth.service";
import { UserService } from "./user.service";
import { ChangePassword, EditUser } from "./user.interface";
import { UserGuard } from "./user.guard";
import { Role } from "@prisma/client";

const prismaService = new PrismaService();
const userAuth = new UserAuth(prismaService);
const userService = new UserService(prismaService);
const userRouter = express.Router();
const userGuard = new UserGuard();

interface CustomRequest extends Request {
    id: string;
    role: Role;
}

const authenticationMiddleware = (
    req: CustomRequest,
    res: Response,
    next: NextFunction,
) => {
    try {
        const token = String(
            req.headers["authorization"]?.split(" ")[1].replace("'", "")
        );
        const checkToken = userGuard.authentication(token);
        if (checkToken) {
            req.id = checkToken.id;
            req.role = checkToken.role;
            next();
        } else {
            res.status(401).json("Error authenticating!")
        }
    } catch (err) {
        
    }
}
