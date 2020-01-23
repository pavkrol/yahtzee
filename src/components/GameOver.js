import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import { firestore } from "../data/firebase";

const GameOverWrapper = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.7);
  top: 0;
  left: 0;
  position: fixed;
`;

const ResultPopup = styled.div`
  width: 70%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px 30px;
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
  h3,
  p {
    font-size: 24px;
    font-family: "Open Sans", sans-serif;
    margin-bottom: 30px;
    padding: 0 10%;
    text-align: center;
  }
  form {
    width: 100%;
    display: flex;
    justify-content: center;
    input {
      margin-bottom: 15px;
      border: 1px solid #000;
      border-radius: 8px;
      height: 35px;
      margin-right: 20px;
      padding: 7px 20px;
      font-size: 18px;
      font-family: "Open Sans", sans-serif;
    }
    button {
      font-size: 18px;
      background-color: #75a2cb50;
    }
  }

  @media (max-width: 600px) {
    width: 85%;
    min-height: 80vh;
    h2 {
      font-size: 22px;
      margin-bottom: 15px;
    }
    h3,
    p {
      font-size: 16px;
      margin-bottom: 15px;
    }
    form {
      flex-direction: column;
      input {
        flex: 1;
        height: 35px;
        margin-right: 0;
      }
    }
  }
`;

const GameOver = ({ finalResult, startAgain, goToHighscores }) => {
  const [playerName, setPlayerName] = useState("");
  const [saved, toggleSaved] = useState(false);

  const addNewScore = async (name, score) => {
    const result = { name: name, result: score };
    await firestore.collection("normalDifficulty").add(result);
  };

  useEffect(() => {
    document.body.style.overflowY = "hidden";
    return () => (document.body.style.overflowY = "unset");
  }, []);

  return (
    <GameOverWrapper>
      <ResultPopup>
        <h2>Congratulations!</h2>
        <h3>{`Your final result is ${finalResult} points. Enter your name below and click button if you want to save your score.`}</h3>
        {!saved ? (
          <form
            onSubmit={e => {
              e.preventDefault();
              addNewScore(playerName, finalResult);
              toggleSaved(!saved);
            }}
          >
            <input
              type="text"
              maxlength="10"
              value={playerName}
              onChange={e => setPlayerName(e.target.value)}
            />
            <Button width="80px" height="35px" colorScheme="inverted">
              Save
            </Button>
          </form>
        ) : (
          <p>
            Thank you. Your score has been saved in our database. You can check
            the best players by clicking on "Highscores" button or play again.
          </p>
        )}
        <Button action={goToHighscores} colorScheme="inverted">
          Highscores
        </Button>
        <Button action={startAgain} colorScheme="inverted">
          Start again
        </Button>
      </ResultPopup>
    </GameOverWrapper>
  );
};

export default GameOver;
