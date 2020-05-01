import React from "react";
import styled from "styled-components";
import { Droppable } from "react-beautiful-dnd";
import { Card, ListGroup, Col } from "react-bootstrap";
import Task from "./Task";

const StyledColumnWrap = styled(Card)`
  height: 35vh;
  margin-bottom: 20px;
  transition: background-color 0.1s ease 0s;
`;

const StyledTaskList = styled(ListGroup)`
  align-items: stretch;
  flex-grow: 1;
  font-size: 70%;
  overflow-x: scroll;
  padding: 8px;
  ul {
    padding-left: 16px;
  }
`;

const StyledCol = styled(Col)`
  flex-basis: auto;
`;


const Column = ({ id, name, items }) => {
  return (
    <StyledCol>
      <StyledColumnWrap>
        <Card.Header>{name}</Card.Header>
        <Droppable key={id} direction="horizontal" droppableId={id}>
          {({ droppableProps, innerRef, placeholder }, { isDraggingOver }) => {
            return (
              <StyledTaskList
                className='list-group-horizontal'
                {...{ ...droppableProps }}
                ref={innerRef}
                style={{
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
    </StyledCol>
  );
};

export default Column;
