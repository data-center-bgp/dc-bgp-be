export interface VesselRegister {
    email: string;
    password: string;
    name: string;
    fleet: string;
    type: string;
}

export interface VesselLogin {
    email: string;
    password: string;
}

export interface EditVessel {
    email: string | undefined;
    password: string | undefined;
    name: string | undefined;
    fleet: string | undefined;
    type: string | undefined;
}

export interface ChangePassword {
    oldPassword: string;
    newPassword: string;
}