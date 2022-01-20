import React from "react";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import CssBaseline from "@mui/material/CssBaseline";
import {
  ThemeProvider,
  Theme,
  StyledEngineProvider,
} from "@mui/material/styles";
import theme from "./utils/theme";
import configureStore from "./utils/configureStore";
import { configureTranslation } from "./utils/i18n";
import "./App.css";
import AppContainer from "./common/components/AppContainer";
import Farm from "./farms/Farms";
import { SnackbarProvider } from "notistack";
import Kittyverse from "./kittyverse/Kittyverse";
declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

configureTranslation();

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <SnackbarProvider maxSnack={3}>
        <CssBaseline />
        <Helmet>
          <title>River Kitty</title>
        </Helmet>
        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <AppContainer>
              <Routes>
                <Route path="/" element={<Farm />} />
                <Route path="/kittyverse/*" element={<Kittyverse />} />
              </Routes>
            </AppContainer>
          </ThemeProvider>
        </StyledEngineProvider>
      </SnackbarProvider>
    </Provider>
  );
}

export default App;
