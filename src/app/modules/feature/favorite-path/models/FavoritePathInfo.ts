import {Path} from "../../../shared/models/Path";
import {UserSimpleInfo} from "../../../shared/models/UserSimpleInfo";

export interface FavoritePathInfo{
  favoriteName:string;
  locations: Path[];
  passengers: UserSimpleInfo[];
  vehicleType:string;
  babyTransport:boolean;
  petTransport:boolean;
  id:number;
}
