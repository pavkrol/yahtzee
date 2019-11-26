import React from "react";
import styled from "styled-components";
import Button from "./Button";

const GameOverWrapper = styled.div`
  width: 100%;
  height: 100vh;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
`;

const ResultPopup = styled.div`
  width: 500px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: calc(50% - 250px);
  left: calc(50% - 250px);
  background-color: white;
  border-radius: 10px;
  color: #000;
  h2 {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 30px;
    font-family: "Open Sans Condensed", sans-serif;
    font-weight: 700;
  }
  h3 {
    font-size: 24px;
    font-family: "Open Sans", sans-serif;
    margin-bottom: 30px;
  }
  @media (max-width: 600px) {
    width: 85%;
    height: 300px;
    top: calc(50% - 150px);
    left: 7.5%;
    h2 {
      font-size: 24px;
      margin-bottom: 15px;
    }
    h3 {
      font-size: 18px;
      margin-bottom: 15px;
    }
  }
`;

const GameOver = ({ finalResult, startAgain }) => {
  return (
    <GameOverWrapper>
      <ResultPopup>
        <h2>Congratulations!</h2>
        <h3>{`Your final result is ${finalResult} points.`}</h3>
        <Button action={startAgain} colorScheme="inverted">
          Start again
        </Button>
      </ResultPopup>
    </GameOverWrapper>
  );
};

export default GameOver;
