import { Bank } from "../bazara-DTOs/bank";
import { Person } from "../bazara-DTOs/person";
import { PersonAddress } from "../bazara-DTOs/personAddress";
import { PhotoGallery } from "../bazara-DTOs/photoGallery";
import { Picture } from "../bazara-DTOs/picture";
import { Product } from "../bazara-DTOs/product";
import { ProductDetail } from "../bazara-DTOs/productDetail";
import { ProductDetailStoreAsset } from "../bazara-DTOs/productDetailAssetStore";
import { VisitorPerson } from "../bazara-DTOs/visitorPerson";
import { VisitorProduct } from "../bazara-DTOs/visitorProduct";
import { Mission } from "../bazara-DTOs/mission";
import { MissionDetail } from "../bazara-DTOs/missionDetail";
import { Order } from "../bazara-DTOs/order";
import { OrderDetail } from "../bazara-DTOs/order-detail";
import { ProductCategory } from "../bazara-DTOs/product-category";
import { PropertyDescription } from "../bazara-DTOs/property-description";
import { Setting } from "../bazara-DTOs/setting";
import { ExtraData } from "../bazara-DTOs/extra-data";

export interface IApiResult {
    Data: IObject,
    Result: boolean
}

export interface IObject {
    Objects: IBazaraData
}

export interface IBazaraData {
    Banks: Bank[],
    PersonAddresses: PersonAddress[],
    People: Person[],
    VisitorPeople: VisitorPerson[],
    Products: Product[],
    ProductDetails: ProductDetail[],
    VisitorProducts: VisitorProduct[],
    PhotoGalleries: PhotoGallery[],
    Pictures: Picture[],
    ProductDetailStoreAssets: ProductDetailStoreAsset[],
    Missions: Mission[],
    MissionDetails: MissionDetail[],
    ProductCategories:ProductCategory[],
    Orders:Order[],
    OrderDetails:OrderDetail[],
    PropertyDescriptions:PropertyDescription[]
    Settings:Setting[]
    ExtraDatas:ExtraData[]
    
}