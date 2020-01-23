import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const ButtonWrapper = styled.button`
  font-size: 22px;
  font-family: "Share", sans-serif;
  text-align: center;
  padding: 0 15px;
  line-height: ${props => props.height};
  height: ${props => props.height};
  min-width: ${props => props.width};
  background: transparent;
  border: 1px solid
    ${props => (props.colorScheme === "inverted" ? "#000" : "#fff")};
  border-radius: 10px;
  margin-bottom: 20px;
  color: ${props => (props.colorScheme === "inverted" ? "#000" : "#fff")};
  transition: box-shadow 0.2s ease-in-out;
  :hover {
    box-shadow: 0px 0px 10px 0px
      ${props => (props.colorScheme === "inverted" ? "#B4B4B4" : "#fff")};
  }
`;

const Button = ({ height, width, children, action, colorScheme }) => {
  return (
    <ButtonWrapper
      onClick={action}
      height={height}
      width={width}
      colorScheme={colorScheme}
    >
      {children}
    </ButtonWrapper>
  );
};

export default Button;

Button.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  action: PropTypes.func,
  colorScheme: PropTypes.oneOf(["normal", "inverted"])
};

Button.defaultProps = {
  height: "50px",
  width: "150px",
  colorScheme: "normal"
};
