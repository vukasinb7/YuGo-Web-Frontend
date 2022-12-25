import {PathInfo} from "./PathInfo";
import {UserSimpleInfo} from "./UserSimpleInfo";
import {RejectionInfo} from "./RejectionInfo";


export interface RideInfo {
  id: number;
  locations: PathInfo[];
  startTime: Date;
  endTime: Date;
  totalCost: number;
  driver: UserSimpleInfo;
  passengers: UserSimpleInfo[];
  estimatedTimeInMinutes: number;
  vehicleType: string;
  babyTransport: boolean;
  petTransport: boolean;
  rejection: RejectionInfo;
  status: String;
}
