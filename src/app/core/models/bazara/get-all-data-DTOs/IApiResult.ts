import { Bank } from "../bazara-DTOs/bank";
import { Person } from "../bazara-DTOs/Person";
import { PersonAddress } from "../bazara-DTOs/PersonAddress";
import { PhotoGallery } from "../bazara-DTOs/PhotoGallery";
import { Picture } from "../bazara-DTOs/picture";
import { Product } from "../bazara-DTOs/product";
import { IBazaraProductDetail } from "../bazara-DTOs/IBazaraProductDetail";
import { IBazaraProductDetailStoreAsset } from "../bazara-DTOs/IBazaraProductDetailAssetStore";
import { IBazaraVisitorPerson } from "../bazara-DTOs/IBazaraVisitorPerson";
import { IBazaraVisitorProduct } from "../bazara-DTOs/IBazaraVisitorProduct";
import { Mission } from "../bazara-DTOs/Mission";
import { MissionDetail } from "../bazara-DTOs/MissionDetail";
import { Order } from "../bazara-DTOs/order";
import { OrderDetail } from "../bazara-DTOs/order-detail";
import { ProductCategory } from "../bazara-DTOs/product-category";
import { PropertyDescription } from "../bazara-DTOs/property-description";
import { Setting } from "../bazara-DTOs/setting";

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
    VisitorPeople: IBazaraVisitorPerson[],
    Products: Product[],
    ProductDetails: IBazaraProductDetail[],
    VisitorProducts: IBazaraVisitorProduct[],
    PhotoGalleries: PhotoGallery[],
    Pictures: Picture[],
    ProductDetailStoreAssets: IBazaraProductDetailStoreAsset[],
    Missions: Mission[],
    MissionDetails: MissionDetail[],
    ProductCategories:ProductCategory[],
    Orders:Order[],
    OrderDetails:OrderDetail[],
    PropertyDescriptions:PropertyDescription[]
    Settings:Setting[]
    
}