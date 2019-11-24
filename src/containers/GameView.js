import React, { useReducer, useState } from "react";
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
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
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
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
`;

const GameView = ({ extremeDifficulty, sequenceGame }) => {
  let [movesLeft, setMoves] = useState(13);
  let [singleMove, setSingleMove] = useState(2);
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
        //state[action.index].position = setPosition(state);
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
    setSingleMove(2);
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
      {isGameOver && <GameOver finalResult={finalResult} />}
    </GameViewWrapper>
  );
};

export default GameView;

GameView.propTypes = {
  extremeDifficulty: PropTypes.bool,
  sequenceGame: PropTypes.bool
};
