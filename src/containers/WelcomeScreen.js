import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Switch from "../components/Switch";
import Logo from "../components/Logo";

const WelcomeWrapper = styled.section`
  width: 100%;
  height: 100vh;
  background: radial-gradient(50% 50% at 50% 50%, #1e5c94 0%, #223b52 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button:last-child {
    margin-top: 50px;
  }
`;

const WelcomeScreen = ({
  startGame,
  toggleDifficulty,
  toggleType,
  extremeDifficulty,
  sequenceGame
}) => {
  return (
    <WelcomeWrapper>
      <Logo />
      <Switch
        option1="Normal"
        option2="Extreme"
        isClicked={extremeDifficulty}
        switchFunction={toggleDifficulty}
      >
        Difficulty
      </Switch>
      <Switch
        option1="Standard"
        option2="In sequence"
        isClicked={sequenceGame}
        switchFunction={toggleType}
      >
        Game type
      </Switch>
      <Button
        startGame={() => {
          startGame(extremeDifficulty, sequenceGame);
        }}
      >
        Start
      </Button>
    </WelcomeWrapper>
  );
};

export default WelcomeScreen;
