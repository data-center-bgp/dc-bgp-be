import jwt, { JwtPayload } from "jsonwebtoken";
import { Role } from "@prisma/client";

export class DelayNotesCOAGuard {
  authentication(token: string) {
    try {
      return jwt.verify(token, String(process.env["JWT_KEY"])) as JwtPayload;
    } catch (err) {
      return false;
    }
  }

  authorize(id: string, token: string, allowedRoles: Role[]) {
    try {
      const decodedToken = this.authentication(token);
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

  getRoleFromToken(token: string): Role | null {
    try {
      const decodedToken = jwt.verify(
        token,
        String(process.env["JWT_KEY"])
      ) as JwtPayload;
      return decodedToken.role;
    } catch (err) {
      return null;
    }
  }
}
