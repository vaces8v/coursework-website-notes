
export interface IUser {
    id: number;
    name: string;
    lastName: string;
    email: string;
    passwordHash: string;
}

export interface IResToken {
    token: string;
}

export interface LoginDTO {
    email: string;
    password: string;
}

export interface RegisterDTO {
    name: string;
    lastName: string;
    email: string;
    password: string;
}