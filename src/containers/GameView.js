import React from "react";
import styled from "styled-components";

const GameViewWrapper = styled.section`
  color: black;
`;

const GameView = ({ extremeDifficulty, sequenceGame }) => {
  return (
    <GameViewWrapper>
      <h1>Game</h1>
      <p>Difficulty: {extremeDifficulty ? "Extreme" : "Normal"}</p>
      <p>Game Type: {sequenceGame ? "In sequence" : "Standard"}</p>
    </GameViewWrapper>
  );
};

export default GameView;
