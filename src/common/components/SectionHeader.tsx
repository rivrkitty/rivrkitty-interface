import Box from "@mui/system/Box";
import { makeStyles } from "@mui/styles";
import headerArrow from "../../assets/header-arrow.svg";
import headerPaw from "../../assets/header-paw.svg";
import FreeriverLogo from "../../assets/Freeriver-Logo.svg";
import PriceTickerButton from "../components/HeaderComponents/PriceTickerButton";
import Avatar from "@mui/material/Avatar";

const useStyles = makeStyles({
  headerArrowImg: {
    height: 30,
    width: 30,
    marginTop: 5,
  },
  headerText: {
    fontSize: 26,
    fontWeight: 500,
    marginLeft: 17,
    color: "#ffffff",
  },
  outerWrapper: {
    background: "#FFFFFF0D",
  },
  button: {
    marginRight: "8px",
  },
});

export default function SectionHeader(props: { title: string }) {
  const { title } = props;
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      width="100%"
      padding="10px 2px 10px 20px"
      className={classes.outerWrapper}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          height: "100%",
        }}
      >
        <img
          style={{ maxWidth: "100%" }}
          src={headerArrow}
          className={classes.headerArrowImg}
          alt="unopened pawtels"
        />
        <span className={classes.headerText}>{title}</span>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
          height: "100%",
          color: "#ffffff",
        }}
      >
        <>
          <PriceTickerButton
            disableElevation
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            <>
              <Avatar
                alt="rkittyImg"
                src={headerPaw}
                style={{
                  width: "24px",
                  height: "24px",
                  marginRight: "30px",
                }}
              />
              <span>000.00</span>
            </>
          </PriceTickerButton>

          <PriceTickerButton
            disableElevation
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            <>
              <Avatar
                alt="rkittyImg"
                src={FreeriverLogo}
                style={{
                  width: "24px",
                  height: "24px",
                  marginRight: "30px",
                }}
              />
              <span>000,000,000,000</span>
            </>
          </PriceTickerButton>
        </>
      </Box>
    </Box>
  );
}
