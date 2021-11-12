import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Farm from "./Farm";
import { useFarms } from "../redux/selectors";
import RetryButton from "../../common/components/RetryButton";
import Loader from "../../common/components/Loader";
import { useTranslation } from "react-i18next";

export default function List() {
  const { farms, requestState, getFarms } = useFarms();

  const { t } = useTranslation();

  React.useEffect(() => {
    getFarms();
  }, [getFarms]);

  return (
    <Paper
      sx={{
        backgroundColor: "background.default",
        padding: 1,
      }}
    >
      <Grid container spacing={2}>
        {farms ? (
          farms.map((i) => (
            <Grid key={i.id} item>
              <Farm item={i} />
            </Grid>
          ))
        ) : requestState.error ? (
          <Grid item xs={12} justifyContent="center">
            <RetryButton onRetry={getFarms} />
          </Grid>
        ) : (
          <Grid item xs={12} justifyContent="center" alignItems="center">
            <Loader text={t("farmsFetching")} />
          </Grid>
        )}
      </Grid>
    </Paper>
  );
}
