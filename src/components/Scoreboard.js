import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

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

const ResultRow = styled.tr`
  background-color: #e5e5e5;
`;

const Scoreboard = ({
  upperResults,
  upperTotal,
  lowerResults,
  lowerTotal,
  finalResult,
  updateMoves,
  confirmScore,
  yahtzeeBonus,
  dice_set,
  updateLowerSection,
  updateUpperSection,
  updateResults,
  scoreConfirmed
}) => {
  useEffect(() => {
    updateUpperSection(dice_set);
    updateLowerSection(dice_set);
  }, [dice_set]);

  useEffect(() => {
    updateResults();
  }, [scoreConfirmed]);

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
                if (!item.confirmed) {
                  confirmScore("upper", index, dice_set);
                  updateMoves();
                }
              }}
            >
              {item.result}
            </CategoryResult>
          </tr>
        ))}
        <ResultRow>
          <td>Total Score</td>
          <td>{upperTotal}</td>
        </ResultRow>
        <ResultRow>
          <td>Bonus</td>
          <td>{upperTotal >= 63 ? 35 : 0}</td>
        </ResultRow>
        <ResultRow>
          <td>Total Upper Section</td>
          <td>{upperTotal + (upperTotal >= 63 ? 35 : 0)}</td>
        </ResultRow>
        {lowerResults.map((item, index) => (
          <tr key={item.category}>
            <td>{item.category}</td>
            <CategoryResult
              confirmed={item.confirmed}
              onClick={() => {
                if (!item.confirmed) {
                  confirmScore("lower", index, dice_set);
                  updateMoves();
                }
              }}
            >
              {item.result}
            </CategoryResult>
          </tr>
        ))}
        <ResultRow>
          <td>Yahtzee Bonus</td>
          <td>{yahtzeeBonus}</td>
        </ResultRow>
        <ResultRow>
          <td>Total Lower Section</td>
          <td>{lowerTotal}</td>
        </ResultRow>
        <ResultRow>
          <td>Final Result</td>
          <td>{finalResult}</td>
        </ResultRow>
      </tbody>
    </TableWrapper>
  );
};

export default Scoreboard;

Scoreboard.propTypes = {
  upperResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  upperTotal: PropTypes.number.isRequired,
  lowerResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  lowerTotal: PropTypes.number.isRequired,
  finalResult: PropTypes.number.isRequired,
  confirmScore: PropTypes.func.isRequired,
  updateMoves: PropTypes.func.isRequired,
  yahtzeeBonus: PropTypes.number.isRequired,
  dice_set: PropTypes.arrayOf(PropTypes.object).isRequired,
  updateLowerSection: PropTypes.func.isRequired,
  updateUpperSection: PropTypes.func.isRequired,
  updateResults: PropTypes.func.isRequired,
  scoreConfirmed: PropTypes.bool.isRequired
};
