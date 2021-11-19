import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import Popover from "@mui/material/Popover";
import MenuList from "./MenuList";
interface MobileMenuProps {
    isOpen: boolean,
    toggleMobileMenu: () => void
}

export default function MobileMenu(props: MobileMenuProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
      );
    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        props.toggleMobileMenu();
        setAnchorEl(event.currentTarget);

    };

    const handleClose = () => {
        setAnchorEl(null);
      };

    return (
        <>
        <Button variant="text" onClick={handleClick}>
            <>
                <Avatar
                    alt="menu-icon"
                    src={getSingleAssetSrc( open ? "CLOSE" : "MENU").default}
                    style={{
                    width: open ? "32px" : "24px",
                    height: "24px",
                    }}
                />
            </>
        </Button>
        <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        sx={{ mt: 1 }}
        PaperProps={{
            style: { width: '100%' },
          }}
        style={{
            top: "16px",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <div>
          <MenuList isMobile= {true}/>
        </div>
      </Popover>
      </>
    );
}