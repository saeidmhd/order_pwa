export interface Bank {
    BankId: number;
    BankClientId: number;
    BankCode: number;
    Name: string;
    BankName: string;
    Branch: string | null;
    AccountNumber: string | null;
    CardNumber: string | null;
    Shaba: string | null;
    Description: string | null;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
}

export interface BanksResponse {
    Result: boolean;
    Data: {
        Objects: {
            Banks: Bank[];
        };
    };
}
