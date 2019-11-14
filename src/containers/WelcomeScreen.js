import React, { useState } from "react";
import styled from "styled-components";
import Button from "../components/Button";
import Switch from "../components/Switch";
import dice_img from "../img/dice.png";

const WelcomeWrapper = styled.section`
  width: 100%;
  height: 100vh;
  background: radial-gradient(50% 50% at 50% 50%, #1e5c94 0%, #223b52 100%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h1 {
    padding: 20px 85px;
    font-family: "Carter One", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 52px;
    line-height: 60px;
    position: relative;
    background-image: url(${props => props.image});
    background-size: contain;
    background-repeat: no-repeat;
  }
  h2 {
    font-family: "Share", sans-serif;
    font-size: 24px;
    line-height: 27px;
    margin-bottom: 50px;
  }
  button:last-child {
    margin-top: 50px;
  }
`;

const WelcomeScreen = () => {
  const [isNormal, setDifficulty] = useState(true);
  const [isStandard, setGameType] = useState(true);

  const toggleDifficulty = () => setDifficulty(!isNormal);
  const toggleType = () => setGameType(!isStandard);

  return (
    <WelcomeWrapper image={dice_img}>
      <h1>Yahtzee</h1>
      <h2>Dice Game</h2>
      <Switch
        option1="Normal"
        option2="Extreme"
        isClicked={isNormal}
        switchFunction={toggleDifficulty}
      >
        Difficulty
      </Switch>
      <Switch
        option1="Standard"
        option2="In sequence"
        isClicked={isStandard}
        switchFunction={toggleType}
      >
        Game type
      </Switch>
      <Button>Start</Button>
    </WelcomeWrapper>
  );
};

export default WelcomeScreen;
