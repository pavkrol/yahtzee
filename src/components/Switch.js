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
  margin-bottom: 20px;
  flex-wrap: wrap;
  cursor: pointer;
  h3 {
    font-size: 24px;
    margin-right: auto;
  }
  @media (max-width: 600px) {
    height: 100px;
    justify-content: space-around;
    h3 {
      width: 100%;
      text-align: center;
    }
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
  :hover {
    ${props =>
      props.isClicked
        ? "box-shadow: 0px 0px 10px 0px rgba(255,255,255,1)"
        : "none"};
  }
`;

const Tooltip = styled.div`
  width: 20px;
  height: 20px;
  border: 1px solid #fff;
  border-radius: 50%;
  text-align: center;
  line-height: 20px;
  margin-left: 15px;
  position: relative;
  :after,
  :before {
    content: "";
    position: absolute;
    background-color: #fff;
    visibility: hidden;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }
  :hover:after {
    content: "You can roll dice only twice instead of 3 times each move";
    min-width: 250px;
    color: #000;
    border-radius: 5px;
    height: 60px;
    top: calc(50% - 30px);
    left: 30px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 10px;
    visibility: visible;
    opacity: 1;
  }
  :hover:before {
    content: "";
    width: 10px;
    height: 10px;
    transform: rotate(45deg);
    left: 25px;
    top: calc(50% - 5px);
    visibility: visible;
    opacity: 1;
  }
  @media (max-width: 1000px) {
    display: none;
  }
`;

const Switch = ({ children, isClicked, switchFunction, option1, option2 }) => {
  return (
    <SwitchWrapper onClick={() => switchFunction()} isClicked={isClicked}>
      <h3>{children}</h3>
      <Option isClicked={!isClicked}>{option1}</Option>
      <Option isClicked={isClicked}>{option2}</Option>
      <Tooltip>?</Tooltip>
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
