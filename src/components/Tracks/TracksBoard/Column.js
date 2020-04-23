import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

const StyledColumnWrap = styled.div`
  align-items: stretch;
  border-radius: 4px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  float: left;
  font-size: 90%;
  height: 73vh;
  margin-right: 5vh;
  margin-top: 1vh;
  width: 30%;

  h3 {
    padding: 8px;
  }
`;

const StyledTaskList = styled.div`
  align-items: stretch;
  background-color: ${props => (props.isDraggingOver ? "lightblue" : "white")};
  flex-grow: 1;
  overflow-y: scroll;
  padding: 8px;
`;

const Column = ({ id, name, items }) => {
  return (
    <StyledColumnWrap>
      <h3>{name}</h3>
      <Droppable key={id} droppableId={id}>
        {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => {
          return (
            <StyledTaskList
              {...{ ...droppableProps, isDraggingOver }}
              ref={innerRef}
            >
              {items.map((task, index) => {
                return <Task {...{ ...task, index, key: task._id }} />;
              })}
              {placeholder}
            </StyledTaskList>
          );
        }}
      </Droppable>
    </StyledColumnWrap>
  );
};

export default Column;
