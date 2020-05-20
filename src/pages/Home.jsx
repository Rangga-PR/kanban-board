import React, { useState, useCallback, useEffect } from "react";
import update from "immutability-helper";
import Item from "../components/Item";
import DropWrapper from "../components/DropWrapper";
import Col from "../components/Col";
import { data, statuses } from "../data";
import styled from "styled-components";
import { colors } from "../styles/variable";

const Row = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
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

const Home = () => {
  const [items, setItems] = useState(data);
  useEffect(() => {
    console.log(items);
  }, [items]);

  const onDrop = (item, _, status) => {
    const mapping = statuses.find((si) => si.status === status);

    if (item.status !== status)
      setItems((prevState) => {
        const newItems = prevState
          .filter((i) => i.id !== item.id)
          .concat({ ...item, status, icon: mapping.icon }); //dont use concat maybe
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

  return (
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
                    />
                  ))}
              </Col>
            </DropWrapper>
          </ColWrapper>
        );
      })}
    </Row>
  );
};

export default Home;
