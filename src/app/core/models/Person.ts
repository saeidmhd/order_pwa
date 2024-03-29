export interface Person {
    PersonId: number;
    PersonClientId: number;
    PersonCode: number;
    PersonGroupId: number;
    PersonType: number;
    Prifix: string;
    FirstName: string;
    LastName: string;
    Organization: string;
    Gender: number;
    NationalCode: string;
    Credit: number;
    Balance: number;
    Email: string;
    UserName: string;
    Password: string;
    DiscountPercent: number;
    SellPriceLevel: number;
    State: string;
    City: string;
    CityCode: number;
    Zone: string;
    Address: string;
    Latitude: number;
    Longitude: number;
    Phone: string;
    Mobile: string;
    Fax: string;
    Description: string;
    FinanceTaxPayerType: string;
    EconomicNo: string;
    PostalCode: string;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
    PersonGroupClientId: number;
    PersonGroupCode: number;
  }

  export interface PeopleResponse {
    Result: boolean;
    Data: {
      Objects: {
        People: Person[];
      };
    };
  }