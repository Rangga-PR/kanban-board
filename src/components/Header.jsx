import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const HeaderTitle = styled.p`
  background-color: #054f7c;
  padding: 20px;
  color: white;
  font-size: 30px;
  flex: 1 100%;
  margin-top: 0;
  text-align: center;
`;

const Header = () => {
  return (
    <Row>
      <HeaderTitle>Kanban Board 🗂</HeaderTitle>
    </Row>
  );
};

export default Header;
