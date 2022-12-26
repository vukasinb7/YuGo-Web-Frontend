import {UserInfo} from "../../../shared/models/UserInfo";

export interface UsersInfoPaged {
  totalCount : number;
  results: UserInfo[];
}
