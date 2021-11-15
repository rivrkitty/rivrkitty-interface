import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import Farm from "./Farm";
import { useFarms } from "../redux/selectors";
import RetryButton from "../../common/components/RetryButton";
import Loader from "../../common/components/Loader";
import { useTranslation } from "react-i18next";
import Fetcher from "./Fetcher";
import InfoMessage from "../../common/components/InfoMessage";

export default function List() {
  const { farms, requestState, fetchFarms } = useFarms();

  const { t } = useTranslation();

  return (
    <Paper
      sx={{
        backgroundColor: "background.default",
        padding: 1,
      }}
    >
      <Fetcher />
      <Grid container spacing={2}>
        {farms ? (
          farms.length > 0 ? (
            farms.map((i) => (
              <Grid key={i.id} item>
                <Farm item={i} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12} justifyContent="center">
              <InfoMessage text={t("farmsEmptyList")} />
            </Grid>
          )
        ) : requestState.error ? (
          <Grid item xs={12} justifyContent="center">
            <RetryButton onRetry={fetchFarms} />
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
