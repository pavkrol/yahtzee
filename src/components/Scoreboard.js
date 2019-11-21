import React, { useState, useReducer, useEffect } from "react";
import PropTypes from "prop-types";
import {
  calculateSumOf,
  calculateUpperTotal,
  calculateLowerTotal,
  calculateFinalResult,
  calculateThreeOfAKind,
  calculateFourOfAKind,
  calculateFullHouse,
  calculateSmallStraight,
  calculateLargeStraight,
  calculateChance,
  calculateYahtzee
} from "./helpers";
import {
  upperSectionInitial,
  lowerSectionInitial
} from "../data/initialValues";
import Table from "./Table";

const Scoreboard = ({ dice_set, rollCount, updateMoves }) => {
  const [bonus, setBonus] = useState(0);
  const [upperTotal, setUpperTotal] = useState(0);
  const [lowerTotal, setLowerTotal] = useState(0);
  const [yahtzeeCount, setYahtzeeCount] = useState(0);
  const [finalResult, setFinalResult] = useState(0);
  const [scoreConfirmed, toggleScoreConfirmed] = useState(true);

  const [upperResults, dispatch] = useReducer(reducer, upperSectionInitial);

  const [lowerResults, dispatch2] = useReducer(reducer, lowerSectionInitial);

  function reducer(state, action) {
    switch (action.type) {
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

  const confirmScore = (section, index) => {
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
    toggleScoreConfirmed(!scoreConfirmed);
  };

  useEffect(() => {
    updateUpperSection(dice_set);
    updateLowerSection(dice_set);
    calculateFourOfAKind(dice_set);
    calculateFullHouse(dice_set);
    calculateSmallStraight(dice_set);
    calculateLargeStraight(dice_set);
    calculateYahtzee(dice_set);
    calculateChance(dice_set);
  }, [rollCount]);

  useEffect(() => {
    setUpperTotal(calculateUpperTotal(upperResults));
    setLowerTotal(calculateLowerTotal(lowerResults));
    setFinalResult(calculateFinalResult(lowerTotal, upperTotal));
  }, [scoreConfirmed]);

  return (
    <Table
      upperResults={upperResults}
      upperTotal={upperTotal}
      bonus={bonus}
      lowerResults={lowerResults}
      lowerTotal={lowerTotal}
      finalResult={finalResult}
      confirmScore={confirmScore}
      updateMoves={updateMoves}
    />
  );
};

export default Scoreboard;

Scoreboard.propTypes = {
  dice_set: PropTypes.arrayOf(PropTypes.object),
  rollCount: PropTypes.number,
  updateMoves: PropTypes.func
};
