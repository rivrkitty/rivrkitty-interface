import { Dispatch } from "redux";
import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { Contract } from "web3-eth-contract";
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

export const withdraw = async (props: Props) => {
  const { web3, contractAddress, pid, amount, address, dispatch } = props;
  const contract = new web3.eth.Contract(farmABI as AbiItem[], contractAddress);
  const data = await _withdraw({
    pid,
    contract,
    amount,
    address,
    dispatch,
  });
  return data;
};

const _withdraw = (props: {
  pid: number;
  contract: Contract;
  amount: string;
  address: string;
  dispatch: Dispatch;
}) => {
  const { pid, contract, amount, address, dispatch } = props;

  return new Promise<void>((resolve, reject) => {
    contract.methods
      .withdraw(pid, amount)
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
