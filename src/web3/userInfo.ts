import Web3 from "web3";
import { AbiItem } from "web3-utils";
import { farmABI } from "./abi";

type Props = {
  web3: Web3;
  address: string;
  pid: number;
  contractAddress: string;
};

export async function userInfo(props: Props) {
  const { web3, contractAddress, pid, address } = props;
  const contract = new web3.eth.Contract(farmABI as AbiItem[], contractAddress);
  const result = await contract.methods
    .userInfo(pid, address)
    .call({ from: address });
  return result[0];
}
