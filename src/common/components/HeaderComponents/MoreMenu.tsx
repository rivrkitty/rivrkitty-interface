import React from "react";
import Avatar from "@mui/material/Avatar";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import Popover from "@mui/material/Popover";
import Button from "@mui/material/Button";
import MenuList from "./MenuList";


export default function MoreMenu() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const [open, setOpen] = React.useState(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Button
        variant="text"
        onMouseOver={handleClick}
        sx={{ mr: 1, ml: 1, pr: 0 }}
      >
        <>
          <Avatar
            alt="rkittyImg"
            src={getSingleAssetSrc("3DOTS").default}
            style={{
              width: "24px",
              height: "24px",
              marginRight: "8px",
            }}
          />
        </>
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        style={{ top: "16px" }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div onMouseLeave={handleClose}>
          <MenuList isMobile={false} />
        </div>
      </Popover>
    </>
  );
}
