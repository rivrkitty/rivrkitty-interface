import React from "react";
import Grid from "@mui/material/Grid";
import { FarmType } from "../../../rivrkitty-common/farms/models";
import { Button, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AmountTextField from "../../common/components/AmountTextField";
import BigNumber from "bignumber.js";
import { useFetchBalances } from "../redux/fetchBalances";
import { useFetchWithdraw } from "../redux/fetchWithdraw";
import { convertAmountToRawNumber } from "../../utils/bignumber";
import { enqueueSnackbar } from "../../common/redux/snackbar";
import { useFetchUserInfo } from "../redux/fetchUserInfo";

export default function Withdraw(props: { item: FarmType }) {
  const { item } = props;

  const { t } = useTranslation();

  const { tokens, fetchBalances } = useFetchBalances();
  const { fetchWithdraw, fetchWithdrawPending } = useFetchWithdraw();
  const { infoTokenBalance, fetchUserInfo } = useFetchUserInfo();

  const [withdrawSettings, setWithdrawSettings] = React.useState({
    amount: new BigNumber(0),
    input: "0.0",
  });

  React.useEffect(() => {
    fetchUserInfo({
      pid: item.poolId,
      contractAddress: item.chefAddress,
      tokenAddress: item.tokenAddress,
    });
  }, [item.poolId, item.chefAddress, item.tokenAddress, fetchUserInfo]);

  const handleInputChange = (amount: BigNumber, input: string) =>
    setWithdrawSettings((s) => ({
      ...s,
      input: amount.isEqualTo(input) ? input : amount.toFormat(),
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
        fetchUserInfo({
          pid: item.poolId,
          contractAddress: item.chefAddress,
          tokenAddress: item.tokenAddress,
        });
      })
      .catch((error) =>
        enqueueSnackbar(t("farmsWithdrawError", { error }), {
          variant: "error",
        })
      );
  };

  const handleAmountClick = () => {
    const amount = infoTokenBalance(item.tokenAddress);
    setWithdrawSettings((s) => ({
      ...s,
      input: amount.toFormat(),
      amount,
    }));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="caption">
          {t("farmsWithdrawBalance")}{" "}
          <Link sx={{ cursor: "pointer" }} onClick={handleAmountClick}>
            {infoTokenBalance(item.tokenAddress)
              .decimalPlaces(8, BigNumber.ROUND_DOWN)
              .toFormat()}
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AmountTextField
          fullWidth
          value={withdrawSettings.input}
          maxValue={infoTokenBalance(item.tokenAddress)}
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
