export interface ILoginResult {
    Result: boolean,
    Data?: ILoginData,
    Code?: number,
    Message?: string
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