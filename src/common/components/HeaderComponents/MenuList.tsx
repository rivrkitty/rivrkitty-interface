import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import Avatar from "@mui/material/Avatar";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import { useTranslation } from "react-i18next";
import makeStyles from "@mui/styles/makeStyles";

const DESKTOP_MENU_ITEM = [
  {
    primaryText: "menuTelegram",
    secondaryText: "menuTelegramSecondaryText",
    icon: "TELEGRAM",
    redirectTo: "https://t.me/rivrkitty",
  },
  {
    primaryText: "menuTwitter",
    secondaryText: "menuTwitterSecondaryText",
    icon: "TWITTER",
    redirectTo: "https://twitter.com/rivrkitty",
  },
  {
    primaryText: "menuGithub",
    secondaryText: "menuGithubSecondaryText",
    icon: "",
    redirectTo: "https://github.com/rivrkitty",
  },
  {
    primaryText: "menuDocumentation",
    secondaryText: "menuDocumentationSecondaryText",
    icon: "",
    redirectTo: "https://medium.com/@rivrkitty",
  },
];

const MOBILE_MENU_ITEM = [
  { primaryText: "menuFarms", secondaryText: "", icon: "", redirectTo: "" },
  { primaryText: "menuNFTs", secondaryText: "", icon: "", redirectTo: "" },
];

const useStyles = makeStyles((theme) => ({
  container: {
    "&:hover": {
      borderRadius: "10px",
    },
  },
}));

export default function MenuList(props: { isMobile: boolean }) {
  const { t } = useTranslation();
  const { isMobile } = props;
  const classes = useStyles();
  const MORE_MENU_ITEM = isMobile
    ? [...MOBILE_MENU_ITEM, ...DESKTOP_MENU_ITEM]
    : DESKTOP_MENU_ITEM;

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {MORE_MENU_ITEM.map((eachData) => (
        <ListItem sx={{ pt: 0, pb: 0 }}>
          <ListItemButton
            component="a"
            target="_blank"
            href={eachData.redirectTo}
            className={classes.container}
          >
            <ListItemText
              primary={t(eachData.primaryText)}
              secondary={!isMobile && t(eachData.secondaryText)}
              style={
                isMobile
                  ? {
                      flex: "0 1 auto",
                      minWidth: "82px",
                    }
                  : {}
              }
            />
            {eachData.icon && (
              <Avatar
                alt="socialmediaImg"
                src={getSingleAssetSrc(eachData.icon).default}
                style={{
                  width: isMobile ? "20px" : "35px",
                  height: isMobile ? "20px" : "35px",
                  marginRight: "8px",
                }}
              />
            )}
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );
}
