export interface LoginBody {
    userName: string,
    password: string
}

export interface LoginResult {
    Result: boolean,
    Data?: LoginData,
    Code?: number; // Make the Code property optional
    Message?: string;
}

export interface LoginData {
    UserToken: string,
    SyncId: number,
    VisitorId: number,
    DatabaseId: number,
    UserTitle: string,
    ServerTime: string,
    MahakId: string,
    CreditDay: number,
    HasRadara: boolean,
    WithDataTransfer: boolean
}