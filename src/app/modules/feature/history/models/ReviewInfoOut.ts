import {UserSimpleInfo} from "../../../shared/models/UserSimpleInfo";

export interface ReviewInfoOut{
  id:number;
  rating:number;
  comment:string;
  passenger:UserSimpleInfo;
  type:string;
}
