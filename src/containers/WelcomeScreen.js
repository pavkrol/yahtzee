import React, { useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Button from "../components/Button";
import Switch from "../components/Switch";
import Logo from "../components/Logo";
import Rules from "../components/Rules";
import Highscores from "../components/Highscores";

const WelcomeWrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(50% 50% at 50% 50%, #1e5c94 0%, #223b52 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  button:last-child {
    margin-top: s50px;
  }
`;

const WelcomeScreen = ({
  startGame,
  toggleDifficulty,
  extremeDifficulty,
  sequenceGame
}) => {
  const [rules, toggleRules] = useState(false);
  return (
    <WelcomeWrapper>
      <Logo />
      <Button action={() => toggleRules(!rules)}>How to play</Button>
      {rules && <Rules closeRules={() => toggleRules(!rules)} />}
      <Switch
        option1="Normal"
        option2="Extreme"
        isClicked={extremeDifficulty}
        switchFunction={toggleDifficulty}
      >
        Difficulty
      </Switch>
      <Button
        action={() => {
          startGame(extremeDifficulty, sequenceGame);
        }}
      >
        Start
      </Button>
      <Highscores />
    </WelcomeWrapper>
  );
};

export default WelcomeScreen;

WelcomeScreen.propTypes = {
  startGame: PropTypes.func.isRequired,
  toggleDifficulty: PropTypes.func.isRequired,
  extremeDifficulty: PropTypes.bool.isRequired
};
