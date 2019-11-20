import React from "react";
import styled, { css } from "styled-components";

const DiceWrapper = styled.div`
  width: 80px;
  height: 80px;
  background-color: #fff;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  border-radius: 10px;
  position: relative;
  border: 2px solid #FFF;
  cursor: pointer;
  justify-self: center;
  ${props =>
    props.hold &&
    css`
      border: 2px solid red;
    `}
  ${props =>
    props.value === 1 &&
    css`
      grid-template-columns: 1fr;
      grid-template-rows: 1fr;
    `}
  ${props =>
    props.value === 2 &&
    css`
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    `}
  ${props =>
    (props.value === 3 || props.value === 5) &&
    css`
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr 1fr;
    `}
  ${props =>
    props.value === 4 &&
    css`
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    `}
  ${props =>
    props.value === 6 &&
    css`
      grid-template-columns: 1fr 1fr 1fr;
      grid-template-rows: 1fr 1fr;
    `}
  div {
    display: none;
    background-color: #000;
    width: 10px;
    height: 10px;
    justify-self: center;
    align-self: center;
    border-radius: 50%;
    ${props =>
      props.value === 1 &&
      css`
        :nth-of-type(1) {
          display: block;
        }
      `}
    ${props =>
      props.value === 2 &&
      css`
        :nth-of-type(1),
        :nth-of-type(2) {
          display: block;
        }
        :nth-of-type(2) {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        }
      `}
    ${props =>
      props.value === 3 &&
      css`
        :nth-of-type(1),
        :nth-of-type(2),
        :nth-of-type(3) {
          display: block;
        }
        :nth-of-type(2) {
          grid-column: 2 / 3;
          grid-row: 2 / 3;
        }
        :nth-of-type(3) {
          grid-column: 3 / 4;
          grid-row: 3 / 4;
        }
      `}
    ${props =>
      props.value === 4 &&
      css`
        :nth-of-type(1),
        :nth-of-type(2),
        :nth-of-type(3),
        :nth-of-type(4) {
          display: block;
        }
      `}
    ${props =>
      props.value === 5 &&
      css`
        :nth-of-type(1),
        :nth-of-type(2),
        :nth-of-type(3),
        :nth-of-type(4),
        :nth-of-type(5) {
          display: block;
        }
        :nth-of-type(2),
        :nth-of-type(5) {
          grid-column: 3 / 4;
        }
        :nth-of-type(3) {
          grid-column: span 3;
        }
      `}
    ${props =>
      props.value === 6 &&
      css`
        display: block;
      `}
    
    }
`;

const Dice = ({ value, hold, hold_dice, number }) => {
  return (
    <DiceWrapper
      onClick={() => {
        hold_dice(number);
        console.log("click");
      }}
      value={value}
      hold={hold}
    >
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </DiceWrapper>
  );
};

export default Dice;
