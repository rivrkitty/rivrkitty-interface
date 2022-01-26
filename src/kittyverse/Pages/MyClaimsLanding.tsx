import clsx from "clsx";
import { useState } from 'react';
import { Box, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import leftArrow from "../../assets/left-arrow.svg";
import rightArrow from "../../assets/right-arrow.svg";
import unopenedPawtel from "../../assets/unopened-logo.png";
import KittyVerseRoundedButton from "../../common/components/KittyVerseRoundedButton/KittyVerseRoundedButton";
type Props = {
  completed: number;
  total: number;
  handleApproveClick: () => void;
};

const useStyles = makeStyles(() => ({
  container: {
    backgroundColor: "#EA8478",
    height: "12px",
    margin: "8px",
  },
  skill: {
    color: "white",
    backgroundColor: "#60C0C2",
    textAlign: "right",
    fontSize: "20px",
    height: "12px",
  },
  pawtalClaimImg: {
    width: "193px",
    height: "193px",
    marginBottom: 20,
  },
  pawtalClaimArw: {
    height: 20,
    position: 'relative',
    top: 7,
    cursor: 'pointer',
  },
  claimNum:{
    color: '#fff',
    display: 'inline-block',
    textAlign: 'center',
    width: '146px',
    border: '1.5px solid #60C0C2',
    borderRadius: '20px',
    margin: '0 20px',
    position: 'relative',
    top: '2px',
  },
}));
export default function MyClaimsLanding(props: Props) {
  const classes = useStyles();
  const { completed, total, handleApproveClick } = props;

  const calculatePercentage = (completed: number, total: number) => {
    return { width: `${(100 * completed) / total}%` };
  };

  const [counter, setCounter] = useState(0);
  const incrementCounter = () => setCounter(counter + 1);
  let decrementCounter = () => setCounter(counter - 1);
  if(counter<=1) {
    decrementCounter = () => setCounter(0);
  }

  return (
    <Box>
      <Typography
        variant="h5"
        fontWeight="700"
        sx={{ pt: 3, pb: 1, color: "#fff", textAlign: "center" }}
        letterSpacing={"4px"}
      >
        PAWTAL CLAIMS
      </Typography>
      <Box width="400px" border="1px solid #EA8478">
        <div className={classes.container}>
          <div
            className={clsx(classes.skill)}
            style={calculatePercentage(completed, total)}
          ></div>
        </div>
      </Box>
      <Typography
        variant="body1"
        fontWeight="700"
        sx={{ pt: 2, pb: 1, color: "#fff", textAlign: "center" }}
      >
        Globally {completed}/{total} Pawtals Claimed
      </Typography>
      <Box
      minHeight={654}
      bgcolor="#000"
      display="flex"
      flexDirection = "column"
      alignItems="center"
      justifyContent="flex-start"
    >
      <Box
        display="flex"
        flexDirection = "column"
        alignItems="center"
        justifyContent={"center"}
      >
        <img
          style={{ maxWidth: "100%" }}
          src= {unopenedPawtel}
          className={classes.pawtalClaimImg}
          alt="unopened pawtels"
        />
        <Box>
          <Typography
            variant="h5"
            fontWeight="700"
            marginBottom = "20px"
            sx={{ color: "#fff" }}
            letterSpacing={"4px"}
          >
            GEN ONE EDITION
          </Typography>
        </Box>

        <Box marginBottom = "25px">
          
        <img
          style={{ maxWidth: "100%" }}
          src= {leftArrow}
          className={classes.pawtalClaimArw}
          alt="unopened pawtels"
          onClick={decrementCounter}
        />

          <span className = {classes.claimNum}>{counter}</span>

        <img
          style={{ maxWidth: "100%" }}
          src= {rightArrow}
          className={classes.pawtalClaimArw}
          alt="unopened pawtels"
          onClick={incrementCounter}
        />
        </Box>
        <Box border = "1.5px dashed #FFFFFF"
          textAlign = "center"
          padding = "10px 20px 0 20px"
          borderRadius = "10px"
          marginBottom = "20px"
        >

        <Typography
            variant="body1"
            fontWeight="bold"
            marginBottom = "5px"
            lineHeight = "18.46px"
            fontSize = "14px"
            sx={{ color: "#fff" }}
          >
            PRICE
          </Typography>

          <Typography
            variant="body1"
            fontWeight="bold"
            fontSize = "14px"
            lineHeight = "18.46px"
            marginBottom = "20px"
            sx={{ color: "#EEAB47" }}
          >
            4 $PAWS PER PAWTAL
          </Typography>
        </Box>
        <Box 
        marginBottom = "20px">

      <KittyVerseRoundedButton
        name="Approve Spend $PAWS"
        type="yellow"
        btnclass={""}
        onclick={handleApproveClick}
      />
        </Box>
        <Box>
        <Typography
            variant="body1"
            fontWeight="bold"
            marginBottom = "5px"
            lineHeight = "18.46px"
            fontSize = "16px"
            sx={{ color: "#fff" }}
          >
            {counter} Pawtals will be claimed
          </Typography>
        </Box>

      </Box>
    </Box>
    </Box>
  );
}
