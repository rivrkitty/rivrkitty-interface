import React from "react";
import { Provider } from "react-redux";
import { Helmet } from "react-helmet";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./utils/theme";
import configureStore from "./utils/configureStore";
import { configureTranslation } from "./utils/i18n";
import "./App.css";
import AppContainer from "./components/AppContainer";

configureTranslation();

const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Helmet></Helmet>
      <ThemeProvider theme={theme}>
        <AppContainer></AppContainer>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
