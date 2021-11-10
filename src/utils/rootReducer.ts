import { combineReducers } from "redux";
import { CommonState } from "../common/model/reducer";
import commonReducer from "../common/redux/reducer";

export type Store = {
  common: CommonState;
};

const reducerMap = {
  common: commonReducer,
};

export default combineReducers(reducerMap);
