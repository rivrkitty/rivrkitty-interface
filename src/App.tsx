import React from "react";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
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

declare module "@mui/styles/defaultTheme" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DefaultTheme extends Theme {}
}

configureTranslation();

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Helmet></Helmet>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <AppContainer>
            <Routes>
              <Route path="/" element={<Farm />} />
            </Routes>
          </AppContainer>
        </ThemeProvider>
      </StyledEngineProvider>
    </Provider>
  );
}

export default App;
