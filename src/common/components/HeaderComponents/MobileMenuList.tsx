import React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import { Link, ListItem, ListItemButton, ListItemText } from "@mui/material";

interface MENU_ITEM {
    "titleKey": string,
    "path"?: string
};

export default function MobileMenuList(props: {
    MENU_ITEMS: MENU_ITEM[],
    classes: {
        "link": string
    },
    t: any
}) {

    const { MENU_ITEMS, classes, t }  = props;

    const MORE_MENU_ITEM = [
        { primaryText: 'Telegram', secondaryText:'Join Our Telegram Channel', icon:'TELEGRAM', redirectTo: "https://t.me/rivrkitty"},
        { primaryText: 'Twitter', secondaryText: 'Follow us on Twitter', icon:'TWITTER', redirectTo: "https://twitter.com/rivrkitty"},
        { primaryText: 'Github', secondaryText: 'Check our code on Github', icon: '', redirectTo: "https://github.com/rivrkitty" },
        { primaryText: 'Documentation', secondaryText: 'New to RivrKitty? Check out our documentation', icon:'', redirectTo: "https://medium.com/@rivrkitty" },
    ];

    return (
        <div 
            className="mobile-menu-list"
            style={{
              flexBasis: "100%",
              display: "flex",
              flexDirection: "column",
            }}>
            {MENU_ITEMS.map((i) => (
              <Link
                className={classes.link}
                key={i.titleKey}
                href={i.path || "#"}
                underline="hover"
                style={{
                  flexBasis: "100%"
                }}
              >
                {t(i.titleKey)}
              </Link>
            ))}
            <>
            {MORE_MENU_ITEM.map((eachData)=>(
              <ListItem sx={{pt:0, pb:0}}>
              <ListItemButton 
              component="a" target="_blank" href={eachData.redirectTo}
              >
              <ListItemText primary={t(eachData.primaryText)} secondary={t(eachData.secondaryText)} />
              {eachData.icon &&
              <Avatar
                  alt="socialmediaImg"
                  src={getSingleAssetSrc(eachData.icon).default}
                  style={{
                    width: "35px",
                    height: "35px",
                    marginRight: "8px",
                  }}
                />}
                </ListItemButton>
              </ListItem>
            ))}
            </>
        </div>
    );
}