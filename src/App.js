import React, { useState } from "react";
import { render } from "react-dom";
import { Router, navigate } from "@reach/router";
import GlobalStyle from "./layout/GlobalStyle";
import WelcomeScreen from "./containers/WelcomeScreen";
import GameView from "./containers/GameView";
import HighscoresView from "./containers/HighscoresView";

const App = () => {
  const [extremeDifficulty, setDifficulty] = useState(false);
  const [newGame, toggleNewGame] = useState(false);

  const toggleDifficulty = () => setDifficulty(!extremeDifficulty);

  const startGame = () => {
    toggleNewGame(!newGame);
    navigate("game");
  };

  const startAgain = () => {
    navigate("/");
  };

  const goToHighscores = () => {
    navigate("highscores");
  };

  return (
    <>
      <GlobalStyle />
      <Router>
        <WelcomeScreen
          path="/"
          extremeDifficulty={extremeDifficulty}
          startGame={startGame}
          toggleDifficulty={toggleDifficulty}
          goToHighscores={goToHighscores}
        />
        <GameView
          path="game"
          extremeDifficulty={extremeDifficulty}
          startAgain={startAgain}
          newGame={newGame}
          goToHighscores={goToHighscores}
        />
        <HighscoresView path="highscores" startAgain={startAgain} />
      </Router>
    </>
  );
};

render(<App />, document.getElementById("root"));
