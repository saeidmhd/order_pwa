export interface LoginModel {
  Result: boolean;
  Data: {
    UserToken: string;
    SyncId: number;
    VisitorId: number;
    DatabaseId: number;
    UserTitle: string;
    ServerTime: string;
    MahakId: string;
    CreditDay: number;
    HasRadara: boolean;
    WithDataTransfer: boolean;
  };
}

export interface LoginError {
  Result: boolean;
  Code?: number; // Make the Code property optional
  Message: string;
}
