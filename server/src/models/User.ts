export interface IUser {
    userId: number;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    registrationDate: string;
    role?: number;
    refreshToken?: string;
}
export interface ICreateUser {
    email: string;
    password: string;
    registrationDate: string;
}
export interface IUpdateUser {
    userId?: number;
    firstName?: string;
    lastName?: string;
    email: string;
    password: string;
    registrationDate: string;
    role?: number;
}
