import { createTheme } from "@material-ui/core/styles";

export const colors = {};

export default createTheme({
  palette: {
    type: "dark",
    secondary: {
      main: "rgba(255, 255, 255, 0.1)",
      contrastText: "white",
    },
  },
});
