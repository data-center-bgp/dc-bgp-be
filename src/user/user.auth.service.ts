import { PrismaService } from "../prisma.service";
import { UserRegister, UserLogin } from "./user.interface";
import * as bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

export class UserAuth {
    constructor(private readonly prismaService: PrismaService) {}

    async register(data: UserRegister) {
        
    }
}