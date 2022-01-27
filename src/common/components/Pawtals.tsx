import { Typography } from "@mui/material";
import Box from "@mui/system/Box";
import { useTranslation } from "react-i18next";
import { makeStyles } from "@mui/styles";
import unopenedPawtel from "../../assets/unopened-logo.png";
import openedPawtel from "../../assets/opened-logo.png";
import clsx from "clsx";

// <Pawtals text={"unopened"} />
// <Pawtals text={"opened"} />

const useStyles = makeStyles({
  logoImg: {
    width: "152px",
    height: "152px",
  },
  headText: {
    fontSize: 24,
    fontWeight: 700,
    borderBottom: "1px solid #ffffff",
    marginBottom: "8px",
  },
  whiteText: {
    fontSize: 14,
    fontWeight: 700,
    lineHeight: "18.46px",
    marginBottom: 2,
  },
  mb40: {
    marginBottom: 40,
  },
  greenText: {
    fontSize: 14,
    color: "#60C0C2",
  },
  outerWrapper: {
    "&:hover": {
      "& $headText": {
        color: "#60C0C2",
      },
    },
    cursor: "pointer"
  },
});

export default function Pawtals(props: { text: string }) {
  const { text } = props;
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="center"
      width="100%"
      minHeight={200}
      bgcolor="#141B27"
      padding="20px"
      marginBottom="12px"
      className={classes.outerWrapper}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "100%",
          width: "20%",
          marginTop: "10px",
        }}
      >
        <img
          style={{ maxWidth: "100%" }}
          src={text == "unopened" ? unopenedPawtel : openedPawtel}
          className={classes.logoImg}
          alt="unopened pawtels"
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          height: "100%",
          width: "80%",
          color: "#ffffff",
        }}
      >
        <Typography variant="body1" className={classes.headText}>
          {" "}
          {text == "unopened" ? "UNOPENED PAWTAL 314" : "OPEN PAWTAL 314"}{" "}
        </Typography>

        <Typography variant="body1" className={classes.whiteText}>
          {" "}
          {"EDITION: GEN ONE"}{" "}
        </Typography>

        <Typography
          variant="body1"
          className={clsx(classes.whiteText, classes.mb40)}
        >
          {" "}
          {"HIGHEST BASE RARITY SCORE: XXX"}{" "}
        </Typography>

        <Typography variant="body1" className={classes.whiteText}>
          {" "}
          {"TOKEN"} {": "}
          <span className={classes.greenText}>
            {"xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"}
          </span>{" "}
        </Typography>

        <Typography variant="body1" className={classes.whiteText}>
          {" "}
          {"OWNER"} {": "}
          <span className={classes.greenText}>{"wallet address"}</span>{" "}
        </Typography>
      </Box>
    </Box>
  );
}
