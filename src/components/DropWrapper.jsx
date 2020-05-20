import React from "react";
import { useDrop } from "react-dnd";
import itemType from "../constant";
import { statuses } from "../data";
import styled from "styled-components";

const DropWrapperCtn = styled.div`
  flex: 1 25%;
  width: 100%;
  height: 100%;
`;

const DropWrapper = ({ onDrop, children, status }) => {
  const [{ isOver }, drop] = useDrop({
    accept: itemType,
    canDrop: (item) => {
      const itemIndex = statuses.findIndex((si) => si.status === item.status);
      const statusIndex = statuses.findIndex((si) => si.status === status);
      return [itemIndex + 1, itemIndex - 1, itemIndex].includes(statusIndex);
    },
    drop: (item, monitor) => {
      onDrop(item, monitor, status);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  });

  return (
    <DropWrapperCtn ref={drop}>
      {React.cloneElement(children, { isOver })}
    </DropWrapperCtn>
  );
};

export default DropWrapper;
