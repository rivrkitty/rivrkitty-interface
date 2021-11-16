import Web3 from "web3";

const updateDelay = 3000000;
const blockPeriod = 1000;

const cache: { [networkId: number]: { [cacheKey: string]: number } } = {};
const getBlockTime = async (web3: Web3) => {
  const networkId = await web3.eth.getChainId();
  const cacheKey = Math.floor(Date.now() / updateDelay);

  if (cache[networkId]?.hasOwnProperty(cacheKey)) {
    return cache[networkId][cacheKey];
  }

  const currentBlock = await web3.eth.getBlock("latest");
  const fromBlock = await web3.eth.getBlock(currentBlock.number - blockPeriod);

  const blockTimePromise =
    ((currentBlock.timestamp as number) - (fromBlock.timestamp as number)) /
    blockPeriod;

  cache[networkId] = {
    [cacheKey]: blockTimePromise,
  };
  return blockTimePromise;
};
export default getBlockTime;
