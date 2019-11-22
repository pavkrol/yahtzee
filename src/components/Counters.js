import React from "react";
import styled from "styled-components";

const CountersWrapper = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  bottom: 30px;
  right: 30px;
  div {
    width: 30px;
    height: 30px;
    border: 1px solid white;
    margin-right: 10px;
  }
`;

const Counters = ({ yahtzeeCount, movesLeft, singleMove }) => {
  return (
    <CountersWrapper>
      <div>{yahtzeeCount}</div>
      <div>{movesLeft}</div>
      <div>{singleMove}</div>
    </CountersWrapper>
  );
};

export default Counters;
