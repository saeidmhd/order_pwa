import { IBazaraPerson } from "../bazara-DTOs/IBazaraPerson";
import { IBazaraPersonAddress } from "../bazara-DTOs/IBazaraPersonAddress";

export interface IPeople_Addresses {
    personId: number,
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