import { Person } from "../bazara-DTOs/Person";
import { IBazaraPersonAddress } from "../bazara-DTOs/IBazaraPersonAddress";

export interface IPeople_Addresses {
    personId: number,
    name: string,
    personAddresses: IPersonAddress[]
}

export interface IPersonAddress {
    personAddressId: number,
    title: string,
    address: string,
    latitude: number,
    longitude: number,
    mobile: number
}