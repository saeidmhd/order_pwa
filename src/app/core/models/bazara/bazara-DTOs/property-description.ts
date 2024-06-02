export interface PropertyDescription {
    PropertyDescriptionId: number;
    PropertyDescriptionClientId: number;
    PropertyDescriptionCode: number;
    Name: string;
    Title: string;
    EmptyTitle: string;
    DataType: number;
    DisplayType: number;
    Description: string | null;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
}
