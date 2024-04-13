export interface ProductCategory {
    selectedCategories: number[];
    ProductCategoryId: number;
    ProductCategoryClientId: number;
    ProductCategoryCode: number;
    Name: string;
    Color: string;
    Icon: string | null;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
}

export interface ProductCategoriesResponse {
    Result: boolean;
    Data: {
        Objects: {
            ProductCategories: ProductCategory[];
        };
    };
}
