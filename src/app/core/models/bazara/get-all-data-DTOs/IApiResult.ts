import { Bank } from "../bazara-DTOs/Bank"
import { IBazaraPerson } from "../bazara-DTOs/IBazaraPerson"
import { IBazaraPersonAddress } from "../bazara-DTOs/IBazaraPersonAddress"
import { IBazaraPhotoGallery } from "../bazara-DTOs/IBazaraPhotoGallery"
import { IBazaraPicture } from "../bazara-DTOs/IBazaraPicture"
import { IBazaraProduct } from "../bazara-DTOs/IBazaraProduct"
import { IBazaraProductDetail } from "../bazara-DTOs/IBazaraProductDetail"
import { IBazaraProductDetailStoreAsset } from "../bazara-DTOs/IBazaraProductDetailAssetStore"
import { IBazaraVisitorPerson } from "../bazara-DTOs/IBazaraVisitorPerson"
import { IBazaraVisitorProduct } from "../bazara-DTOs/IBazaraVisitorProduct"
import { Mission } from "../bazara-DTOs/Mission"
import { MissionDetail } from "../bazara-DTOs/MissionDetail"
import { ExtraData } from "../bazara-DTOs/extra-data"
import { Order } from "../bazara-DTOs/order"
import { OrderDetail } from "../bazara-DTOs/order-detail"
import { ProductCategory } from "../bazara-DTOs/product-category"
import { PropertyDescription } from "../bazara-DTOs/property-description"
import { Setting } from "../bazara-DTOs/setting"

export interface IApiResult {
    Data: IObject,
    Result: boolean
}

export interface IObject {
    Objects: IBazaraData
}

export interface IBazaraData {
    Banks: Bank[],
    PersonAddresses: IBazaraPersonAddress[],
    People: IBazaraPerson[],
    VisitorPeople: IBazaraVisitorPerson[],
    Products: IBazaraProduct[],
    ProductDetails: IBazaraProductDetail[],
    VisitorProducts: IBazaraVisitorProduct[],
    PhotoGalleries: IBazaraPhotoGallery[],
    Pictures: IBazaraPicture[],
    ProductDetailStoreAssets: IBazaraProductDetailStoreAsset[],
    Missions: Mission[],
    MissionDetails: MissionDetail[],
    ProductCategories:ProductCategory[],
    Orders:Order[],
    OrderDetails:OrderDetail[],
    PropertyDescriptions:PropertyDescription[]
    Settings:Setting[]
    ExtraDatas:ExtraData[]
    
}