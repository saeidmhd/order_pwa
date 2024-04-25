import { Person } from "../bazara-DTOs/Person"
import { PersonAddress } from "../bazara-DTOs/PersonAddress"
import { PhotoGallery } from "../bazara-DTOs/PhotoGallery"
import { Picture } from "../bazara-DTOs/Picture"
import { Product } from "../bazara-DTOs/Product"
import { ProductDetail } from "../bazara-DTOs/ProductDetail"
import { ProductDetailStoreAsset } from "../bazara-DTOs/ProductDetailAssetStore"
import { VisitorProduct } from "../bazara-DTOs/VisitorProduct"

export interface IApiResult {
    Data: IObject,
    Result: boolean
}

export interface IObject {
    Objects: IBazaraData
}

export interface IBazaraData {
    PersonAddresses: PersonAddress[],
    People: Person[],
    Products: Product[],
    ProductDetails: ProductDetail[],
    VisitorProducts: VisitorProduct[],
    PhotoGalleries: PhotoGallery[],
    Pictures: Picture[],
    ProductDetailStoreAssets: ProductDetailStoreAsset[]
}