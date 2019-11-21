import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const RollButtonWrapper = styled.button`
  grid-column: span 5;
  align-self: start;
  justify-self: center;
  height: 30px;
  width: 60px;
  border: 1px solid #fff;
`;

const RollButton = ({ handleRoll, singleMove, children }) => {
  return (
    <RollButtonWrapper onClick={() => handleRoll(singleMove)}>
      {children}
    </RollButtonWrapper>
  );
};

export default RollButton;

RollButton.propTypes = {
  handleRoll: PropTypes.func.isRequired,
  singleMove: PropTypes.number
};
