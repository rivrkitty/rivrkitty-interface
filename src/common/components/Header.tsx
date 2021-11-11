import React from "react";
import makeStyles from "@mui/styles/makeStyles";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import WalletButton from "./WalletButton";
import logo from "../../assets/logo.png";
import { defaultContentPadding } from "../../utils/theme";

const MENU_ITEMS = [
  {
    titleKey: "menuFarms",
    path: "/",
  },
  {
    titleKey: "menuNFTs",
  },
  {
    titleKey: "menuDocumentation",
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
  },
  logo: {
    height: 30,
    marginRight: 16,
  },
});

export default function Header(props: { className?: string }) {
  const classes = useStyles();

  const { t } = useTranslation();

  return (
    <Box
      className={props.className}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "secondary.main",
        ...defaultContentPadding,
      }}
    >
      <img className={classes.logo} src={logo} alt="RivrKitty" />
      {MENU_ITEMS.map((i) => (
        <Link
          className={classes.link}
          key={i.titleKey}
          href={i.path || "#"}
          underline="hover"
        >
          {t(i.titleKey)}
        </Link>
      ))}
      <Divider />
      <Box flex={1} />
      <WalletButton />
    </Box>
  );
}
