import React from "react";
import styled from "styled-components";

const WelcomeWrapper = styled.section`
  width: 100%;
  height: 100vh;
  background: radial-gradient(50% 50% at 50% 50%, #1e5c94 0%, #223b52 100%);
`;

const WelcomeScreen = () => {
  return <WelcomeWrapper></WelcomeWrapper>;
};

export default WelcomeScreen;
