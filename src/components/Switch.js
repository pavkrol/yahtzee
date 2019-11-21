import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const SwitchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 400px;
  height: 80px;
  font-family: "Share", sans-serif;
  cursor: pointer;
  h3 {
    font-size: 24px;
    margin-right: auto;
  }
`;

const Option = styled.div`
  font-size: 18px;
  border: ${props => (props.isClicked ? "1px solid #fff" : "none")};
  padding: 10px 0;
  width: 110px;
  margin-left: 20px;
  border-radius: 8px;
  text-align: center;
  color: ${props => (props.isClicked ? "#FFF" : "#A8A2A2")};
`;

const Switch = ({ children, isClicked, switchFunction, option1, option2 }) => {
  return (
    <SwitchWrapper onClick={() => switchFunction()}>
      <h3>{children}</h3>
      <Option isClicked={!isClicked}>{option1}</Option>
      <Option isClicked={isClicked}>{option2}</Option>
    </SwitchWrapper>
  );
};

export default Switch;

Switch.propTypes = {
  isClicked: PropTypes.bool.isRequired,
  switchFunction: PropTypes.func.isRequired,
  option1: PropTypes.string.isRequired,
  option2: PropTypes.string.isRequired
};
