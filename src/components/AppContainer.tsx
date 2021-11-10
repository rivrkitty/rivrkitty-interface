import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Header from "./Header";

const useStyles = makeStyles((theme) => ({
  container: {
    backgroundColor: theme.palette.background.default,
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    height: 84,
  },
  content: {
    flex: 1,
    overflowY: "scroll",
  },
}));

type Props = {
  children?: React.ElementType;
};

export default function AppContainer(props: Props) {
  const { children } = props;
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Header className={classes.header} />
      <Divider />
      <div className={classes.content}>{children}</div>
    </div>
  );
}
