import React, { useState } from "react";
import { render } from "react-dom";
import { Router, navigate } from "@reach/router";
import GlobalStyle from "./layout/GlobalStyle";
import WelcomeScreen from "./containers/WelcomeScreen";
import GameView from "./containers/GameView";

const App = () => {
  const [extremeDifficulty, setDifficulty] = useState(false);
  const [sequenceGame, setGameType] = useState(false);

  const toggleDifficulty = () => setDifficulty(!extremeDifficulty);
  const toggleType = () => setGameType(!sequenceGame);

  const startGame = () => {
    navigate("game");
  };
  return (
    <>
      <GlobalStyle />
      <Router>
        <WelcomeScreen
          path="/"
          extremeDifficulty={extremeDifficulty}
          sequenceGame={sequenceGame}
          startGame={startGame}
          toggleDifficulty={toggleDifficulty}
          toggleType={toggleType}
        />
        <GameView
          path="game"
          extremeDifficulty={extremeDifficulty}
          sequenceGame={sequenceGame}
        />
      </Router>
    </>
  );
};

render(<App />, document.getElementById("root"));
