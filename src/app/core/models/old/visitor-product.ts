export interface VisitorProduct {
    VisitorProductId: number;
    ProductDetailId: number;
    VisitorId: number;
    Count1: number;
    Count2: number;
    Price: number;
    Serials: string | null;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
    ProductDetailClientId: number;
    ProductDetailCode: number;
    VisitorClientId: number;
    VisitorCode: number;
}

export interface VisitorProductsResponse {
    Result: boolean;
    Data: {
      Objects: {
        VisitorProducts: VisitorProduct[];
      };
    };
  }
