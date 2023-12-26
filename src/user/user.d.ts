import { Role } from "@prisma/client";

declare namespace Express {
    export interface Request {
        id: string;
        role: Role;
    }
}