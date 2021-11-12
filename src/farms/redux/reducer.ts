import { builderHandler as getFarmsHandler } from "./getFarms";
import { reducerWithInitialState } from "typescript-fsa-reducers";
import { FarmsState } from "../model/reducer";
import { createRequestState } from "../../common";

const initialState: FarmsState = {
  farms: {},
  requestState: createRequestState(),
};

export default reducerWithInitialState(initialState).withHandling(
  getFarmsHandler
);
