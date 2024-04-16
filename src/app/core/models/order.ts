export interface SaveResponse {
    Result: boolean;
    Index: number;
    EntityId: number;
    EntityClientId: number;
    RowVersion: number;
}

export interface Order {
    OrderId?: number;
    OrderClientId: number;
    OrderCode?: number;
    PersonId: number;
    VisitorId: number;
    ReceiptId?: number;
    OrderType: number;
    OrderDate: string;
    DeliveryDate: string;
    Discount: number;
    DiscountType: number;
    SendCost: number;
    OtherCost: number;
    SettlementType: number;
    Immediate: boolean;
    ReturnReasonId: number;
    Description: string;
    ExpenseId: number;
    ProjectId: number;
    Latitude: number;
    Longitude: number;
    ShippingAddress: string;
    CarrierType: string;
    CarrierID: string;
    DriverCurrencyType: string;
    CarryingAsExpense: boolean;
    ReferenceOrderId: number;
    InvoiceTemplate?: string;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
    PersonClientId?: number;
    PersonCode: number;
    VisitorClientId: number;
    VisitorCode: number;
    ReceiptClientId: number;
    ReceiptCode: number;
    SaveResponse?: SaveResponse; // Added SaveResponse to Order interface
}

export interface Orders {
    Orders: Order[];
    Results?: SaveResponse[]; // Added Results to Orders interface
}

export interface OrdersResponse {
    Result: boolean;
    Data: {
        Objects: Orders;
    };
}
