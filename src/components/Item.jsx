import React, { useState, useRef } from "react";
import { useDrag, useDrop } from "react-dnd";
import Window from "./Window";
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
`;

const Item = ({ item, index, moveItem, status }) => {
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

  const [, drag] = useDrag({
    item: { type: itemType, ...item, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [show, setShow] = useState(false);
  const onOpen = () => setShow(true);
  const onClose = () => setShow(false);

  drag(drop(ref));

  return (
    <>
      <ItemCtn ref={ref} onClick={onOpen}>
        <ColorBar style={{ backgroundColor: status.color }} />
        <ItemTitle>{item.content}</ItemTitle>
        <ItemIcon>{item.icon}</ItemIcon>
      </ItemCtn>
      <Window item={item} onClose={onClose} show={show} />
    </>
  );
};

export default Item;
