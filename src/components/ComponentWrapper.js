import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";

const ComponentWrapper = ({ children, title, style }) => {
  return (
    <Container style={style}>
      <h3>{title}</h3>
      {children}
    </Container>
  );
};

ComponentWrapper.propTypes = {
  styled: PropTypes.shape,
};

ComponentWrapper.defaultProps = {
  styled: {},
};

export default ComponentWrapper;
