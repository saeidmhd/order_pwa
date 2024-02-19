// visitor-person.model.ts
export interface VisitorPerson {
    VisitorPersonId: number;
    PersonId: number;
    VisitorId: number;
    Deleted: boolean;
    DataHash: string;
    CreateDate: string;
    UpdateDate: string;
    CreateSyncId: number;
    UpdateSyncId: number;
    RowVersion: number;
    PersonClientId: number;
    PersonCode: number;
    VisitorClientId: number;
    VisitorCode: number;
  }

  export interface VisitorPersonResponse {
    Result: boolean;
    Data: {
      Objects: {
        VisitorPeople: VisitorPerson[];
      };
    };
  }
  