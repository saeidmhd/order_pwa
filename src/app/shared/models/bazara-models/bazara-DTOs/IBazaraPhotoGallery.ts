export interface IBazaraPhotoGallery {
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
    VisitorId: number
}