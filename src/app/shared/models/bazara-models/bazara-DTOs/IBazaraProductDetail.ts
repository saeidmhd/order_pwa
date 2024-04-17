export interface IBazaraProductDetail {
    ProductDetailId: number;
    ProductDetailClientId: number;
    ProductDetailCode: number;
    ProductId: number;
    Properties: string | null;
    Count1: number;
    Count2: number;
    Barcode: string;
    Price1: number;
    Price2: number;
    Price3: number;
    Price4: number;
    Price5: number;
    Price6: number;
    Price7: number;
    Price8: number;
    Price9: number;
    Price10: number;
    Discount: number;
    Discount1: number;
    Discount2: number;
    Discount3: number;
    Discount4: number;
    DefaultDiscountLevel: number;
    DiscountType: number;
    DefaultSellPriceLevel: number;
    CustomerPrice: number;
    Serials: string | null;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
    ProductClientId: number;
    ProductCode: number;
    VisitorId: number,
    ProductName?: string
}