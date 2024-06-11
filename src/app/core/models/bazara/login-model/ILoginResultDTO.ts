import { Login } from "../bazara-DTOs/Login";

export interface ILoginResult {
    Result: boolean,
    Data?: Login,
    Code?: number; // Make the Code property optional
    Message: string;
}