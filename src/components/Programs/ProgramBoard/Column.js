import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const Container = styled.div`
  border-radius: 4px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  font-size: 90%;
  height: 35vh;
  margin-right: 5vh;
  margin-top: 1vh;
  margin: 8px 0px;
  padding: 8px;
  transition: background-color 0.1s ease 0s;
  user-select: none;
`;

const Title = styled.h3`
  padding: 8px;
`;

const TaskList = styled.div`
  background-color: ${props => (props.isDraggingOver ? "lightblue" : "white")};
  display: flex;
  flex-grow: 1;
  height: 35vh;
  overflow-x: scroll;
  padding: 8px;
`;

const Column = ({ id, name, items }) => {
  return (
    <Container>
      <Title>{name}</Title>
      <Droppable key={id} direction="horizontal" droppableId={id}>
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
