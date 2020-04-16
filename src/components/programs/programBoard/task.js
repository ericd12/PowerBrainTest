import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  margin-right: 2px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
  width: 25vh;
`;

const P = styled.p`
  margin: 2px 5px;
`;

const Task = ({ _id, elementCategory, index }) => {
  return (
    <Draggable draggableId={_id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
        <Container
          {...{ ...draggableProps, ...dragHandleProps, isDragging }}
          ref={innerRef}
        >
          <P>{_id}</P>
          <P>{elementCategory}</P>
          <P>{index}</P>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
