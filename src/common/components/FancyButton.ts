import withStyles from "@mui/styles/withStyles";
import Button from "@mui/material/Button";

export default withStyles((theme) => ({
  root: {
    boxShadow: "none",
    borderRadius: 40,
    textTransform: "none",
    minWidth: 140,
    fontWeight: 600,
    fontSize: "0.8rem",
    color: "white",
    backgroundImage:
      "linear-gradient(90deg, rgba(234,132,120,1) 0%, rgba(95,176,180,1) 100%)",
    "&:hover": {
      opacity: 0.8,
    },
  },
}))(Button);
