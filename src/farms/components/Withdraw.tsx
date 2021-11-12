import React from "react";
import Grid from "@mui/material/Grid";
import { FarmType } from "../../../rivrkitty-common/farms/models";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AmountTextField from "../../common/components/AmountTextField";
import BigNumber from "bignumber.js";

export default function Withdraw(props: { item: FarmType }) {
  const { t } = useTranslation();
  const [withdrawSettings, setWithdrawSettings] = React.useState({
    amount: new BigNumber(0),
    maxValue: new BigNumber(10),
    input: "0.0",
    isNeedApproval: true,
  });

  const handleInputChange = (amount: BigNumber, input: string) =>
    setWithdrawSettings((s) => ({
      ...s,
      input: amount.isEqualTo(input) ? input : amount.toFormat(),
      amount,
    }));

  const handleWithdrawAmount = () => {};

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="caption">
          {t("farmsWithdrawBalance", { bal: 0, value: "$0" })}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AmountTextField
          fullWidth
          value={withdrawSettings.input}
          maxValue={withdrawSettings.maxValue}
          decimals={18}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={
            withdrawSettings.isNeedApproval ||
            // fetchDepositPending[pool.earnContractAddress] ||
            withdrawSettings.amount.isZero()
            // tokenBalance(depositSettings.token.symbol).isZero()
          }
          onClick={handleWithdrawAmount}
        >
          {t("farmsWithdraw")}
        </Button>
      </Grid>
    </Grid>
  );
}
