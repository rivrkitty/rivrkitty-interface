import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import Avatar from '@mui/material/Avatar';
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import { useTranslation } from "react-i18next";

const MORE_MENU_ITEM = [
    { primaryText: 'Telegram', secondaryText:'Join Our Telegram Channel', icon:'TELEGRAM', redirectTo: "https://t.me/rivrkitty"},
    { primaryText: 'Twitter', secondaryText: 'Follow us on Twitter', icon:'TWITTER', redirectTo: "https://twitter.com/rivrkitty"},
    { primaryText: 'Github', secondaryText: 'Check our code on Github', icon: '', redirectTo: "https://github.com/rivrkitty" },
    { primaryText: 'Documentation', secondaryText: 'New to RivrKitty? Check out our documentation', icon:'', redirectTo: "https://medium.com/@rivrkitty" },
  ];

export default function MenuList() {
    const { t } = useTranslation();


  return (
    <List sx={{ width: '100%', maxWidth: 378, bgcolor: 'background.paper' }}>
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
    ))
    }
    </List>
  );
}