import React, { useState, useReducer, useEffect } from "react";
import styled from "styled-components";

const TableWrapper = styled.table``;

const Scoreboard = ({ dice_set }) => {
  const upperSectionInitial = [
    { category: "Aces", result: 0 },
    { category: "Twos", result: 0 },
    { category: "Threes", result: 0 },
    { category: "Fours", result: 0 },
    { category: "Fives", result: 0 },
    { category: "Sixes", result: 0 }
  ];

  const lowerSection = [
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

  function scoreReducer(state, action) {
    switch (action.type) {
      case "updateUpper":
        state[action.index].result = calculateSumOf(
          action.diceSet,
          action.number
        );
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

  useEffect(() => {
    calculateUpperSection();
    calculateUpperTotal();
  }, [dice_set]);

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
        {lowerSection.map(item => (
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
            <button onClick={() => calculateUpperSection()}>Calculate</button>
          </td>
        </tr>
      </tbody>
    </TableWrapper>
  );
};

export default Scoreboard;
