import React from "react";
import Modal from "react-modal";
import styled from "styled-components";

Modal.setAppElement("#root");

const CloseBtnCtn = styled.div`
  display: flex;
`;

const CloseBtn = styled.button`
  height: 40px;
  width: 35px;
  font-size: 20px;
  color: #031d2c;
  border: none;
  border-radius: 25px;
`;

const ItemTitle = styled.h1`
  flex: 1 90%;
`;

const Window = ({ show, onClose, item }) => {
  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <CloseBtnCtn>
        <ItemTitle>{item.title}</ItemTitle>
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </CloseBtnCtn>
      <div>
        <h2>Description</h2>
        <p>{item.content}</p>
        <h2>Status</h2>
        <p>
          {item.icon}{" "}
          {`${item.status.charAt(0).toUpperCase()}${item.status.slice(1)}`}
        </p>
      </div>
    </Modal>
  );
};

export default Window;
