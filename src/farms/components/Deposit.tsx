import React, { Dispatch, SetStateAction } from "react";
import Grid from "@mui/material/Grid";
import { Button, Link, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import AmountTextField from "../../common/components/AmountTextField";
import BigNumber from "bignumber.js";
import { useFetchBalances } from "../redux/fetchBalances";
import { FarmType, TokensMap } from "../model/reducer";
import { useFetchApproval } from "../redux/fetchApproval";
import { useSnackbar } from "notistack";
import { useFetchDeposit } from "../redux/fetchDeposit";
import {
  convertAmountToRawNumber,
  formatPrice,
  INPUT_FORMAT,
} from "../../utils/bignumber";
import { useFetchPoolInfo } from "../redux/fetchPoolInfo";
import { useFarms } from "../redux/fetchFarms";
import { useFetchPrices } from "../redux/fetchPrices";

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
  const { farms } = useFarms();
  const { tokens, tokenBalance, fetchBalances } = useFetchBalances();
  const { fetchApproval, fetchApprovalPending } = useFetchApproval();
  const { fetchDeposit, fetchDepositPending } = useFetchDeposit();
  const { fetchPoolInfo } = useFetchPoolInfo();
  const { enqueueSnackbar } = useSnackbar();
  const { prices } = useFetchPrices();

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
      input: amount.isEqualTo(input) ? input : amount.toFormat(INPUT_FORMAT),
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
        fetchPoolInfo({
          farms: farms || [],
          pid: item.poolId,
          chefAddress: item.chefAddress,
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
      input: amount.toFormat(INPUT_FORMAT),
      amount,
    }));
  };

  const bal = tokenBalance(item.tokenAddress);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <Typography variant="caption">
          {t("farmsDepositBalance")}
          <Link sx={{ cursor: "pointer" }} onClick={handleAmountClick}>
            {bal.decimalPlaces(4, BigNumber.ROUND_DOWN).toFormat()}{" "}
            {!bal.isZero() && (
              <>
                {" ("}
                {formatPrice(
                  new BigNumber(prices[item.tokenAddress] || 0).multipliedBy(
                    tokenBalance(item.tokenAddress)
                  ),
                  2,
                  true
                )}
                )
              </>
            )}
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
