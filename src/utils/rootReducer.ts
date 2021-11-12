import { FarmsState } from "./../farms/model/reducer";
import { combineReducers } from "redux";
import { CommonState } from "../common/model/reducer";
import commonReducer from "../common/redux/reducer";
import farmsReducer from "../farms/redux/reducer";

export type Store = {
  common: CommonState;
  farms: FarmsState;
};

const reducerMap = {
  common: commonReducer,
  farms: farmsReducer,
};

export default combineReducers(reducerMap);
