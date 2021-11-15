import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import Avatar from "@mui/material/Avatar";
import { useTranslation } from "react-i18next";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import MenuList from './MenuList'
const useStyles = makeStyles({});


export default function MoreMenu() {
  const classes = useStyles();
  const { t } = useTranslation();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;


  return <>
    <Button 
    variant="text" 
    onClick={handleClick}
    sx={{mr:1, ml:1, pr:0}}
    >
        <>
          <Avatar
            alt="rkittyImg"
            src={getSingleAssetSrc('3DOTS').default}
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
        sx={{ mt: 1 }}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
      >
        <div ><MenuList/></div>
      </Popover>
  </>;
}
