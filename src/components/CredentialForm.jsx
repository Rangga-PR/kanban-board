import React, { useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import styled from "styled-components";
import { colors } from "../styles/variable";

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
  background-color: transparent;

  &:hover {
    cursor: pointer;
  }
`;

const ItemTitle = styled.h1`
  flex: 1 90%;
`;

const InputEl = styled.input`
  border: none;
  border-bottom: solid 1px black;
  padding: 5px;

  &:focus {
    outline: none;
  }
`;

const FormCtn = styled.div`
  display: flex;
  flex-direction: column;
  padding-bottom: 20px;
`;

const SubmitBtn = styled.button`
  margin-top: 10px;
  width: 22%;
  padding: 2%;
  align-self: center;
  background-color: ${colors.backgroundColor};
  border: none;
  color: white;
  font-weight: bolder;
  border-radius: 3px;

  &:hover {
    cursor: pointer;
  }
`;

const CredentialForm = ({ show, onClose, submit, signIn }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignIn = () => {
    axios
      .post("https://cryptic-hamlet-96074.herokuapp.com/signin", null, {
        params: {
          username,
          password,
        },
      })
      .then((res) => {
        submit({
          username: res.data.result.username,
          id: res.data.result.id,
        });

        setUsername("");
        setPassword("");
        onClose();
      })
      .catch((err) => {
        alert("failed to sign up");
      });
  };

  const handleSignUp = () => {
    axios
      .post("https://cryptic-hamlet-96074.herokuapp.com/signup", {
        username,
        password,
      })
      .then((res) => {
        submit({
          username: username,
          id: res.data.result.new_user_id,
        });

        setUsername("");
        setPassword("");
        onClose();
      })
      .catch((err) => {
        alert("failed to sign up");
      });
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"credential-modal"}
      overlayClassName={"overlay"}
    >
      <CloseBtnCtn>
        <ItemTitle>{signIn ? "Sign In" : "Sign Up"}</ItemTitle>
        <CloseBtn onClick={onClose}>
          <i className="material-icons">close</i>
        </CloseBtn>
      </CloseBtnCtn>
      <FormCtn>
        <h2>Username</h2>
        <InputEl type="text" value={username} onChange={handleUsernameChange} />
        <h2>Password</h2>
        <InputEl
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        {signIn ? (
          <SubmitBtn onClick={handleSignIn}>Sign In</SubmitBtn>
        ) : (
          <SubmitBtn onClick={handleSignUp}>Sign Up</SubmitBtn>
        )}
      </FormCtn>
    </Modal>
  );
};

export default CredentialForm;
