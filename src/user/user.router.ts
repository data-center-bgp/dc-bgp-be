import express, {
  NextFunction,
  Request,
  RequestHandler,
  Response,
} from "express";
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
    const checkToken = userGuard.authentication(token);
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

const authorizationMiddleware = (
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const token = String(
      req.headers["authorization"]?.split(" ")[1].replace("'", "")
    );
    if (userGuard.authorization(req.params.id, token)) {
      next();
    } else {
      res.status(403).json("Forbidden!");
    }
  } catch (err) {
    res.status(500).json("Server error!");
  }
};

// REGISTER USER
userRouter.post("/auth/register", async (req, res) => {
  try {
    const response = await userAuth.register(req.body);
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// LOGIN USER
userRouter.post("/auth/login", async (req, res) => {
  try {
    const response = await userAuth.login(req.body);
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET ALL USER
userRouter.get("/", async (req, res) => {
  try {
    const response = await userService.getAllUser(req.body);
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET USER BY EMAIL
userRouter.get("/search", async (req, res) => {
  try {
    let email: string;
    if (typeof req.query.email === "string") {
      email = req.query.email;
    } else {
      email = "";
    }
    const role = Role;
    const response = await userService.getUserByEmail(role.MASTER, email);
    res.status(response.code).json(response.response);
  } catch (err) {
    res.status(500).json(err);
  }
});

userRouter
  .route("/:id")
  .patch(
    authenticationMiddleware,
    authorizationMiddleware,
    async (req: CustomRequest, res: Response) => {
      try {
        const id = req.params.id;
        const data: EditUser = req.body;
        const response = await userService.editUserData(Role.MASTER, id, data);
        res.status(response.code).json(response.response);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

userRouter
  .route("/:id")
  .delete(
    authenticationMiddleware,
    authorizationMiddleware,
    async (req, res) => {
      try {
        const id = req.params.id;
        const response = await userService.deleteUser(Role.MASTER, id);
        res.status(response.code).json(response.response);
      } catch (err) {
        res.status(500).json(err);
      }
    }
  );

  userRouter.patch(
    "change-password/:id",
    authenticationMiddleware,
    authorizationMiddleware,
    async (req, res) => {
        try {
            const id = req.params.id;
            const data: ChangePassword = req.body;
            const response = await userAuth.changePassword(id, data);
            res.status(response.code).json(response.response);
        } catch (err) {
            res.status(500).json(err);
        }
    }
  )

  export { userRouter };