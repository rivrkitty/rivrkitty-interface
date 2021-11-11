import { createTheme } from "@mui/material/styles";

export const defaultContentPadding = {
  paddingLeft: {
    xs: 2,
    md: "4%",
    xl: "8%",
  },
  paddingRight: {
    xs: 2,
    md: "4%",
    xl: "8%",
  },
};

export default createTheme({
  palette: {
    mode: "dark",
    secondary: {
      main: "rgba(255, 255, 255, 0.1)",
      contrastText: "white",
    },
    background: {
      default: "#0E141D",
      paper: "#141B27",
    },
  },
  shape: {
    borderRadius: 12,
  },
});
