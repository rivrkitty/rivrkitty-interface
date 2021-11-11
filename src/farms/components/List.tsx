import React from "react";
import Paper from "@mui/material/Paper";
import { FarmType } from "../models";
import Farm from "./Farm";

const items: FarmType[] = [
  {
    id: "solar-rkitty-movr",
    poolId: 0,
    name: "RKITTY-MOVR",
    platform: "SOLAR",
    platformUrl: "https://app.solarbeam.io/exchange/swap",
    tokenName: "RKITTY-MOVR LP",
    tokenAddress: "0x0",
    tokenDecimals: 18,
    tokenAssets: ["RKITTY", "MOVR"],
    tokenAssetAddresses: ["0x0", "0x0"],
    buyTokenUrl: "https://app.solarbeam.io/exchange/swap",
    rewardTokens: ["RKITTY", "MOVR"],
    rewardTokensAddress: ["0x0", "0x0"],
  },
];

export default function List() {
  return (
    <Paper
      sx={{
        backgroundColor: "background.default",
        padding: 1,
      }}
    >
      {items.map((i) => (
        <Farm key={i.id} item={i} />
      ))}
    </Paper>
  );
}
