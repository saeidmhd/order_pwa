import { IBazaraLogin } from "../bazara-DTOs/IBazaraLogin";

export interface ILoginResult {
    Result: boolean,
    Data?: IBazaraLogin,
    Code?: number; // Make the Code property optional
    Message: string;
}