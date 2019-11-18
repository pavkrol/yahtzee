import React, { useState, useReducer, useEffect } from "react";
import styled from "styled-components";

const TableWrapper = styled.table``;

const Scoreboard = ({ dice_set, rollCount }) => {
  const upperSectionInitial = [
    { category: "Aces", result: 0 },
    { category: "Twos", result: 0 },
    { category: "Threes", result: 0 },
    { category: "Fours", result: 0 },
    { category: "Fives", result: 0 },
    { category: "Sixes", result: 0 }
  ];

  const lowerSectionInitial = [
    { category: "3 of a kind", result: 0 },
    { category: "4 of a kind", result: 0 },
    { category: "Full House", result: 0 },
    { category: "Small Straight", result: 0 },
    { category: "Large Straight", result: 0 },
    { category: "Yahtzee", result: 0 },
    { category: "Chance", result: 0 },
    { category: "Yahtzee Bonus", result: 0 }
  ];

  const [bonus, setBonus] = useState(0);
  const [upperTotal, setUpperTotal] = useState(0);
  const [lowerTotal, setLowerTotal] = useState(0);
  const [yahtzeeCount, setYahtzeeCount] = useState(0);
  const [finalResult, setFinalResult] = useState(0);

  const [upperResults, dispatch] = useReducer(
    scoreReducer,
    upperSectionInitial
  );

  const [lowerResults, dispatch2] = useReducer(
    scoreReducer,
    lowerSectionInitial
  );

  function scoreReducer(state, action) {
    switch (action.type) {
      case "updateUpper":
        state[action.index].result = calculateSumOf(
          action.diceSet,
          action.number
        );
        return [...state];
      case "updateLower":
        state[action.index].result = action.result;
        return [...state];
      default:
        return [...state];
    }
  }

  function calculateSumOf(diceSet, number) {
    return diceSet.reduce(
      (previous, current) =>
        current.value === number ? previous + current.value : previous,
      0
    );
  }

  const calculateUpperSection = () => {
    upperResults.forEach((item, index) => {
      dispatch({
        type: "updateUpper",
        index: index,
        diceSet: dice_set,
        number: index + 1
      });
    });
  };

  const calculateUpperTotal = () => {
    const result = upperResults.reduce(
      (previous, current) => previous + current.result,
      0
    );
    setUpperTotal(result);
  };

  const calculateThreeOfAKind = dice_set => {
    const result = dice_set.reduce(function(previous, current) {
      if (current.value in previous) {
        previous[current.value]++;
      } else {
        previous[current.value] = 1;
      }
      return previous;
    }, {});
    let isThree = false;
    for (const item in result) {
      if (result[item] > 2) isThree = true;
    }
    const dice_sum = dice_set.reduce(
      (previous, current) => previous + current.value,
      0
    );
    isThree
      ? dispatch2({
          type: "updateLower",
          index: 0,
          result: dice_sum
        })
      : dispatch2({
          type: "updateLower",
          index: 0,
          result: 0
        });
  };

  const calculateFourOfAKind = dice_set => {
    const result = dice_set.reduce(function(previous, current) {
      if (current.value in previous) {
        previous[current.value]++;
      } else {
        previous[current.value] = 1;
      }
      return previous;
    }, {});
    let isFour = false;
    for (const item in result) {
      if (result[item] > 3) isFour = true;
    }
    const dice_sum = dice_set.reduce(
      (previous, current) => previous + current.value,
      0
    );
    isFour
      ? dispatch2({
          type: "updateLower",
          index: 1,
          result: dice_sum
        })
      : dispatch2({
          type: "updateLower",
          index: 1,
          result: 0
        });
  };

  const calculateFullHouse = dice_set => {
    const sorted_dice = dice_set.map(dice => dice.value).sort();
    let isFullHouse = false;
    (sorted_dice[0] === sorted_dice[1] &&
      sorted_dice[1] === sorted_dice[2] &&
      sorted_dice[2] !== sorted_dice[3] &&
      sorted_dice[3] === sorted_dice[4]) ||
    (sorted_dice[0] === sorted_dice[1] &&
      sorted_dice[1] !== sorted_dice[2] &&
      sorted_dice[2] === sorted_dice[3] &&
      sorted_dice[3] === sorted_dice[4])
      ? (isFullHouse = true)
      : (isFullHouse = false);

    isFullHouse
      ? dispatch2({
          type: "updateLower",
          index: 2,
          result: 25
        })
      : dispatch2({
          type: "updateLower",
          index: 2,
          result: 0
        });
  };

  const calculateLargeStraight = dice_set => {
    const sorted_dice = dice_set.map(dice => dice.value).sort();
    let isLargeStraight = false;
    (sorted_dice[0] === 1 &&
      sorted_dice[1] === 2 &&
      sorted_dice[2] === 3 &&
      sorted_dice[3] === 4 &&
      sorted_dice[4] === 5) ||
    (sorted_dice[0] === 2 &&
      sorted_dice[1] === 3 &&
      sorted_dice[2] === 4 &&
      sorted_dice[3] === 5 &&
      sorted_dice[4] === 6)
      ? (isLargeStraight = true)
      : (isLargeStraight = false);
    isLargeStraight
      ? dispatch2({
          type: "updateLower",
          index: 4,
          result: 40
        })
      : dispatch2({
          type: "updateLower",
          index: 4,
          result: 0
        });
  };

  useEffect(() => {
    calculateUpperSection();
    calculateUpperTotal();
    calculateThreeOfAKind(dice_set);
    calculateFourOfAKind(dice_set);
    calculateFullHouse(dice_set);
    calculateLargeStraight(dice_set);
  }, [rollCount]);

  return (
    <TableWrapper>
      <thead>
        <tr>
          <th colSpan="2">Upper Section</th>
        </tr>
      </thead>
      <tbody>
        {upperResults.map(item => (
          <tr key={item.category}>
            <td>{item.category}</td>
            <td>{item.result}</td>
          </tr>
        ))}
        <tr>
          <td>Total Score</td>
          <td>{upperTotal}</td>
        </tr>
        <tr>
          <td>Bonus</td>
          <td>{bonus}</td>
        </tr>
        <tr>
          <td>Total Upper Section</td>
          <td>{upperTotal + bonus}</td>
        </tr>
        {lowerResults.map(item => (
          <tr key={item.category}>
            <td>{item.category}</td>
            <td>{item.result}</td>
          </tr>
        ))}
        <tr>
          <td>Total Lower Section</td>
          <td>{lowerTotal}</td>
        </tr>
        <tr>
          <td>Final Result</td>
          <td>{finalResult}</td>
        </tr>
        <tr>
          <td>
            <button>Calculate</button>
          </td>
        </tr>
      </tbody>
    </TableWrapper>
  );
};

export default Scoreboard;
