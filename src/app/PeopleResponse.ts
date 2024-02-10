import { Person } from "./Person";

export interface PeopleResponse {
    Result: boolean;
    Data: {
      Objects: {
        People: Person[];
      };
    };
  }