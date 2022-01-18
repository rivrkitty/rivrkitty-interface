import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { getSingleAssetSrc } from "../../../utils/getSingleAssetSrc";
import { Box } from "@mui/material";
import { Typography, Avatar } from "@mui/material";
import { useTranslation } from "react-i18next";

type Props = {
  imgsrcName: string;
  rarityScore: string;
  allianceScore: number;
  charisma: string;
  strength: string;
  energy: string;
  intelligence: string;
  defence: string;
  technology: string;
  name: string;
  role: string;
  amount: string;
};
// sample NFT Card
{
  /* <NFTCard
imgsrcName="SAMPLEIMG"
rarityScore="299 (323)"
allianceScore={50}
charisma = "xx"
strength = "xy"
energy = "xz"
intelligence = "xx"
defence = "xy"
technology ="xz"
name = "ONE EYED JOE"
role ="TASKMASTER"
amount = "25,000,000"
/> */
}

export default function NFTCard(props: Props) {
  const {
    imgsrcName,
    rarityScore,
    allianceScore,
    charisma,
    strength,
    energy,
    intelligence,
    defence,
    technology,
    name,
    role,
    amount,
  } = props;
  const { t } = useTranslation();

  const renderScore = () => {
    return (
      <Box display="flex" width="100px">
        <Box>
          <Typography
            variant="body2"
            fontWeight="700"
            fontSize="12px"
            marginBottom={1}
          >
            {t("cardRarityScore")}
          </Typography>
          <Typography variant="body2" fontWeight="700" fontSize="12px">
            {t("cardAllianceScore")}
          </Typography>
        </Box>
        <Box>
          <Typography
            variant="body2"
            fontWeight="700"
            fontSize="12px"
            marginBottom={1}
          >
            {rarityScore}
          </Typography>
          <Typography variant="body2" fontWeight="700" fontSize="12px">
            {allianceScore}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderMiddleDetails = () => {
    return (
      <Box>
        <Box display="flex" marginBottom={1}>
          <Avatar
            alt="socialmediaImg"
            src={getSingleAssetSrc("CHARISMA").default}
            style={{
              width: "20px",
              height: "18px",
              marginRight: "8px",
            }}
          />
          <Typography variant="body2" fontWeight="700" fontSize="14px">
            {charisma}
          </Typography>
        </Box>
        <Box display="flex" marginBottom={1}>
          <Avatar
            alt="socialmediaImg"
            src={getSingleAssetSrc("STRENGTH").default}
            style={{
              width: "20px",
              height: "19px",
              marginRight: "8px",
            }}
          />
          <Typography variant="body2" fontWeight="700" fontSize="14px">
            {strength}
          </Typography>
        </Box>
        <Box display="flex">
          <Avatar
            alt="socialmediaImg"
            src={getSingleAssetSrc("ENERGY").default}
            style={{
              width: "20px",
              height: "23px",
              marginRight: "8px",
            }}
          />
          <Typography variant="body2" fontWeight="700" fontSize="14px">
            {energy}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderLastDetails = () => {
    return (
      <Box>
        <Box display="flex" marginBottom={1}>
          <Avatar
            alt="socialmediaImg"
            src={getSingleAssetSrc("INTELLIGENCE").default}
            style={{
              width: "21px",
              height: "20px",
              marginRight: "8px",
            }}
          />
          <Typography variant="body2" fontWeight="700" fontSize="14px">
            {intelligence}
          </Typography>
        </Box>
        <Box display="flex" marginBottom={1}>
          <Avatar
            alt="socialmediaImg"
            src={getSingleAssetSrc("DEFENCE").default}
            style={{
              width: "21px",
              height: "21px",
              marginRight: "8px",
            }}
          />
          <Typography variant="body2" fontWeight="700" fontSize="14px">
            {defence}
          </Typography>
        </Box>
        <Box display="flex">
          <Avatar
            alt="socialmediaImg"
            src={getSingleAssetSrc("TECHNOLOGY").default}
            style={{
              width: "21px",
              height: "20px",
              marginRight: "8px",
            }}
          />
          <Typography variant="body2" fontWeight="700" fontSize="14px">
            {technology}
          </Typography>
        </Box>
      </Box>
    );
  };

  return (
    <Card sx={{ maxWidth: 280, border: "2px solid #fff" }}>
      <CardMedia
        component="img"
        height="280"
        image={getSingleAssetSrc(`${imgsrcName}`).default}
        alt="Card Avatar"
      />
      <CardContent>
        <Box justifyContent="space-between" display="flex">
          <Box>
            <Typography variant="body1" fontWeight="700">
              {name}
            </Typography>
            <Typography variant="body2" fontWeight="700" color="#EEAB47">
              {role}
            </Typography>
            <Typography
              variant="body2"
              fontWeight="700"
              fontSize="12px"
              marginBottom={1}
            >
              {t("cardGenone")}
            </Typography>
          </Box>
          <Box sx={{ fontSize: "14px" }}>
            <Typography variant="body1" fontWeight="700">
              {amount}
            </Typography>
            <Typography variant="body2" fontWeight="700" align="right">
              {t("cardRkitty")}
            </Typography>
          </Box>
        </Box>
        <Box display="flex" justifyContent={"space-between"}>
          {renderScore()}
          {renderMiddleDetails()}
          {renderLastDetails()}
        </Box>
      </CardContent>
    </Card>
  );
}
