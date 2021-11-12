import { RequestState } from "./model/reducer";

export const createRequestState = (): RequestState => ({
  ongoing: false,
  error: null,
});
