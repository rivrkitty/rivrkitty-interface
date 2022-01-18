import { Box, Typography, Avatar } from "@mui/material";
import KittyVerseRoundedButton from "../common/components/KittyVerseRoundedButton/KittyVerseRoundedButton";
import makeStyles from "@mui/styles/makeStyles";
import { getSingleAssetSrc } from "../utils/getSingleAssetSrc";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  claimbtnstyle: {
    width: "196px",
    marginRight: "12px",
  },
  learnmorebtnstyle: {
    width: "174px",
    marginRight: "8px",
  },
}));
export default function KittyVerseHome() {
  const classes = useStyles();
  let navigate = useNavigate();
  const handleClaimClick = () => {
    navigate("/kittyverse/myclaims");
  };
  const handleClick = () => {
    window.open("https://github.com/rivrkitty");
  };
  return (
    <Box
      minHeight={654}
      bgcolor="#000"
      display="flex"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Box>
        <Avatar
          alt="socialmediaImg"
          src={getSingleAssetSrc("KITTYHOMEIMG").default}
          style={{
            width: "212px",
            height: "212px",
            marginRight: "24px",
          }}
        />
      </Box>
      <Box>
        <Typography
          variant="h5"
          fontWeight="700"
          sx={{ pt: 1, color: "#fff" }}
          letterSpacing={"4px"}
        >
          Enter the KittyVerse...
        </Typography>
        <Typography
          variant="body1"
          fontWeight="400"
          sx={{ pt: 1, pb: 2, color: "#fff" }}
        >
          Each RivrKitty is DeFi powered and also a Kitty-Droid
        </Typography>
        <KittyVerseRoundedButton
          name="Claim a Pawtal"
          type="green"
          btnclass={classes.claimbtnstyle}
          onclick={handleClaimClick}
        />
        <KittyVerseRoundedButton
          name="Learn More"
          type="green"
          btnclass={classes.learnmorebtnstyle}
          onclick={handleClick}
        />
      </Box>
    </Box>
  );
}
