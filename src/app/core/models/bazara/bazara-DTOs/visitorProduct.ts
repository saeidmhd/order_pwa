export interface VisitorProduct {
    VisitorProductId: number,
    Description: string,
    ProductDetailId: number,
    VisitorId: number,
    Count1: number,
    Count2: number,
    Price: number,
    Serials: string | null,
    Deleted: boolean
    RowVersion: number,
    ProductDetailClientId: number,
    ProductDetailCode: number
    VisitorClientId: number,
    VisitorCode: number,
    DataHash: string,
    CreateDate: string,
    UpdateDate: string,
    CreateSyncId: number,
    UpdateSyncId: number
}