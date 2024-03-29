export interface Product {
    ProductId: number;
    ProductClientId: number;
    ProductCode: number;
    ProductCategoryId: number;
    Name: string;
    UnitName: string;
    UnitName2: string;
    Tags: string;
    UnitRatio: number;
    Min: number;
    TaxPercent: number;
    ChargePercent: number;
    Width: number;
    Height: number;
    Length: number;
    Weight: number;
    Type: number;
    Description: string | null;
    ProductTIN: string | null;
    UnitTIN: string | null;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
    ProductCategoryClientId: number;
    ProductCategoryCode: number;
    price?: string;
    count1?: number;
    count2?: number;
    quantity: number;
  }
  
  export interface ProductsResponse {
    Result: boolean;
    Data: {
      Objects: {
        Products: Product[];
      };
    };
  }