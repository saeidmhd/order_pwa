export interface PhotoGallery {
    PhotoGalleryId: number;
    PictureId: number;
    EntityType: number;
    ItemCode: number;
    ItemType: number;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
  }

  export interface PhotoGalleryResponse {
    Result: boolean;
    Data: {
      Objects: {
        PhotoGalleries: PhotoGallery[];
      };
    };
  }
  