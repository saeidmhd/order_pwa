import { IBazaraPerson } from "../bazara-DTOs/IBazaraPerson"
import { IBazaraPersonAddress } from "../bazara-DTOs/IBazaraPersonAddress"
import { IBazaraPhotoGallery } from "../bazara-DTOs/IBazaraPhotoGallery"
import { IBazaraPicture } from "../bazara-DTOs/IBazaraPicture"
import { IBazaraProduct } from "../bazara-DTOs/IBazaraProduct"
import { IBazaraProductDetail } from "../bazara-DTOs/IBazaraProductDetail"
import { IBazaraProductDetailStoreAsset } from "../bazara-DTOs/IBazaraProductDetailAssetStore"
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
    VisitorProducts: IBazaraVisitorProduct[],
    PhotoGalleries: IBazaraPhotoGallery[],
    Pictures: IBazaraPicture[],
    ProductDetailStoreAssets: IBazaraProductDetailStoreAsset[]
}