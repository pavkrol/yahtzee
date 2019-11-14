import React from "react";
import styled from "styled-components";

const ButtonWrapper = styled.button`
  font-size: 22px;
  font-family: "Share", sans-serif;
  text-align: center;
  line-height: ${props => props.height};
  height: ${props => props.height};
  width: ${props => props.width};
  background: transparent;
  border: 1px solid #fff;
  border-radius: 10px;
`;

const Button = ({ height = "50px", width = "150px", children }) => {
  return (
    <ButtonWrapper height={height} width={width}>
      {children}
    </ButtonWrapper>
  );
};

export default Button;
