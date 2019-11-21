import React from "react";
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

const Table = ({
  upperResults,
  upperTotal,
  bonus,
  lowerResults,
  lowerTotal,
  finalResult,
  confirmScore,
  updateMoves
}) => {
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

export default Table;

Table.propTypes = {
  upperResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  upperTotal: PropTypes.number.isRequired,
  bonus: PropTypes.number.isRequired,
  lowerResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  lowerTotal: PropTypes.number.isRequired,
  finalResult: PropTypes.number.isRequired,
  confirmScore: PropTypes.func.isRequired,
  updateMoves: PropTypes.func.isRequired
};
