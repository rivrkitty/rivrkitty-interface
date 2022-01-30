import { Box, Typography, Avatar } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import KittyVerseRoundedButton from "../../common/components/KittyVerseRoundedButton/KittyVerseRoundedButton";
import SectionHeader from "../../common/components/SectionHeader";
import { getSingleAssetSrc } from "../../utils/getSingleAssetSrc";
import { useNavigate } from "react-router-dom";

interface MyClaimsSuccessProps {
  count: number;
  type: string;
}

const defaultProps = {
  count: 2,
  type: "GEN ONE EDITION"
} 

export default function MyClaimsSuccess(props: MyClaimsSuccessProps) {
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
      <SectionHeader title={"Pawtal Claim"}  claimAmount1={"000.00"} claimAmount2={"000,000,000,000"} />
      <Typography
        variant="h5"
        fontWeight="700"
        sx={{ pt: 3, pb: 1, color: "#fff", textAlign: "center" }}
      >
        You have successfully claimed <br/><Typography
          variant="h5"
          fontWeight="700"
          sx={{ display: "inline", color: "#EEAB47", textAlign: "center" }}
        >{props.count} {props.type}</Typography> Pawtals
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

MyClaimsSuccess.defaultProps = defaultProps;
