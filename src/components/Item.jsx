import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
import TaskForm from "./TaskForm";
import itemType from "../constant";
import styled from "styled-components";

const ItemCtn = styled.div`
  font-size: 15px;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  z-index: 1;
  background-color: white;

  &:hover {
    cursor: pointer;
  }
`;

const ColorBar = styled.div`
  width: 40px;
  height: 10px;
  border-radius: 5px;
  background-color: ${(props) => (props.status ? props.status.color : "")};
`;

const ItemTitle = styled.p`
  font-weight: 600;
  font-size: 16px;
`;

const ItemIcon = styled.p`
  text-align: right;
  margin: 0 3px 0 0;
`;

const ItemMenu = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MenuIcon = styled.i`
  margin-left: 8px;
`;

const Item = ({ item, index, moveItem, status, onDel, onEdit }) => {
  const ref = useRef(null);

  const [, drop] = useDrop({
    accept: itemType,
    hover(item, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoveredRect = ref.current.getBoundingClientRect();
      const hoverMiddleY = (hoveredRect.bottom - hoveredRect.top) / 2;
      const mousePosition = monitor.getClientOffset();
      const hoverClientY = mousePosition.y - hoveredRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }

      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    item: { type: itemType, ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  const [show, setShow] = useState(false);
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  drag(drop(ref));

  const [showEdit, setShowEdit] = useState(false);
  const onShowEditOpen = (event) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();
    setShowEdit(true);
  };
  const onShowEditClose = () => setShowEdit(false);

  const handleDelete = (event) => {
    onDel({ id: item.id, idx: index });
  };

  const handleEditedTask = (editedTask) => {
    onEdit({ editedTask, index });
  };

  return (
    <>
      <ItemCtn ref={ref} style={{ opacity }} onClick={onOpen}>
        <ColorBar style={{ backgroundColor: status.color }} />
        <ItemTitle>{item.content}</ItemTitle>
        <ItemIcon>{item.icon}</ItemIcon>
        <ItemMenu>
          <MenuIcon className="material-icons" onClick={onShowEditOpen}>
            create
          </MenuIcon>
          <MenuIcon className="material-icons" onClick={handleDelete}>
            delete
          </MenuIcon>
        </ItemMenu>
      </ItemCtn>
      <Window item={item} onClose={onClose} show={show} />
      <TaskForm
        item={item}
        onClose={onShowEditClose}
        show={showEdit}
        edit={handleEditedTask}
      />
    </>
  );
};

export default Item;
