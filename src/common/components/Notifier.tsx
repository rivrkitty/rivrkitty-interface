import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import { Store } from "../../utils/rootReducer";
import { removeSnackbar } from "../redux/snackbar";
import Button from "@mui/material/Button";
import { getNetworkTxUrl } from "../../web3/getNetworkData";

let displayed: (string | number)[] = [];

const Notifier = () => {
  const dispatch = useDispatch();
  const notifications = useSelector(
    (store: Store) => store.common.notifications || []
  );
  const networkId = useSelector((store: Store) => store.common.networkId);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const storeDisplayed = (id: string | number) => {
    displayed = [...displayed, id];
  };

  const removeDisplayed = (id: string | number) => {
    displayed = [...displayed.filter((key) => id !== key)];
  };

  React.useEffect(() => {
    notifications.forEach((notification) => {
      const { key, dismissed, message, options, hash } = notification;
      if (!key) {
        return;
      }
      if (dismissed) {
        // dismiss snackbar using notistack
        closeSnackbar(key);
        return;
      }

      // do nothing if snackbar is already displayed
      if (displayed.includes(key)) return;

      // display snackbar using notistack
      enqueueSnackbar(message, {
        key,
        ...options,
        onClose: (event, reason, myKey) => {
          if (options.onClose) {
            options.onClose(event, reason, myKey);
          }
        },
        onExited: (event, myKey) => {
          // remove this snackbar from redux store
          dispatch(removeSnackbar(myKey));
          removeDisplayed(myKey);
        },
        autoHideDuration: 3000,
        action: hash
          ? () => (
              <Button
                onClick={() =>
                  networkId &&
                  window.open(getNetworkTxUrl(networkId)(hash), "_blank")
                }
              >
                View
              </Button>
            )
          : null,
      });

      // keep track of snackbars that we've displayed
      storeDisplayed(key);
    });
  }, [notifications, closeSnackbar, enqueueSnackbar, dispatch, networkId]);

  return null;
};

export default Notifier;
