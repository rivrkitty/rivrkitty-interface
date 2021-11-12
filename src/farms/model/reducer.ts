import { FarmType } from "../../../rivrkitty-common/farms/models";
import { RequestState } from "../../common/model/reducer";

export type FarmsState = {
  farms: { [networkId: string]: FarmType[] };
  requestState: RequestState;
};
