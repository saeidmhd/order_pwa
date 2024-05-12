import { Person } from "../models/Person"
import { PersonAddress } from "../models/PersonAddress"
import { PhotoGallery } from "../models/PhotoGallery"
import { Picture } from "../models/Picture"
import { Product } from "../models/Product"
import { ProductDetail } from "../models/ProductDetail"
import { ProductDetailStoreAsset } from "../models/ProductDetailAssetStore"
import { VisitorProduct } from "../models/VisitorProduct"

export interface ApiResult {
    Data: Object,
    Result: boolean
}

export interface Object {
    Objects: BazaraData
}

export interface BazaraData {
    PersonAddresses: PersonAddress[],
    People: Person[],
    Products: Product[],
    ProductDetails: ProductDetail[],
    VisitorProducts: VisitorProduct[],
    PhotoGalleries: PhotoGallery[],
    Pictures: Picture[],
    ProductDetailStoreAssets: ProductDetailStoreAsset[]
}