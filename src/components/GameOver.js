import React from "react";
import styled from "styled-components";

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
  font-family: "Share", sans-serif;
  h2 {
    font-size: 30px;
    font-weight: 500;
    margin-bottom: 30px;
  }
  h3 {
    font-size: 24px;
  }
`;

const GameOver = ({ finalResult }) => {
  return (
    <GameOverWrapper>
      <ResultPopup>
        <h2>Congratulations!</h2>
        <h3>{`Your final result is ${finalResult} points.`}</h3>
      </ResultPopup>
    </GameOverWrapper>
  );
};

export default GameOver;
