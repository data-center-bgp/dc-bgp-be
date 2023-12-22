export interface UserRegister {
    email: string;
    password: string;
    name: string;
    role: Role
}

export enum Role {
    MASTER = 'MASTER',
    ADMIN = 'ADMIN',
    MANAGER = 'MANAGER'
}

export interface UserLogin {
    email: string;
    password: string;
}

export interface EditUser {
    email: string | undefined;
    password: string | undefined;
    name: string | undefined;
    role: Role | undefined;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}