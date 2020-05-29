import React, { useState, useCallback, useEffect } from "react";
import axios from "axios";
import update from "immutability-helper";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import TaskForm from "../components/TaskForm";
import CredentialForm from "../components/CredentialForm";
import { statuses } from "../data";
import styled from "styled-components";
import { colors } from "../styles/variable";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 0 5% 2% 5%;
`;

const MenuWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 10px 0;

  &:hover {
    cursor: pointer;
  }
`;

const Icon = styled.i`
  font-size: 48px;
  color: ${colors.backgroundColor};
`;

const ColWrapper = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 25%;
  width: 25%;
  margin: 5px 10px;
  padding: 5px 10px;
  background-color: ${colors.backgroundColor};
  border-radius: 5px;
`;

const ColHeader = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: white;
  margin-bottom: 20px;
  margin-top: 0;
`;

const UserWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Btn = styled.button`
  background-color: #323232;
  color: white;
  border: none;
  height: 80%;
  font-weight: bolder;
  margin: 0 5px;
  padding: 0 20px;
  border-radius: 20px;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`;

const Home = ({ userChange }) => {
  const [items, setItems] = useState([]);
  const [userId, setUserId] = useState(localStorage.getItem("user_id"));

  const getUserTasks = () => {
    axios
      .get(
        `${process.env.REACT_APP_API_URI}/task/${localStorage.getItem(
          "user_id"
        )}`
      )
      .then((res) => {
        setItems(res.data.result.tasks);
      })
      .catch((err) => {
        alert("failed to get user's task");
      });
  };

  useEffect(() => {
    if (userId !== "") getUserTasks();
  }, [userId]);

  const onDrop = (item, _, status) => {
    const mapping = statuses.find((si) => si.status === status);

    if (userId) {
      axios
        .patch(`${process.env.REACT_APP_API_URI}/task/${item.id}`, {
          title: item.title,
          content: item.content,
          icon: mapping.icon,
          status: status,
        })
        .catch((err) =>
          alert(
            "failed to update task status, your board might not in sync with our database"
          )
        );
    }

    if (item.status !== status)
      setItems((prevState) => {
        const newItems = prevState
          .filter((i) => i.id !== item.id)
          .concat({ ...item, status, icon: mapping.icon });
        return [...newItems];
      });
  };

  const moveItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = items[dragIndex];
      setItems(
        update(items, {
          $splice: [
            [dragIndex, 1],
            [hoverIndex, 0, dragItem],
          ],
        })
      );
    },
    [items]
  );

  const [show, setShow] = useState(false);
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  const [showSignIn, setShowSignIn] = useState(false);
  const onOpenSignIn = () => setShowSignIn(true);
  const onCloseSignIn = () => setShowSignIn(false);

  const [showSignUp, setShowSignUp] = useState(false);
  const onOpenSignup = () => setShowSignUp(true);
  const onCloseSignUp = () => setShowSignUp(false);

  const createTask = (taskDesc) => {
    let taskmetaData = {};

    if (!taskDesc.id) {
      taskmetaData = {
        id: items.length + 1,
        icon: "⭕️",
        status: "to do",
      };
    } else {
      taskmetaData = {
        id: taskDesc.id,
        icon: "⭕️",
        status: "to do",
      };
    }

    const newTask = { ...taskDesc, ...taskmetaData };

    setItems(
      update(items, {
        $push: [newTask],
      })
    );
  };

  const deleteItem = (item) => {
    if (userId) {
      axios
        .delete(`${process.env.REACT_APP_API_URI}/task/${item.id}`)
        .catch((err) => {
          alert(
            "delete failed, your board might not in sync with our database"
          );
        });
    }

    setItems(
      update(items, {
        $splice: [[item.idx, 1]],
      })
    );
  };

  const editItem = (item) => {
    setItems(
      update(items, {
        [item.index]: {
          title: { $set: item.editedTask.title },
          content: { $set: item.editedTask.content },
        },
      })
    );
  };

  const onLoggedIn = (user) => {
    localStorage.setItem("user_id", user.id);
    setUserId(user.id);
    getUserTasks();
    userChange(user.username);
  };

  const handleSignOut = () => {
    localStorage.removeItem("user_id");
    setUserId("");
    userChange("");
    setItems([]);
  };

  return (
    <>
      <MenuWrapper>
        <Icon className="material-icons" onClick={onOpen}>
          add_circle
        </Icon>
        {!localStorage.getItem("user_id") ? (
          <UserWrapper>
            <Btn onClick={onOpenSignIn}>Sign In</Btn>
            <Btn onClick={onOpenSignup}>Sign Up</Btn>
          </UserWrapper>
        ) : (
          <UserWrapper>
            <Btn onClick={handleSignOut}>Sign Out</Btn>
          </UserWrapper>
        )}
        <CredentialForm
          onClose={onCloseSignIn}
          show={showSignIn}
          signIn
          submit={onLoggedIn}
        />
        <CredentialForm
          onClose={onCloseSignUp}
          show={showSignUp}
          submit={onLoggedIn}
        />
        <TaskForm onClose={onClose} show={show} submit={createTask} />
      </MenuWrapper>
      <Row>
        {statuses.map((s) => {
          return (
            <ColWrapper key={s.status}>
              <ColHeader>{s.status.toUpperCase()}</ColHeader>
              <DropWrapper onDrop={onDrop} status={s.status}>
                <Col>
                  {items
                    .filter((i) => i.status === s.status)
                    .map((i, idx) => (
                      <Item
                        key={i.id}
                        item={i}
                        index={idx}
                        moveItem={moveItem}
                        status={s}
                        onDel={deleteItem}
                        onEdit={editItem}
                      />
                    ))}
                </Col>
              </DropWrapper>
            </ColWrapper>
          );
        })}
      </Row>
    </>
  );
};

export default Home;
