import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { Card, ListGroup } from "react-bootstrap";
import Task from "./Task";

const StyledColumnWrap = styled(Card)`
  /* border-radius: 4px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  font-size: 90%; */
  height: 35vh;
  /* margin-right: 5vh;
  margin-top: 1vh;
  margin: 8px 0px;
  padding: 8px;
  transition: background-color 0.1s ease 0s;
  user-select: none; */
`;

const Column = ({ id, name, items }) => {
  return (
    <StyledColumnWrap>
      <Card.Header>{name}</Card.Header>
      <Droppable key={id} direction="horizontal" droppableId={id}>
        {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => {
          return (
            <ListGroup
              {...{ ...droppableProps }}
              ref={innerRef}
              style={{
                overflowY: "scroll",
                backgroundColor: `${isDraggingOver ? "lightblue" : "white"}`,
              }}
            >
              {items.map((task, index) => {
                return <Task {...{ ...task, index, key: task._id }} />;
              })}
              {placeholder}
            </ListGroup>
          );
        }}
      </Droppable>
    </StyledColumnWrap>
  );
};

export default Column;
