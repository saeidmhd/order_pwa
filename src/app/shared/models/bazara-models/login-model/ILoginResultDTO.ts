export interface ILoginResult {
    Result: boolean,
    Data?: ILoginData,
    Code?: number; // Make the Code property optional
    Message: string;
}

export interface ILoginData {
    UserToken: string,
    SyncId: number,
    VisitorId: string,
    DatabaseId: number,
    UserTitle: string,
    ServerTime: string,
    MahakId: string,
    CreditDay: number
}