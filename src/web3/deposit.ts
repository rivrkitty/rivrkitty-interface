import { BigNumber } from "bignumber.js";
import { Dispatch } from "redux";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
import Web3 from "web3";
import { farmABI } from "./abi";
import { enqueueSnackbar } from "../common/redux/snackbar";

type Props = {
  web3: Web3;
  address: string;
  pid: number;
  amount: string;
  contractAddress: string;
  dispatch: Dispatch;
};

export const deposit = async (props: Props) => {
  const { web3, contractAddress, pid, amount, address, dispatch } = props;
  const contract = new web3.eth.Contract(farmABI as AbiItem[], contractAddress);
  const data = await _deposit({
    pid,
    contract,
    amount,
    address,
    dispatch,
  });
  return data;
};

const _deposit = (props: {
  pid: number;
  contract: Contract;
  amount: string;
  address: string;
  dispatch: Dispatch;
}) => {
  const { contract, pid, amount, address, dispatch } = props;
  return new Promise<void>((resolve, reject) => {
    contract.methods
      .deposit(pid, amount)
      .send({ from: address })
      .on("transactionHash", function (hash: string) {
        console.log(hash);
        dispatch(
          enqueueSnackbar({
            message: hash,
            options: {
              key: new Date().getTime() + Math.random(),
              variant: "success",
            },
            hash,
          })
        );
      })
      .on("receipt", function (receipt: string) {
        console.log(receipt);
        resolve();
      })
      .on("error", function (error: Error) {
        console.log(error);
        reject(error);
      })
      .catch((error: Error) => {
        console.log(error);
        reject(error);
      });
  });
};
