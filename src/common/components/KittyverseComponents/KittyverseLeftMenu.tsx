import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";
import Box from "@mui/system/Box";
import { Typography } from "@mui/material";

import { Link } from "react-router-dom";

const DESKTOP_MENU_ITEM = [
  {
    primaryText: "menuMyPawtals",
    icon: "PAWTALS",
    redirectTo: "/kittyverse/mypawtals",
  },
  {
    primaryText: "menuRivrkitties",
    icon: "RIVRKITTIES",
    redirectTo: "/",
  },
  {
    primaryText: "menuInventory",
    icon: "INVENTORY",
    redirectTo: "/",
  },
  {
    primaryText: "menuKittymart",
    icon: "KITTYMART",
    redirectTo: "/",
  },
  {
    primaryText: "menuBlackMarket",
    icon: "BLACKMARKET",
    redirectTo: "/",
  },
];

const useStyles = makeStyles((theme) => ({
  container: {
    paddingLeft: "0px",
    "&:hover": {
      borderRadius: "10px",
    },
  },
  link: {
    textDecoration: "none",
  },
}));

export default function KittyverseLeftMenu() {
  const { t } = useTranslation();
  const classes = useStyles();
  const MORE_MENU_ITEM = DESKTOP_MENU_ITEM;

  return (
    <Box bgcolor="#2C2C40" color="#fff" borderRadius="10px">
      <Typography variant="h6" fontWeight="500" sx={{ pl: 3, pt: 1 }}>
        NFTs
      </Typography>

      <List sx={{ width: "100%" }}>
        {MORE_MENU_ITEM.map((eachData) => (
          <Link to={eachData.redirectTo} className={classes.link}>
            <ListItem sx={{ pt: 0, pb: 0 }}>
              <ListItemButton
                // component="a"
                // href={eachData.redirectTo}
                className={classes.container}
              >
                {eachData.icon && (
                  <Avatar
                    alt="socialmediaImg"
                    src={getSingleAssetSrc(eachData.icon).default}
                    style={{
                      width: "35px",
                      height: "35px",
                      marginRight: "12px",
                    }}
                  />
                )}
                <ListItemText
                  primaryTypographyProps={{
                    sx: { fontWeight: "700 !important", color: "#fff" },
                  }}
                  primary={t(eachData.primaryText)}
                />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </Box>
  );
}
