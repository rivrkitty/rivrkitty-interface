import clsx from "clsx";
import { Box, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
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
}));
export default function MyClaimsLanding(props: Props) {
  const classes = useStyles();
  const { completed, total, handleApproveClick } = props;

  const calculatePercentage = (completed: number, total: number) => {
    return { width: `${(100 * completed) / total}%` };
  };

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
      <KittyVerseRoundedButton
        name="Approve Spend $PAWS"
        type="yellow"
        btnclass={""}
        onclick={handleApproveClick}
      />
    </Box>
  );
}
