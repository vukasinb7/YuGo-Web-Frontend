import {RideInfo} from "../../../shared/models/RideInfo";

export interface RidesPaged {
  totalCount : number;
  results: RideInfo[];
}
