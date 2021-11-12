import React, { Dispatch, SetStateAction } from "react";
import Grid from "@mui/material/Grid";
import { FarmType } from "../../../rivrkitty-common/farms/models";
import { Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AmountTextField from "../../common/components/AmountTextField";
import BigNumber from "bignumber.js";
import { useFetchBalances } from "../redux/fetchBalances";
import { TokensMap } from "../model/reducer";
import { useFetchApproval } from "../redux/fetchApproval";
import { useSnackbar } from "notistack";
import { useFetchDeposit } from "../redux/fetchDeposit";
import { convertAmountToRawNumber } from "../../utils/bignumber";

function useMonitorAllowance(
  tokens: TokensMap,
  tokenAddress: string,
  chefAddress: string,
  setState: Dispatch<SetStateAction<any>>
) {
  const tokenAllowance = tokens[tokenAddress].allowance[chefAddress];
  React.useEffect(() => {
    const allowance = new BigNumber(tokenAllowance);
    setState((prevState: any) => ({
      ...prevState,
      isNeedApproval:
        allowance.isZero() || prevState.amount.isGreaterThan(allowance),
    }));
  }, [tokenAllowance]);
}

export default function Deposit(props: { item: FarmType }) {
  const { item } = props;

  const { t } = useTranslation();
  const { tokens, tokenBalance, fetchBalances } = useFetchBalances();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositPending } = useFetchDeposit();
  const { enqueueSnackbar } = useSnackbar();

  const [depositSettings, setDepositSettings] = React.useState({
    amount: new BigNumber(0),
    maxValue: new BigNumber(10),
    input: "0.0",
    isNeedApproval: new BigNumber(
      tokens[item.tokenAddress].allowance[item.chefAddress]
    ).isZero(),
  });

  useMonitorAllowance(
    tokens,
    item.tokenAddress,
    item.chefAddress,
    setDepositSettings
  );

  const handleInputChange = (amount: BigNumber, input: string) => {
    const allowance = new BigNumber(
      tokens[item.tokenAddress].allowance[item.chefAddress]
    );
    setDepositSettings((s) => ({
      ...s,
      input: amount.isEqualTo(input) ? input : amount.toFormat(),
      amount,
      isNeedApproval: allowance.isZero() || s.amount.isGreaterThan(allowance),
    }));
  };

  const handleApproval = () =>
    fetchApproval({
      tokenAddress: item.tokenAddress,
      contractAddress: item.chefAddress,
    })
      .then(() =>
        enqueueSnackbar(t("farmsApprovalSuccess"), { variant: "success" })
      )
      .catch((error) =>
        enqueueSnackbar(t("farmsApprovalError", { error }), {
          variant: "error",
        })
      );

  const handleDepositAmount = () => {
    fetchDeposit({
      amount: convertAmountToRawNumber(
        depositSettings.amount,
        item.tokenDecimals
      ),
      contractAddress: item.chefAddress,
      pid: item.poolId,
    })
      .then(() => {
        enqueueSnackbar(t("farmsDepositSuccess"), { variant: "success" });
        fetchBalances();
      })
      .catch((error) =>
        enqueueSnackbar(t("farmsDepositError", { error }), {
          variant: "error",
        })
      );
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="caption">
          {t("farmsDepositBalance", {
            bal: tokenBalance(item.tokenAddress)
              .decimalPlaces(8, BigNumber.ROUND_DOWN)
              .toFormat(),
          })}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AmountTextField
          fullWidth
          value={depositSettings.input}
          maxValue={tokenBalance(item.tokenAddress)}
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
            disabled={fetchApprovalPending[item.tokenAddress]}
          >
            {fetchApprovalPending[item.tokenAddress]
              ? `${t("farmsApproving")}`
              : `${t("farmsApprove")}`}
          </Button>
        ) : (
          <Button
            fullWidth
            variant="contained"
            color="primary"
            disabled={
              fetchDepositPending[item.chefAddress] ||
              depositSettings.amount.isZero() ||
              tokenBalance(item.tokenAddress).isZero()
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
