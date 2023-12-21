import { PrismaService } from "../prisma.service";
import { EditUser } from "./user.interface";
import { Role } from "@prisma/client";

export class DoctorService {
    constructor(private readonly prismaService: PrismaService) {}

    async getAllUser(role: Role) {
        if (role !== Role.MASTER) {
            return {
                code: 403,
                response: "You don't have permission to access this resource!"
            }
        }
        const response = await this.prismaService.user.findMany();
        response.map((res) => {
            res.password = "";
        });
        return {
            code: 200,
            response: response,
        };
    };

    async getUserByEmail(role: Role, email: string) {
        if (role !== Role.MASTER) {
            return {
                code: 403,
                response: "You don't have permission to access this resource!"
            }
        }
        const response = await this.prismaService.user.findFirst({
            where: {
                email: email
            },
        });
        if (response) {
            response.password = "";
            return {
                code: 200,
                response: response,
            }
        }
        return {
            code: 403,
            response: "User is not found!"
        };
    };

    async editUserData(role: Role, id: string, data: EditUser) {
        if (role !== Role.MASTER) {
            return {
                code: 403,
                response: "You don't have permission to access this resource!"
            };
        };
        const isExist = await this.prismaService.user.findFirst({
            where: {
                id: id,
            },
        });
        if (isExist) {
            const updateUserData = {
                email: data.email || isExist.email,
                password: data.password || isExist.password,
                name: data.name || isExist.name,
                role: data.role || isExist.role,
            };
            const response = await this.prismaService.user.update({
                where: {
                    id: id,
                },
                data: updateUserData,
            });
            response.password = "";
            if (response) {
                return {
                    code: 201,
                    response: response,
                };
            }
            return {
                code: 400,
                response: "Bad request!",
            };
        }
        return {
            code: 404,
            response: "User not found!"
        };
    }

     async deleteUser(role: Role, id: string) {
         if (role !== Role.MASTER) {
             return {
                 code: 403,
                 response: "You don't have permission to access this resource!"
             }
         }
         const response = await this.prismaService.user.delete({
             where: {
                 id: id
             }
         });
         return {
             code: 200,
             response: response
         };
     }
}