import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

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
  margin-bottom: 20px;
`;

const Button = ({ height, width, children, action }) => {
  return (
    <ButtonWrapper onClick={action} height={height} width={width}>
      {children}
    </ButtonWrapper>
  );
};

export default Button;

Button.propTypes = {
  height: PropTypes.string,
  width: PropTypes.string,
  action: PropTypes.func
};

Button.defaultProps = {
  height: "50px",
  width: "150px"
};
