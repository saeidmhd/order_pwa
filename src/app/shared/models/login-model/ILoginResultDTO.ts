export interface ILoginResult {
    Result: boolean,
    Data: ILoginData
}

export interface ILoginData {
    UserToken: string,
    SyncId: number,
    VisitorId: number
    DatabaseId: number,
    UserTitle: string,
    ServerTime: string,
    MahakId: string,
    CreditDay: number
}

export interface ILoginError {
    Result: boolean;
    Code?: number; // Make the Code property optional
    Message: string;
}