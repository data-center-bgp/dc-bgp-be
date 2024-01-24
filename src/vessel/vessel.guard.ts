import { Role } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export class VesselGuard {
  authentication(token: string) {
    try {
      return jwt.verify(token, String(process.env.JWT_KEY)) as JwtPayload;
    } catch (err) {
      return false;
    }
  }

  authorization(id: string, token: string) {
    try {
      const decodedToken = this.authentication(token);
      if (typeof decodedToken === "boolean") {
        return false;
      }
      if (decodedToken.id !== id) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }

  getRoleFromToken(token: string): Role | null {
    try {
      const decodedToken = jwt.verify(
        token,
        process.env.JWT_KEY as string
      ) as JwtPayload;
      return decodedToken.role;
    } catch (err) {
      return null;
    }
  }

  getTypeFromToken(token: string): string | null {
    try {
      const decodedType = jwt.verify(token, process.env.JWT_KEY as string) as JwtPayload;
      return decodedType.userType;
    } catch (err) {
      return null;
    }
  }
}