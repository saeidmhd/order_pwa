export interface OrderDetail {
    OrderDetailId?: number;
    OrderDetailClientId: number;
    ItemType: number;
    OrderId: number;
    ProductDetailId: number;
    IncomeId: number;
    Price: number;
    Count1: number;
    Count2: number;
    PromotionCode: number;
    Gift: number;
    Description: string;
    Discount: number;
    DiscountType: number;
    TaxPercent: number;
    ChargePercent: number;
    StoreId: number;
    Width: number;
    Height: number;
    ItemCount: number;
    RowId: number;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
    OrderClientId: number;
    OrderCode: number;
    ProductDetailClientId: number;
    ProductDetailCode: number;
    SaveResponse?: SaveResponse; 
}
export interface OrderDetailsResponse {
    Result: boolean;
    Data: {
        Objects:OrderDetails
    };
}

export interface OrderDetails {
    OrderDetails: OrderDetail[];
    Results?: SaveResponse[]; // Added Results to Orders interface
}

export interface SaveResponse {
    Result: boolean;
    Index: number;
    EntityId: number;
    EntityClientId: number;
    RowVersion: number;
}
