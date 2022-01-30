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
  selected: {
    fontSize: 16,
    marginLeft: 15,
    color: "#60C0C2",
    fontWeight: 700
  }, 
});

export default function PawtalStatus(props: { text: string; count: number, selected: boolean, onSelect: (tab: string) => void }) {
  const { text, count, selected } = props;
  const classes = useStyles();
  const clickEnabled = count > 0;
  const onSelectHandler = () => {
    clickEnabled && props.onSelect(text);
  };
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
      className={clickEnabled ? classes.outWrapper : ""}
      onClick={onSelectHandler}
    >
      <img
        style={{ maxWidth: "100%" }}
        src={text === "unopened" ? UnOpenPaw : OpenPaw}
        alt="unopened pawtels"
        className={classes.statusLogoimg}
      />
      <span className={(clickEnabled && selected) ? classes.selected : classes.statusText}>
        {text === "unopened" ? "Unopened Pawtals" : "Opened Pawtals"} ({count})
      </span>
    </Box>
  );
}
