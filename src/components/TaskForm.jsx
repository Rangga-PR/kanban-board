import React, { useState } from "react";
import Modal from "react-modal";
import styled from "styled-components";
import { colors } from "../styles/variable";
import Axios from "axios";

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
  width: 500px;
  padding: 5px;

  &:focus {
    outline: none;
  }
`;

const TextAreaEl = styled.textarea`
  border: solid 1px black;
  padding: 5px;

  &:focus {
    outline: none;
  }
`;

const FormCtn = styled.div`
  display: flex;
  flex-direction: column;
`;

const CreateBtn = styled.button`
  margin-top: 10px;
  width: 22%;
  padding: 2%;
  align-self: center;
  background-color: ${colors.backgroundColor};
  border: none;
  color: white;
  font-weight: bolder;

  &:hover {
    cursor: pointer;
  }
`;

const TaskForm = ({ show, onClose, submit, edit, item }) => {
  const [title, setTitle] = useState(item ? item.title : "");
  const [content, setContent] = useState(item ? item.content : "");

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleContentChange = (event) => {
    setContent(event.target.value);
  };

  const handleSubmit = (event) => {
    const userId = localStorage.getItem("user_id");
    if (userId) {
      Axios.post(`https://cryptic-hamlet-96074.herokuapp.com/task`, {
        user_id: userId,
        title,
        content,
        icon: "⭕️",
        status: "to do",
      })
        .then((res) => {
          submit({ title, content, id: res.data.result.newTaskID });
        })
        .catch((err) => {
          alert(
            "failed to create task, your board might be unsync with our database"
          );
          submit({ title, content });
        });
    } else {
      submit({ title, content });
    }

    setTitle("");
    setContent("");
    onClose();
  };

  const handleEdit = (event) => {
    edit({ title, content });
    onClose();
  };

  return (
    <Modal
      isOpen={show}
      onRequestClose={onClose}
      className={"modal"}
      overlayClassName={"overlay"}
    >
      <CloseBtnCtn>
        <ItemTitle>{item ? "EDIT TASK" : "ADD NEW TASK"}</ItemTitle>
        <CloseBtn onClick={onClose}>
          <i className="material-icons">close</i>
        </CloseBtn>
      </CloseBtnCtn>
      <FormCtn>
        <h2>Title</h2>
        <InputEl type="text" value={title} onChange={handleTitleChange} />
        <h2>Description</h2>
        <TextAreaEl
          name="description"
          id="description"
          rows="10"
          value={content}
          onChange={handleContentChange}
        ></TextAreaEl>
        {edit ? (
          <CreateBtn onClick={handleEdit}>Edit</CreateBtn>
        ) : (
          <CreateBtn onClick={handleSubmit}>Create</CreateBtn>
        )}
      </FormCtn>
    </Modal>
  );
};

export default TaskForm;
