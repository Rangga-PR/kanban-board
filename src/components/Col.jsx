import React from "react";
import styled from "styled-components";
import { colors } from "../styles/variable";

const Column = styled.div`
  background-color: ${colors.highlightColor};
  opacity: 0.1;
`;

const Col = ({ isOver, children }) => {
  const className = isOver ? " highlight-region" : "";

  if (isOver) return <Column className={`col ${className}`}>{children}</Column>;
  else return <div>{children}</div>;
};

export default Col;
