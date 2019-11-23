import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const RollButtonWrapper = styled.button`
  grid-column: span 4;
  align-self: start;
  justify-self: center;
  display: inline-block;
  position: relative;
  height: 50px;
  width: 80px;
  font-family: "Titillium Web", sans-serif;
  letter-spacing: 1px;
  line-height: 50px;
  padding: 0 15px;
  font-size: 16px;
  color: white;
  text-decoration: none;
  text-shadow: 0 -1px rgba(0, 0, 0, 0.3);
  border: 2px solid;
  border-radius: 7px;
  outline: 0;
  box-shadow: 0 2px 1px rgba(0, 0, 0, 0.25);
  background: #3e952d;
  border-color: #29621e #275e1c #1d4715;
  background-image: linear-gradient(
    to bottom,
    #45b436 0%,
    #3ca933 50%,
    #3e952d 50%,
    #337c1d 100%
  );
  :active {
    background: #42a933;
    background-image: linear-gradient(
      to bottom,
      #31741b 0%,
      #3fa131 60%,
      #42a933 100%
    );
  }
  :active:after {
    border-color: #42a933;
  }
  :before,
  :after {
    content: "";
    position: absolute;
  }
  :before {
    top: -5px;
    bottom: -5px;
    left: -5px;
    right: -5px;
    z-index: -1;
    border-radius: 9px;
    background: #4ac233;
    background-image: linear-gradient(to bottom, #317c22, #52d039);
  }
  :after {
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    border: 2px solid rgba(255, 255, 255, 0.1);
    border-bottom: 0;
    border-radius: 7px;
  }
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
