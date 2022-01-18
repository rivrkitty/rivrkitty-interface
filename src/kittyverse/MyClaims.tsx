import { Box, Typography } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import clsx from "clsx";
type Props = {
  completed: number;
  total: number;
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
export default function MyClaims(props: Props) {
  const classes = useStyles();
  const { completed, total } = props;
  const calculatePercentage = (completed: number, total: number) => {
    return { width: `${(100 * completed) / total}%` };
  };
  return (
    <Box
      minHeight={654}
      bgcolor="#000"
      display="flex"
      justifyContent={"center"}
    >
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
      </Box>
    </Box>
  );
}
