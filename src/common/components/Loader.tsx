import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/system/Box";

export default function Loader(props: { text?: string; minHeight?: number }) {
  const { text, minHeight } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={minHeight || 200}
    >
      {text && <Typography variant="body1">{text}</Typography>}
      <CircularProgress sx={{ marginTop: 2 }} />
    </Box>
  );
}
