import React from "react";
import styled from "styled-components";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

const HeaderTitle = styled.p`
  background-color: #323232;
  color: white;
  font-size: 30px;
  flex: 1 100%;
  margin-top: 0;
  margin-bottom: 5px;
  text-align: center;
`;

const Header = ({ username }) => {
  return (
    <Row>
      <HeaderTitle>{`${
        username && username + "'s"
      } Kanban Board 🗂`}</HeaderTitle>
    </Row>
  );
};

export default Header;
