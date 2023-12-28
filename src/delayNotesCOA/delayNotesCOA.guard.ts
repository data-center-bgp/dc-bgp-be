import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "@prisma/client";

export class DelayNotesCOAGuard {

    authenticate(token: string) {
        try {
            return jwt.verify(token, String(process.env["JWT_KEY"])) as JwtPayload;
        } catch (err) {
            return false;
        }
    }

    authorize(id: string, token: string, requiredRole: string) {
        try {
            const decodedToken = this.authenticate(token);
            if (typeof decodedToken === "boolean") {
                return false;
            }
            if (decodedToken.id === id) {
                return false;
            }
            if (decodedToken.role !== requiredRole) {
                return false;
            }
            return true;
        } catch (err) {
            return false;
        }
    }

    roleGuard(id: string, token: string, requiredRole: string) {
        try {
            const isAuthorized = this.authorize(id, token, requiredRole);
            console.log("isAuthorized:", isAuthorized);
            if (!isAuthorized) {
                return false;
            }
            const decodedToken = this.authenticate(token);
            if (typeof decodedToken === "boolean") {
                return false;
            }
            if (decodedToken.role !== Role.MASTER) {
                return false;
            }
            console.log(decodedToken);
            return true;
        } catch (err) {
            return false;
        }
    }
}