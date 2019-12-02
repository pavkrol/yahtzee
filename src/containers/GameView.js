import React, { useReducer, useState, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Dice from "../components/Dice";
import Scoreboard from "../components/Scoreboard";
import Logo from "../components/Logo";
import RollButton from "../components/RollButton";
import GameOver from "../components/GameOver";
import wooden_border from "../img/border.png";
import {
  roll_dice,
  setPosition,
  setRotation,
  calculateSumOf,
  calculateUpperTotal,
  calculateLowerTotal,
  calculateThreeOfAKind,
  calculateFourOfAKind,
  calculateFullHouse,
  calculateSmallStraight,
  calculateLargeStraight,
  calculateChance,
  calculateYahtzee,
  calculateFinalResult,
  calculateYahtzeeBonus
} from "../components/helpers";
import {
  upperSectionInitial,
  lowerSectionInitial,
  initialDiceValues
} from "../data/initialValues";

const GameViewWrapper = styled.section`
  padding: 40px 0;
  background: radial-gradient(50% 50% at 50% 50%, #1e5c94 0%, #223b52 100%);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 600px) {
    padding: 10px 0 20px 0;
  }
`;

const Board = styled.div`
  width: 900px;
  min-height: 650px;
  background: radial-gradient(50% 50% at 50% 50%, #007d51 0%, #004c31 100%);
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 50px;
  display: grid;
  grid-template-columns: 300px repeat(4, 1fr);
  grid-template-rows: 70px repeat(4, 1fr);
  grid-template-areas:
    "scoreboard roll roll roll roll"
    "scoreboard one two three four"
    "scoreboard five six seven eight"
    "scoreboard nine ten eleven twelve"
    "scoreboard thirteen fourteen fifteen sixteen";
  grid-gap: 20px;
  position: relative;
  :after {
    content: "";
    width: 105%;
    height: 105%;
    top: -2.5%;
    left: -2.5%;
    position: absolute;
    background-image: url(${props => props.image});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    pointer-events: none;
  }
  table {
    grid-area: scoreboard;
  }
  @media (max-width: 1000px) {
    width: 90%;
  }
  @media (max-width: 800px) {
    grid-template-columns: 300px 1fr;
    grid-template-rows: 70px repeat(5, 1fr);
    grid-template-areas:
      "scoreboard roll"
      "scoreboard one"
      "scoreboard two"
      "scoreboard three"
      "scoreboard four"
      "scoreboard five";
  }
  @media (max-width: 600px) {
    grid-template-columns: 220px 1fr;
    padding: 50px 25px;
    min-height: 490px;
  }
  @media (max-width: 500px) {
    grid-template-columns: 170px 1fr;
    padding: 50px 25px;
  }
`;

const GameView = ({
  extremeDifficulty,
  startAgain,
  newGame,
  goToHighscores
}) => {
  let [movesLeft, setMoves] = useState(13);
  let [singleMove, setSingleMove] = useState(extremeDifficulty ? 1 : 2);
  const [dice_set, dispatch3] = useReducer(reducer, initialDiceValues);
  const [upperTotal, setUpperTotal] = useState(0);
  const [lowerTotal, setLowerTotal] = useState(0);
  const [yahtzeeCount, setYahtzeeCount] = useState(0);
  const [finalResult, setFinalResult] = useState(0);
  const [scoreConfirmed, toggleScoreConfirmed] = useState(true);
  const [upperResults, dispatch] = useReducer(reducer, upperSectionInitial);
  const [lowerResults, dispatch2] = useReducer(reducer, lowerSectionInitial);
  const [isGameOver, setGameOver] = useState(false);

  function reducer(state, action) {
    switch (action.type) {
      case "roll":
        state[action.index].value = roll_dice();
        state[action.index].position = setPosition(action.index);
        state[action.index].rotation = setRotation();
        return [...state];
      case "hold":
        state[action.index].hold = !state[action.index].hold;
        return [...state];
      case "updateUpper":
        if (!state[action.index].confirmed)
          state[action.index].result = action.result;
        return [...state];
      case "updateLower":
        if (!state[action.index].confirmed)
          state[action.index].result = action.result;
        return [...state];
      case "confirmScore":
        state[action.index].confirmed = true;
        return [...state];
      case "reset":
        state[action.index].confirmed = false;
        state[action.index].result = 0;
      default:
        return [...state];
    }
  }

  const updateUpperSection = dice_set => {
    upperResults.forEach((item, index) => {
      const result = calculateSumOf(dice_set, index + 1);
      dispatch({
        type: "updateUpper",
        index: index,
        result: result
      });
    });
  };

  const updateLowerSection = dice_set => {
    dispatch2({
      type: "updateLower",
      index: 0,
      result: calculateThreeOfAKind(dice_set)
    });
    dispatch2({
      type: "updateLower",
      index: 1,
      result: calculateFourOfAKind(dice_set)
    });
    dispatch2({
      type: "updateLower",
      index: 2,
      result: calculateFullHouse(dice_set)
    });
    dispatch2({
      type: "updateLower",
      index: 3,
      result: calculateSmallStraight(dice_set)
    });
    dispatch2({
      type: "updateLower",
      index: 4,
      result: calculateLargeStraight(dice_set)
    });
    dispatch2({
      type: "updateLower",
      index: 5,
      result: calculateYahtzee(dice_set)
    });
    dispatch2({
      type: "updateLower",
      index: 6,
      result: calculateChance(dice_set)
    });
  };

  const updateMoves = () => {
    dice_set.forEach((item, index) => {
      if (item.hold === true) {
        dispatch3({ type: "hold", index: index });
      }
      dispatch3({ type: "roll", index: index });
    });
    setMoves(movesLeft - 1);
    setSingleMove(extremeDifficulty ? 1 : 2);
  };

  const updateSingleMove = () => {
    setSingleMove(singleMove - 1);
  };
  const roll_dice_set = () => {
    dice_set.forEach((dice, index) => {
      !dice.hold && dispatch3({ type: "roll", index: index });
    });
  };

  const hold_dice = index => {
    dispatch3({ type: "hold", index: index });
  };

  const handleRoll = singleMove => {
    if (singleMove) {
      roll_dice_set();
      updateSingleMove();
    }
  };

  const confirmScore = (section, index, dice_set) => {
    if (section === "upper") {
      dispatch({
        type: "confirmScore",
        index: index
      });
    }

    if (section === "lower") {
      dispatch2({
        type: "confirmScore",
        index: index
      });
    }
    if (calculateYahtzee(dice_set)) setYahtzeeCount(yahtzeeCount + 1);
    toggleScoreConfirmed(!scoreConfirmed);
  };

  const updateResults = () => {
    setUpperTotal(calculateUpperTotal(upperResults));
    setLowerTotal(calculateLowerTotal(lowerResults));
    setFinalResult(
      calculateFinalResult(upperResults, lowerResults, yahtzeeCount)
    );
    if (movesLeft === 0) setGameOver(true);
  };

  useEffect(() => {
    upperResults.forEach((item, index) =>
      dispatch({ type: "reset", index: index })
    );
    lowerResults.forEach((item, index) =>
      dispatch2({ type: "reset", index: index })
    );
    setYahtzeeCount(0);
    setGameOver(false);
    dice_set.forEach((dice, index) =>
      dispatch3({ type: "roll", index: index })
    );
    setUpperTotal(0);
    setLowerTotal(0);
    setFinalResult(0);
  }, [newGame]);

  return (
    <GameViewWrapper>
      <Logo />
      <Board image={wooden_border}>
        <RollButton handleRoll={handleRoll} singleMove={singleMove}>
          ROLL
        </RollButton>
        {dice_set.map((dice, index) => (
          <Dice
            hold_dice={hold_dice}
            number={index}
            key={index}
            value={dice.value}
            hold={dice.hold}
            position={dice.position}
            rotation={dice.rotation}
          />
        ))}

        <Scoreboard
          dice_set={dice_set}
          updateLowerSection={updateLowerSection}
          updateUpperSection={updateUpperSection}
          upperResults={upperResults}
          upperTotal={upperTotal}
          lowerResults={lowerResults}
          lowerTotal={lowerTotal}
          finalResult={finalResult}
          confirmScore={confirmScore}
          updateMoves={updateMoves}
          updateMoves={updateMoves}
          yahtzeeBonus={calculateYahtzeeBonus(lowerResults, yahtzeeCount)}
          updateResults={updateResults}
          scoreConfirmed={scoreConfirmed}
        />
      </Board>
      {isGameOver && (
        <GameOver
          finalResult={finalResult}
          startAgain={startAgain}
          goToHighscores={goToHighscores}
        />
      )}
    </GameViewWrapper>
  );
};

export default GameView;

GameView.propTypes = {
  extremeDifficulty: PropTypes.bool,
  startAgain: PropTypes.func
};
