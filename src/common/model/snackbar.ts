import { TransitionCloseHandler } from "notistack";

export type SnackbarNotification = {
  key?: number | string;
  message: string;
  options: {
    key?: number | string;
    variant: "success" | "error";
    onClose?: TransitionCloseHandler;
  };
  hash: string;
  dismissed?: boolean;
};
