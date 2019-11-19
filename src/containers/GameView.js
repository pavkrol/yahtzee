import React, { useReducer, useState } from "react";
import styled from "styled-components";
import Dice from "../components/Dice";
import Scoreboard from "../components/Scoreboard";
import Logo from "../components/Logo";
import wooden_border from "../img/border.png";

const GameViewWrapper = styled.section`
  padding: 40px 0;
  background: radial-gradient(50% 50% at 50% 50%, #1e5c94 0%, #223b52 100%);
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Board = styled.div`
  width: 900px;
  min-height: 650px;
  background: radial-gradient(50% 50% at 50% 50%, #007d51 0%, #004c31 100%);
  box-shadow: 0px 20px 30px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  padding: 50px;
  display: grid;
  grid-template-columns: 300px repeat(5, 1fr);
  grid-template-rows: 100px auto;
  grid-gap: 20px;
  position: relative;
  :after {
    content: "";
    width: 105%;
    height: 105%;
    top: -2.5%;
    left: -2.5%;
    position: absolute;
    background-image: url(${props => props.image});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    pointer-events: none;
  }
  table {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
  }
`;

const RollButton = styled.button`
  grid-column: span 5;
  align-self: start;
  justify-self: center;
  height: 30px;
  width: 60px;
  border: 1px solid #fff;
`;

const GameView = ({ extremeDifficulty, sequenceGame }) => {
  const roll_dice = () => {
    return Math.floor(Math.random() * 6) + 1;
  };

  const initialState = [
    { hold: false, value: roll_dice() },
    { hold: false, value: roll_dice() },
    { hold: false, value: roll_dice() },
    { hold: false, value: roll_dice() },
    { hold: false, value: roll_dice() }
  ];

  let [rollCount, setRollCount] = useState(0);
  const [dice_set, dispatch] = useReducer(reducer, initialState);

  function reducer(state, action) {
    switch (action.type) {
      case "roll":
        state[action.index].value = roll_dice();
        return [...state];
      case "hold":
        state[action.index].hold = !state[action.index].hold;
        return [...state];
      default:
        return [...state];
    }
  }

  const roll_dice_set = () => {
    dice_set.forEach((dice, index) => {
      !dice.hold && dispatch({ type: "roll", index: index });
    });
    setRollCount(rollCount + 1);
  };

  const hold_dice = index => {
    dispatch({ type: "hold", index: index });
  };

  return (
    <GameViewWrapper>
      <Logo />
      <Board image={wooden_border}>
        {dice_set.map((dice, index) => (
          <Dice
            hold_dice={hold_dice}
            number={index}
            key={index}
            value={dice.value}
            hold={dice.hold}
          />
        ))}
        <RollButton onClick={() => roll_dice_set()}>Roll</RollButton>
        <Scoreboard dice_set={dice_set} rollCount={rollCount} />
      </Board>
    </GameViewWrapper>
  );
};

export default GameView;
