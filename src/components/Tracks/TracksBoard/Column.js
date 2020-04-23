import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { Card, ListGroup } from "react-bootstrap";
import Task from "./Task";

const StyledColumnWrap = styled(Card)`
  align-items: stretch;
  border-radius: 4px;
  border: 1px solid lightgrey;
  display: flex;
  flex-direction: column;
  font-size: 90%; 
  height: 73vh;
  margin-right: 5vh;
  margin-top: 1vh;
  width: 50vh; 
`;

const StyledTaskList = styled(ListGroup)`	
  align-items: stretch;	
  background-color: ${props => (props.isDraggingOver ? "lightblue" : "white")};	
  flex-grow: 1;	
  overflow-x: scroll;	
  padding: 8px;	
`;
const Column = ({ id, name, items }) => {
  return (
    <StyledColumnWrap>
      <Card.Header>{name}</Card.Header>
      <Droppable key={id} droppableId={id}>
        {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => {
          return (
            <StyledTaskList
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
            </StyledTaskList>
          );
        }}
      </Droppable>
    </StyledColumnWrap>
  );
};

export default Column;
