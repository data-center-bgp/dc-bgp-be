import { Role } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";

export class CycleTimeCOAGuard {
  authenticate(token: string): JwtPayload | boolean {
    try {
      return jwt.verify(token, String(process.env["JWT_KEY"])) as JwtPayload;
    } catch (err) {
      return false;
    }
  }

  authorize(id: string, token: string, allowedRoles: Role[]): boolean {
    try {
      const decodedToken = this.authenticate(token);
      if (typeof decodedToken === "boolean") {
        return false;
      }
      if (decodedToken.id !== id) {
        return false;
      }
      if (!allowedRoles.includes(decodedToken.role)) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }

  roleGuard(id: string, token: string, allowedRoles: Role[]) {
    try {
      const decodedToken = this.authenticate(token);
      if (typeof decodedToken === "boolean") {
        return false;
      }
      if (!allowedRoles.includes(decodedToken.role)) {
        return false;
      }
      return true;
    } catch (err) {
      return false;
    }
  }
}
