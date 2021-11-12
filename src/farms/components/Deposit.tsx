import React from "react";
import Grid from "@mui/material/Grid";
import { FarmType } from "../models";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AmountTextField from "../../common/components/AmountTextField";
import BigNumber from "bignumber.js";

export default function Deposit(props: { item: FarmType }) {
  const { t } = useTranslation();
  const [depositSettings, setDepositSettings] = React.useState({
    amount: new BigNumber(0),
    maxValue: new BigNumber(10),
    input: "0.0",
    isNeedApproval: true,
  });

  const handleInputChange = (amount: BigNumber, input: string) =>
    setDepositSettings((s) => ({
      ...s,
      input: amount.isEqualTo(input) ? input : amount.toFormat(),
      amount,
    }));

  const handleApproval = () =>
    setDepositSettings((s) => ({ ...s, isNeedApproval: false }));

  const handleDepositAmount = () => {};

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="caption">
          {t("farmsDepositBalance", { bal: 0, value: "$0" })}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AmountTextField
          fullWidth
          value={depositSettings.input}
          decimals={18}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        {depositSettings.isNeedApproval ? (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleApproval}
            // disabled={
            //   fetchApprovalPending[depositSettings.token.symbol]
            // }
          >
            {/* {fetchApprovalPending[depositSettings.token.symbol]
            ? `${t("Vault-Approving")}`
            : `${t("Vault-ApproveButton")}`} */}
            {t("farmsApprove")}
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              // fetchDepositPending[pool.earnContractAddress] ||
              depositSettings.amount.isZero()
              // tokenBalance(depositSettings.token.symbol).isZero()
            }
            onClick={handleDepositAmount}
          >
            {t("farmsDeposit")}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
