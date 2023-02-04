import {Path} from "./Path";
import {UserSimpleInfo} from "./UserSimpleInfo";

export interface CreateFavoriteRideDTO{
  favoriteName:string;
  locations:Path[];
  passengers:UserSimpleInfo[];
  vehicleType:string;
  babyTransport:boolean;
  petTransport:boolean;
}
