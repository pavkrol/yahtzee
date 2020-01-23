import React from "react";
import styled, { keyframes } from "styled-components";

const motion = props => keyframes`
  0% {
      transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Wrapper = styled.div`
  display: flex;
  position: relative;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const RingSpinner = styled.div`
  box-sizing: border-box;
  display: block;
  position: absolute;
  width: ${props => `${props.size}${props.sizeUnit}`};
  height: ${props => `${props.size}${props.sizeUnit}`};
  margin: 6px;
  border: 6px solid ${props => props.color};
  border-radius: 50%;
  animation: ${props => motion(props)} 1.2s cubic-bezier(0.5, 0, 0.5, 1)
    infinite;
  border-color: ${props => props.color} transparent transparent transparent;
  :nth-child(1) {
    animation-delay: -0.45s;
  }
  :nth-child(2) {
    animation-delay: -0.3s;
  }
  :nth-child(3) {
    animation-delay: -0.15s;
  }
`;

const Loader = ({ color, size, sizeUnit }) => (
  <Wrapper>
    <RingSpinner color={color} size={size} sizeUnit={sizeUnit} />
  </Wrapper>
);

Loader.defaultProps = {
  size: 50,
  color: "#E2F1FF",
  sizeUnit: "px"
};

export default Loader;
