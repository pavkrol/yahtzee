import React from "react";
import styled from "styled-components";
import Highscores from "../components/Highscores";

const HighscoresViewWrapper = styled.section`
  width: 100%;
  min-height: 100vh;
  background: radial-gradient(50% 50% at 50% 50%, #1e5c94 0%, #223b52 100%);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HighscoresView = ({ startAgain }) => {
  return (
    <HighscoresViewWrapper>
      <Highscores startAgain={startAgain} />
    </HighscoresViewWrapper>
  );
};

export default HighscoresView;
