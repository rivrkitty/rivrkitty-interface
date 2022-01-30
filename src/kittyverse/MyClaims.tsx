import { Box } from "@mui/material";
import MyClaimsLanding from "./Pages/MyClaimsLanding";
import MyClaimsSuccess from "./Pages/MyClaimsSuccess";
import { useState } from "react";
type Props = {
  completed: number;
  total: number;
};

export default function MyClaims(props: Props) {
  const { completed, total } = props;
  const [isApproveClicked, setIsApproveClicked] = useState(false);

  const handleClick = () => {
    setIsApproveClicked(true);
  };

  return (
    <Box
      minHeight={654}
      bgcolor="#000"
      display="flex"
      justifyContent={"center"}
    >
      {
      !isApproveClicked 
      ? (
        <MyClaimsLanding
          completed={completed}
          total={total}
          handleApproveClick={handleClick}
        />
      )
      : (<MyClaimsSuccess count={2} type={"GEN ONE EDITION"}/>)}
    </Box>
  );
}
