import React, { useState, useReducer, useEffect } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const TableWrapper = styled.table`
  border-collapse: collapse;
  background-color: #fff;
  color: #000;
  font-family: "Titillium Web", sans-serif;
  font-size: 18px;
  border-radius: 5px;
  td {
    border: 1px solid #a8a2a2;

    padding-left: 10px;
  }
  tr:first-child td {
    border-top: 0;
  }
  tr td:first-child {
    border-left: 0;
  }
  tr:last-child td {
    border-bottom: 0;
  }
  tr td:last-child {
    border-right: 0;
    cursor: pointer;
  }
`;

const CategoryResult = styled.td`
  color: ${props => (props.confirmed === true ? "#000" : "#a8a2a2")};
`;

const Scoreboard = ({ dice_set, rollCount, updateMoves }) => {
  const upperSectionInitial = [
    { category: "Aces", result: 0, confirmed: false },
    { category: "Twos", result: 0, confirmed: false },
    { category: "Threes", result: 0, confirmed: false },
    { category: "Fours", result: 0, confirmed: false },
    { category: "Fives", result: 0, confirmed: false },
    { category: "Sixes", result: 0, confirmed: false }
  ];

  const lowerSectionInitial = [
    { category: "3 of a kind", result: 0, confirmed: false },
    { category: "4 of a kind", result: 0, confirmed: false },
    { category: "Full House", result: 0, confirmed: false },
    { category: "Small Straight", result: 0, confirmed: false },
    { category: "Large Straight", result: 0, confirmed: false },
    { category: "Yahtzee", result: 0, confirmed: false },
    { category: "Chance", result: 0, confirmed: false },
    { category: "Yahtzee Bonus", result: 0, confirmed: false }
  ];

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
        state[action.index].result = calculateSumOf(
          action.diceSet,
          action.number
        );
        return [...state];
      case "updateLower":
        state[action.index].result = action.result;
        return [...state];
      case "confirmScore":
        state[action.index].confirmed = true;
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

  const calculateUpperSection = dice_set => {
    upperResults.forEach((item, index) => {
      dispatch({
        type: "updateUpper",
        index: index,
        diceSet: dice_set,
        number: index + 1
      });
    });
  };

  const calculateUpperTotal = upperResults => {
    const result = upperResults.reduce(
      (previous, current) =>
        current.confirmed ? previous + current.result : previous,
      0
    );
    setUpperTotal(result);
  };

  const calculateLowerTotal = lowerResults => {
    const result = lowerResults.reduce(
      (previous, current) =>
        current.confirmed ? previous + current.result : previous,
      0
    );
    setLowerTotal(result);
  };

  const calculateFinalResult = (lowerTotal, upperTotal) => {
    setFinalResult(lowerTotal + upperTotal);
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

  const calculateSmallStraight = dice_set => {
    const sorted_dice = dice_set
      .map(dice => dice.value)
      .sort()
      .filter((item, position, array) => {
        return !position || item !== array[position - 1];
      });
    let consecutive_count = 0;
    sorted_dice.forEach((dice, index) => {
      index > 0 && dice === sorted_dice[index - 1] + 1
        ? consecutive_count++
        : null;
    });
    consecutive_count >= 3
      ? dispatch2({
          type: "updateLower",
          index: 3,
          result: 30
        })
      : dispatch2({
          type: "updateLower",
          index: 3,
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

  const calculateYahtzee = dice_set => {
    let isYatzee = false;
    const flat_array = dice_set.map(dice => dice.value);
    if (
      flat_array[0] === flat_array[1] &&
      flat_array[1] === flat_array[2] &&
      flat_array[2] === flat_array[3] &&
      flat_array[3] === flat_array[4]
    )
      isYatzee = true;
    isYatzee
      ? dispatch2({
          type: "updateLower",
          index: 5,
          result: 50
        })
      : dispatch2({
          type: "updateLower",
          index: 5,
          result: 0
        });
  };

  const calculateChance = dice_set => {
    const dice_sum = dice_set.reduce(
      (previous, current) => previous + current.value,
      0
    );
    dispatch2({
      type: "updateLower",
      index: 6,
      result: dice_sum
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
  };

  useEffect(() => {
    calculateUpperSection(dice_set);
    calculateThreeOfAKind(dice_set);
    calculateFourOfAKind(dice_set);
    calculateFullHouse(dice_set);
    calculateSmallStraight(dice_set);
    calculateLargeStraight(dice_set);
    calculateYahtzee(dice_set);
    calculateChance(dice_set);
    calculateUpperTotal(upperResults);
    calculateLowerTotal(lowerResults);
    calculateFinalResult(lowerTotal, upperTotal);
  }, [rollCount, scoreConfirmed]);

  return (
    <TableWrapper>
      <thead>
        <tr>
          <th colSpan="2">Scoreboard</th>
        </tr>
      </thead>
      <tbody>
        {upperResults.map((item, index) => (
          <tr key={item.category}>
            <td>{item.category}</td>
            <CategoryResult
              confirmed={item.confirmed}
              onClick={() => {
                confirmScore("upper", index);
                toggleScoreConfirmed(!scoreConfirmed);
                updateMoves();
              }}
            >
              {item.result}
            </CategoryResult>
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
        {lowerResults.map((item, index) => (
          <tr key={item.category}>
            <td>{item.category}</td>
            <CategoryResult
              confirmed={item.confirmed}
              onClick={() => {
                confirmScore("lower", index);
                updateMoves();
              }}
            >
              {item.result}
            </CategoryResult>
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
      </tbody>
    </TableWrapper>
  );
};

export default Scoreboard;

Scoreboard.propTypes = {
  dice_set: PropTypes.arrayOf(PropTypes.object),
  rollCount: PropTypes.number,
  updateMoves: PropTypes.func
};
