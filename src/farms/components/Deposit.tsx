import React, { Dispatch, SetStateAction } from "react";
import Grid from "@mui/material/Grid";
import { FarmType } from "../../../rivrkitty-common/farms/models";
import { Button, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AmountTextField from "../../common/components/AmountTextField";
import BigNumber from "bignumber.js";
import { useFetchBalances } from "../redux/fetchBalances";
import { TokensMap } from "../model/reducer";
import { useFetchApproval } from "../redux/fetchApproval";
import { useSnackbar } from "notistack";
import { useFetchDeposit } from "../redux/fetchDeposit";
import { convertAmountToRawNumber } from "../../utils/bignumber";
import { useFetchUserInfo } from "../redux/fetchUserInfo";

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
  }, [tokenAllowance, setState]);
}

const getNeedApproval = (
  tokens: TokensMap,
  item: FarmType,
  amount: BigNumber
) => {
  const allowanceAmount = tokens[item.tokenAddress].allowance[item.chefAddress];
  if (allowanceAmount === null) {
    return null;
  } else {
    const allowance = new BigNumber(allowanceAmount);
    return allowance.isZero() || amount.isGreaterThan(allowance);
  }
};

export default function Deposit(props: { item: FarmType }) {
  const { item } = props;

  const { t } = useTranslation();
  const { tokens, tokenBalance, fetchBalances } = useFetchBalances();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositPending } = useFetchDeposit();
  const { fetchUserInfo } = useFetchUserInfo();
  const { enqueueSnackbar } = useSnackbar();

  const [depositSettings, setDepositSettings] = React.useState({
    amount: new BigNumber(0),
    input: "0.0",
  });
  useMonitorAllowance(
    tokens,
    item.tokenAddress,
    item.chefAddress,
    setDepositSettings
  );

  const needApproval = getNeedApproval(tokens, item, depositSettings.amount);

  const handleInputChange = (amount: BigNumber, input: string) => {
    setDepositSettings((s) => ({
      ...s,
      input: amount.isEqualTo(input) ? input : amount.toFormat(),
      amount,
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
      tokenAddress: item.tokenAddress,
    })
      .then(() => {
        enqueueSnackbar(t("farmsDepositSuccess"), { variant: "success" });
        setDepositSettings((s) => ({
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
        enqueueSnackbar(t("farmsDepositError", { error }), {
          variant: "error",
        })
      );
  };

  const handleAmountClick = () => {
    const amount = tokenBalance(item.tokenAddress);
    setDepositSettings((s) => ({
      ...s,
      input: amount.toFormat(),
      amount,
    }));
  };

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="caption">
          {t("farmsDepositBalance")}
          <Link sx={{ cursor: "pointer" }} onClick={handleAmountClick}>
            {tokenBalance(item.tokenAddress)
              .decimalPlaces(8, BigNumber.ROUND_DOWN)
              .toFormat()}
          </Link>
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <AmountTextField
          fullWidth
          value={depositSettings.input}
          maxValue={tokenBalance(item.tokenAddress)}
          decimals={18}
          disabled={fetchDepositPending[item.tokenAddress]}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid item xs={12}>
        {needApproval ? (
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
              needApproval === null ||
              fetchDepositPending[item.tokenAddress] ||
              depositSettings.amount.isZero() ||
              tokenBalance(item.tokenAddress).isZero()
            }
            onClick={handleDepositAmount}
          >
            {fetchDepositPending[item.tokenAddress]
              ? t("farmsDepositing")
              : t("farmsDeposit")}
          </Button>
        )}
      </Grid>
    </Grid>
  );
}
