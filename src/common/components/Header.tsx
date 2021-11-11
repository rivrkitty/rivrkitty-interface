import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
import WalletButton from "./WalletButton";
import logo from "../../assets/logo.png";

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
    <div className={clsx(classes.container, props.className)}>
      <img className={classes.logo} src={logo} alt="RivrKitty" />
      {MENU_ITEMS.map((i) => (
        <Link className={classes.link} key={i.titleKey} href={i.path || "#"}>
          {t(i.titleKey)}
        </Link>
      ))}
      <Divider />
      <Box flex={1} />
      <WalletButton />
    </div>
  );
}
