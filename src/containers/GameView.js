import React, { useReducer, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import Dice from "../components/Dice";
import Scoreboard from "../components/Scoreboard";
import Logo from "../components/Logo";
import RollButton from "../components/RollButton";
import wooden_border from "../img/border.png";
import { roll_dice } from "../components/helpers";
import { initialDiceValues } from "../data/initialValues";

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

const GameView = ({ extremeDifficulty, sequenceGame }) => {
  let [rollCount, setRollCount] = useState(0);
  let [movesLeft, setMoves] = useState(13);
  let [singleMove, setSingleMove] = useState(2);
  const [dice_set, dispatch] = useReducer(reducer, initialDiceValues);

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

  const updateMoves = () => {
    dice_set.forEach((item, index) => {
      if (item.hold === true) {
        dispatch({ type: "hold", index: index });
      }
      dispatch({ type: "roll", index: index });
    });
    setMoves(movesLeft - 1);
    setSingleMove(2);
  };

  const updateSingleMove = () => {
    setSingleMove(singleMove - 1);
  };
  const roll_dice_set = () => {
    dice_set.forEach((dice, index) => {
      !dice.hold && dispatch({ type: "roll", index: index });
    });
    setRollCount(rollCount + 1);
  };

  const hold_dice = index => {
    dispatch({ type: "hold", index: index });
  };

  const handleRoll = singleMove => {
    if (singleMove) {
      roll_dice_set();
      updateSingleMove();
    }
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
        <RollButton handleRoll={handleRoll} singleMove={singleMove}>
          Roll
        </RollButton>
        <Scoreboard
          dice_set={dice_set}
          rollCount={rollCount}
          updateMoves={updateMoves}
        />
      </Board>
    </GameViewWrapper>
  );
};

export default GameView;

GameView.propTypes = {
  extremeDifficulty: PropTypes.bool,
  sequenceGame: PropTypes.bool
};
