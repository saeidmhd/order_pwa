export interface Promotion {
    PromotionId: number;
    PromotionClientId: number;
    PromotionCode: number;
    Visitors: string;
    Stores: string;
    OtherFields: string; // JSON string containing additional fields
    Deleted: boolean;
    DataHash: string;
    CreateDate: string; // ISO 8601 date string
    UpdateDate: string; // ISO 8601 date string
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
}
