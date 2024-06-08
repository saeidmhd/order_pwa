export interface Setting {
    SettingId: number;
    SettingCode: number;
    SettingClientId: number;
    VisitorId: number | null;
    Value: string;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
    VisitorClientId: number;
    VisitorCode: number;
}
