import React from "react";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";
import configureStore from "./utils/configureStore";
import { configureTranslation } from "./utils/i18n";
import "./App.css";
import AppContainer from "./common/components/AppContainer";
import Farm from "./farm/Farm";

configureTranslation();

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Helmet></Helmet>
      <ThemeProvider theme={theme}>
        <AppContainer>
          <Routes>
            <Route path="/" element={<Farm />} />
          </Routes>
        </AppContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
