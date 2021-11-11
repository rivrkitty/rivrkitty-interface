import React, { ReactElement } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import clsx from "clsx";
import Header from "./Header";
import Background from "./Background/Background";

const useStyles = makeStyles((theme) => ({
  container: {
    position: "relative",
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  header: {
    height: 64,
  },
  content: {
    flex: 1,
    overflowY: "scroll",
  },
  overBackground: {
    zIndex: 1,
  },
}));

type Props = {
  children?: ReactElement;
};

export default function AppContainer(props: Props) {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Background
        className={clsx(classes.background, classes.overBackground)}
      />
      <Header className={clsx(classes.header, classes.overBackground)} />
      <Divider className={classes.overBackground} />
      <div className={clsx(classes.content, classes.overBackground)}>
        {children}
      </div>
    </div>
  );
}