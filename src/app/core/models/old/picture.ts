export interface Picture {
    PictureId: number;
    PictureClientId: number;
    PictureCode: number;
    ItemId: number;
    ItemType: number;
    FileName: string;
    DisplayOrder: number;
    Title: string;
    Url: string;
    FileSize: number;
    Width: number;
    Height: number;
    Format: string;
    PictureHash: string;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
  }

  export interface PictureResponse {
    Result: boolean;
    Data: {
      Objects: {
        Pictures: Picture[];
      };
    };
  }
  