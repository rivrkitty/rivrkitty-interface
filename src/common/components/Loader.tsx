import { CircularProgress, Typography } from "@mui/material";
import Box from "@mui/system/Box";
import { useTranslation } from "react-i18next";

export default function Loader(props: { text: string }) {
  const { text } = props;
  const { t } = useTranslation();
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight={200}
    >
      <Typography variant="body1">{text}</Typography>
      <CircularProgress sx={{ marginTop: 2 }} />;
    </Box>
  );
}
