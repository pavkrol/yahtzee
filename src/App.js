import React from "react";
import { render } from "react-dom";
import GlobalStyle from "./layout/GlobalStyle";
import WelcomeScreen from "./containers/WelcomeScreen";

const App = () => {
  return (
    <>
      <GlobalStyle />
      <WelcomeScreen />
    </>
  );
};

render(<App />, document.getElementById("root"));
