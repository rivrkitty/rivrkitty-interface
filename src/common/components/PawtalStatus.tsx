import Box from "@mui/system/Box";
import { makeStyles } from "@mui/styles";
import UnOpenPaw from "../../assets/unopen-paw-small.svg";
import OpenPaw from "../../assets/open-paw-small.svg";

const useStyles = makeStyles({
  statusLogoimg: {
    width: 40,
    height: 40,
  },
  statusText: {
    fontSize: 16,
    marginLeft: 15,
    color: "#ffffff",
    fontWeight: 700,
  },
  outWrapper: {
    "&:hover": {
      "& $statusText": {
        color: "#60C0C2",
      },
    },
  },
});

export default function PawtalStatus(props: { text: string; count: string }) {
  const { text } = props;
  const { count } = props;
  const classes = useStyles();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        height: "100%",
        cursor: "pointer",
        margin: "20px 0 20px 20px",
      }}
      className={classes.outWrapper}
    >
      <img
        style={{ maxWidth: "100%" }}
        src={text === "unopened" ? UnOpenPaw : OpenPaw}
        alt="unopened pawtels"
        className={classes.statusLogoimg}
      />
      <span className={classes.statusText}>
        {text === "unopened" ? "Unopened Pawtals" : "Opened Pawtals"} ({count})
      </span>
    </Box>
  );
}
