import React from "react";
import styled from "styled-components";

const Column = styled.div`
  background-color: yellow;
`;

const Col = ({ isOver, children }) => {
  const className = isOver ? " highlight-region" : "";

  if (isOver) return <Column className={`col${className}`}>{children}</Column>;
  else return <div>{children}</div>;
};

export default Col;
