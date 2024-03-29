import React, { useState } from "react";
import MediaQuery from "react-responsive";
import makeStyles from "@mui/styles/makeStyles";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import WalletButton from "./WalletButton";
import RkittyPriceButton from "./HeaderComponents/RkittyPriceButton";
import MoreMenu from "./HeaderComponents/MoreMenu";
import MobileMenu from "./HeaderComponents/MobileMenu";
import logo from "../../assets/logo.png";
import { defaultContentPadding, defaultHeaderBg } from "../../utils/theme";
import { useLocation } from "react-router";

const MENU_ITEMS = [
  {
    titleKey: "menuFarms",
    path: "/",
  },
  {
    titleKey: "menuNFTs",
  },
];

const useStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: "10%",
    paddingRight: "10%",
  },
  link: {
    marginLeft: 8,
    marginRight: 8,
    color: "white",
  },
  logo: {
    height: 30,
    marginRight: 16,
  },
});

export default function Header(props: { className?: string }) {
  const classes = useStyles();

  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <Box
      className={props.className}
      sx={{
        display: "flex",
        flexDirection: "row",
        flexFlow: "row wrap",
        alignItems: "center",
        ...defaultHeaderBg,
        ...defaultContentPadding,
      }}
    >
      <Link href={"https://rivrkitty.com"}>
        <img className={classes.logo} src={logo} alt="RivrKitty" />
      </Link>
      <MediaQuery maxWidth={1023}>
        <WalletButton />
        <div
          style={{
            marginLeft: "auto",
          }}
        >
          <MobileMenu
            isOpen={isMobileMenuOpen}
            toggleMobileMenu={toggleMobileMenu}
          />
        </div>
      </MediaQuery>
      <MediaQuery minWidth={1024}>
        {MENU_ITEMS.map((i) => (
          <Link
            className={classes.link}
            key={i.titleKey}
            href={i.path || "#"}
            underline={location.pathname === i.path ? "always" : "hover"}
            sx={{
              fontWeight: location.pathname === i.path ? 800 : "inherit",
            }}
          >
            {t(i.titleKey)}
          </Link>
        ))}
        <Divider />
        <Box flex={1} />
        <RkittyPriceButton />
        <WalletButton />
        <MoreMenu />
      </MediaQuery>
    </Box>
  );
}
