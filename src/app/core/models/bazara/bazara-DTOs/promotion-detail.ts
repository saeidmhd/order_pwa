export interface PromotionDetail {
    PromotionDetailId: number;
    PromotionDetailClientId: number;
    PromotionDetailCode: number;
    PromotionId: number;
    OtherFields: string; // JSON string containing additional fields
    Deleted: boolean;
    DataHash: string;
    CreateDate: string; // ISO 8601 date string
    UpdateDate: string; // ISO 8601 date string
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
    PromotionClientId: number;
    PromotionCode: number;
}

