import React from "react";
import Grid from "@mui/material/Grid";
import { Button, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AmountTextField from "../../common/components/AmountTextField";
import BigNumber from "bignumber.js";
import { useFetchBalances } from "../redux/fetchBalances";
import { useFetchWithdraw } from "../redux/fetchWithdraw";
import { convertAmountToRawNumber, INPUT_FORMAT } from "../../utils/bignumber";
import { useFetchPoolInfo } from "../redux/fetchPoolInfo";
import { useFarms } from "../redux/fetchFarms";
import { FarmType } from "../model/reducer";
import { useSnackbar } from "notistack";

export default function Withdraw(props: { item: FarmType }) {
  const { item } = props;

  const { t } = useTranslation();

  const { farms } = useFarms();
  const { tokens, fetchBalances } = useFetchBalances();
  const { fetchWithdraw, fetchWithdrawPending } = useFetchWithdraw();
  const { infoTokenBalance, fetchPoolInfo } = useFetchPoolInfo();
  const { enqueueSnackbar } = useSnackbar();

  const [withdrawSettings, setWithdrawSettings] = React.useState({
    amount: new BigNumber(0),
    input: "0.0",
  });

  const handleInputChange = (amount: BigNumber, input: string) =>
    setWithdrawSettings((s) => ({
      ...s,
      input: amount.isEqualTo(input) ? input : amount.toFormat(INPUT_FORMAT),
      amount,
    }));

  const handleWithdrawAmount = () => {
    fetchWithdraw({
      amount: convertAmountToRawNumber(
        withdrawSettings.amount,
        item.tokenDecimals
      ),
      contractAddress: item.chefAddress,
      pid: item.poolId,
      tokenAddress: item.tokenAddress,
    })
      .then(() => {
        enqueueSnackbar(t("farmsWithdrawSuccess"), { variant: "success" });
        setWithdrawSettings((s) => ({
          ...s,
          amount: new BigNumber(0),
          input: "0.0",
        }));
        fetchBalances({ tokens });
        fetchPoolInfo({
          farms: farms || [],
          pid: item.poolId,
          chefAddress: item.chefAddress,
        });
      })
      .catch((error) =>
        enqueueSnackbar(t("farmsWithdrawError", { error }), {
          variant: "error",
        })
      );
  };

  const tokenBalance = infoTokenBalance(
    item.chefAddress,
    item.tokenAddress,
    item.poolId
  );

  const handleAmountClick = () => {
    setWithdrawSettings((s) => ({
      ...s,
      input: tokenBalance.toFormat(INPUT_FORMAT),
      amount: tokenBalance,
    }));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="caption">
          {t("farmsWithdrawBalance")}{" "}
          <Link sx={{ cursor: "pointer" }} onClick={handleAmountClick}>
            {tokenBalance.decimalPlaces(8, BigNumber.ROUND_DOWN).toFormat()}
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AmountTextField
          fullWidth
          value={withdrawSettings.input}
          maxValue={tokenBalance}
          decimals={18}
          disabled={fetchWithdrawPending[item.tokenAddress]}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          disabled={
            fetchWithdrawPending[item.tokenAddress] ||
            withdrawSettings.amount.isZero()
          }
          onClick={handleWithdrawAmount}
        >
          {fetchWithdrawPending[item.tokenAddress]
            ? `${t("farmsWithdrawing")}`
            : `${t("farmsWithdraw")}`}
        </Button>
      </Grid>
    </Grid>
  );
}
