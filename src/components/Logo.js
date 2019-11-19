import React from "react";
import styled from "styled-components";
import dice_img from "../img/dice.png";

const LogoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    padding: 20px 85px;
    font-family: "Carter One", sans-serif;
    font-style: normal;
    font-weight: normal;
    font-size: 52px;
    line-height: 60px;
    position: relative;
    background-image: url(${props => props.image});
    background-size: contain;
    background-repeat: no-repeat;
  }
  h2 {
    font-family: "Share", sans-serif;
    font-size: 24px;
    line-height: 27px;
    margin-bottom: 50px;
  }
`;

const Logo = () => {
  return (
    <LogoWrapper image={dice_img}>
      <h1>Yahtzee</h1>
      <h2>Dice Game</h2>
    </LogoWrapper>
  );
};

export default Logo;
