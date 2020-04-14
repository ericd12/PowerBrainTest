import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./task";

const Container = styled.div`
  border-radius: 4px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  height: 73vh;
  font-size: 90%;
  margin-top: 1vh;
  margin-right: 5vh;
  width: 30%;
  align-items: stretch;
  float: left;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  background-color: ${props => (props.isDraggingOver ? "lightblue" : "white")};
  flex-grow: 1;
  padding: 8px;
  overflow-y: scroll;
  align-items: stretch;
`;

const Column = ({ id, name, items }) => {
  return (
    <Container>
      <Title>{name}</Title>
      <Droppable key={id} droppableId={id}>
        {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => {
          return (
            <TaskList {...{ ...droppableProps, isDraggingOver }} ref={innerRef}>
              {items.map((task, index) => {
                return <Task {...{ ...task, index, key: task._id }} />;
              })}
              {placeholder}
            </TaskList>
          );
        }}
      </Droppable>
    </Container>
  );
};

export default Column;
