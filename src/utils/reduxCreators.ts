import { Action } from "redux";
import { ThunkAction, ThunkDispatch } from "redux-thunk";
import actionCreatorFactory from "typescript-fsa";
import { asyncFactory } from "typescript-fsa-redux-thunk";
import { Store } from "./rootReducer";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  Store,
  unknown,
  Action<string>
>;

export type AppThunkDispatch = ThunkDispatch<Store, unknown, Action<string>>;

export const create = actionCreatorFactory();

export const createAsync = asyncFactory<Store>(create);
