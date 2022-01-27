import { Box, Typography, Avatar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import KittyVerseRoundedButton from "../../common/components/KittyVerseRoundedButton/KittyVerseRoundedButton";
import SectionHeader from "../../common/components/SectionHeader";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import { useNavigate } from "react-router-dom";

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
}));
export default function MyClaimsSuccess() {
  const classes = useStyles();
  let navigate = useNavigate();
  const handleMyPawtalsClick = () => {
    navigate("/kittyverse/mypawtals");
  };
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems={"center"}
      width="100%"
    >
      <SectionHeader title={"Pawtal Claim"} />
      <Typography
        variant="h5"
        fontWeight="700"
        sx={{ pt: 3, pb: 1, color: "#fff", textAlign: "center" }}
      >
        You have successfully claimed <br/><Typography
          variant="h5"
          fontWeight="700"
          sx={{ display: "inline", color: "#EEAB47", textAlign: "center" }}
        >2 GEN ONE EDITION</Typography> Pawtals
      </Typography>
      <Box sx={{ mt: "18px", mb: "32px" }}>
        <Avatar
          alt="unopenedImg"
          src={getSingleAssetSrc("UNOPENED").default}
          style={{
            width: "212px",
            height: "212px", 
            margin: "0 auto"
          }}
        />
      </Box>
      <Box >
        <KittyVerseRoundedButton
          name="Take me to My Pawtals"
          type="green"
          btnclass={""}
          onclick={handleMyPawtalsClick}
        />
      </Box>
    </Box>
  );
}
