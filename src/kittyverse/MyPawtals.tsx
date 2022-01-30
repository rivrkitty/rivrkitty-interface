import { Box, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import SectionHeader from "../common/components/SectionHeader";
import PawtalStatus from "../common/components/PawtalStatus";
import Pawtals from "../common/components/Pawtals";
import UnOpenPaw from "../assets/unopen-paw-small.svg";
import KittyVerseRoundedButton from "../common/components/KittyVerseRoundedButton/KittyVerseRoundedButton";

const useStyles = makeStyles(() => ({
  claimPawtal: {
    width: "240px",
    borderRadius: "22px",
  },
  statusLogoimg: {
    width: 40,
    height: 40,
    maxWidth: "100%",
    marginRight: 14,
  },
}));

export default function MyPawtals() {
  const classes = useStyles();
  const hasPawtals = false; // make true to render unopened pawtal cards
  return (
    <Box
      display="flex"
      flexDirection="column"
      width="100%"
      padding="10px 2px 10px 20px"
    >
      <SectionHeader title={"My Pawtals"} claimAmount1={"000.00"} claimAmount2={"000,000,000,000"}  />
      <Box
        bgcolor="#000"
        display="flex"
        flexDirection="column"
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="flex-start"
          width="100%"
        >
          <PawtalStatus text={"unopened"} count={"3"} />
          <PawtalStatus text={"opened"} count={"2"} />
        </Box>

        <Box
          bgcolor="#000"
          display="flex"
          alignItems={"center"}
          paddingX="20px"
          width="100%"
          style={{
            ... hasPawtals ? { flexDirection: "column" } : { minHeight: "580px"}
          }}
        >
          {
          hasPawtals 
            ? (<Box width="100%">
              <Pawtals text={"unopened"}/>
              <Pawtals text={"unopened"}/>
            </Box>)
            : (
            <Box margin="0 auto">
              <Typography
                variant="h5"
                fontWeight="700"
                sx={{ pl: 3, pt: 1, color: "#fff" }}
                letterSpacing={"4px"}
              >
                You don’t have any Pawtals
              </Typography>
              <Box
                display="flex"
                flexDirection="row"
                marginTop="24px"
                justifyContent={"center"}
              >
                <img
                  src={UnOpenPaw}
                  alt="unopened pawtels"
                  className={classes.statusLogoimg}
                />
                <KittyVerseRoundedButton
                  name="Claim a Pawtal"
                  type="green"
                  btnclass={classes.claimPawtal}
                  onclick={() => {}}
                />
              </Box>
            </Box>)
          }
        </Box>
      </Box>
    </Box>
  );
}
