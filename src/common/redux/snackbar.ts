import { SnackbarNotification } from "../model/snackbar";
import { create } from "../../utils/reduxCreators";
import { ReducerBuilder } from "typescript-fsa-reducers";
import { CommonState } from "../model/reducer";

export const enqueueSnackbar = create<SnackbarNotification>("ENQUEUE_SNACKBAR");
export const closeSnackbar = create<number | string | null>("CLOSE_SNACKBAR");
export const removeSnackbar = create<number | string>("REMOVE_SNACKBAR");

export const builderHandler = (
  builder: ReducerBuilder<CommonState>
): ReducerBuilder<CommonState> =>
  builder
    .case(enqueueSnackbar, (state, notification) => {
      return {
        ...state,
        notifications: [
          ...state.notifications,
          {
            ...notification,
            key: notification.key || new Date().getTime() + Math.random(),
          },
        ],
      };
    })
    .case(removeSnackbar, (state, key) => ({
      ...state,
      notifications: state.notifications.filter(
        (notification) => notification.key !== key
      ),
    }))
    .case(closeSnackbar, (state, key) => ({
      ...state,
      notifications: state.notifications.map((notification) =>
        !key || notification.key === key
          ? { ...notification, dismissed: true }
          : { ...notification }
      ),
    }));
