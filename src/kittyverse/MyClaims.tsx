import { Box } from "@mui/material";
import MyClaimsLanding from "./Pages/MyClaimsLanding";
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
      {!isApproveClicked && (
        <MyClaimsLanding
          completed={completed}
          total={total}
          handleApproveClick={handleClick}
        />
      )}
    </Box>
  );
}
