// import { IBazaraBank } from "./IBazaraData";
export interface SaveDataResponse {
    Result: boolean;
    Data: Data;
    Code?:number;
    Message?:string
}

export interface Result {
    Result: boolean;
    Index: number;
    EntityId: number;
    EntityClientId: number;
    RowVersion: number;
}

export interface Data {
    Objects: Objects;
}

export interface Objects {
    Banks: Results;
    Cashes: Results;
    Checklists: Results;
    Cheques: Results;
    ExtraDatas: Results;
    OrderDetails: Results;
    Orders: Results;
    PersonGroups: Results;
    People: Results;
    PersonAddresses: Results;
    Pictures: Results;
    ProductCategories: Results;
    ProductDetails: Results;
    Products: Results;
    Receipts: Results;
    Settings: Results;
    Transactions: Results;
    Visitors: Results;
    VisitorPeople: Results;
    VisitorProducts: Results;
    CostLevelNames: Results;
    NotRegisters: Results;
    Promotions: Results;
    PromotionDetails: Results;
    PromotionEntities: Results;
    ReturnReasons: Results;
    TransferAccounts: Results;
    TransferStores: Results;
    TransferStoreDetails: Results;
    VisitorLocations: Results;
    ProductProperties: Results;
    PropertyDescriptions: Results;
    Incomes: Results;
    IncomeGroups: Results;
    Projects: Results;
    Stores: Results;
    PhotoGalleries: Results;
    ProductDetailStoreAssets: Results;
    Missions: Results;
    MissionDetails: Results;
    Units: Results;
    Companies: Results;
}

export interface Results {
    Results: Result[];
}




