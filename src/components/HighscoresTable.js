import React from "react";
import styled from "styled-components";

const HighscoresTableWrapper = styled.table`
  padding: 20px 30px;
  max-width: 350px;
  th {
    font-size: 24px;
    font-weight: 400;
    width: 100%;
    height: 70px;
  }
  td {
    font-size: 20px;
    height: 30px;
  }
  tr td:last-child {
    text-align: right;
  }
  @media (max-width: 900px) {
    width: 80%;
  }
  @media (max-width: 600px) {
    width: 90%;
    padding: 0;
  }
`;

const HighscoresTable = ({ results, header }) => {
  return (
    <HighscoresTableWrapper>
      <thead>
        <tr>
          <th colSpan="3">{header}</th>
        </tr>
      </thead>
      <tbody>
        {results.map((score, index) => (
          <tr key={score.id}>
            <td>{`${index + 1}.`}</td>
            <td>{score.name}</td>
            <td>{score.result}</td>
          </tr>
        ))}
      </tbody>
    </HighscoresTableWrapper>
  );
};

export default HighscoresTable;
