import { IBazaraPerson } from "../bazara-DTOs/IBazaraPerson"
import { IBazaraPersonAddress } from "../bazara-DTOs/IBazaraPersonAddress"
import { IBazaraProduct } from "../bazara-DTOs/IBazaraProduct"
import { IBazaraProductDetail } from "../bazara-DTOs/IBazaraProductDetail"
import { IBazaraVisitorProduct } from "../bazara-DTOs/IBazaraVisitorProduct"

export interface IApiResult {
    Data: IObject,
    Result: boolean
}

export interface IObject {
    Objects: IBazaraData
}

export interface IBazaraData {
    PersonAddresses: IBazaraPersonAddress[],
    People: IBazaraPerson[],
    Products: IBazaraProduct[],
    ProductDetails: IBazaraProductDetail[],
    VisitorProducts: IBazaraVisitorProduct[]
}