import React from "./node_modules/react";
import styled from "./node_modules/styled-components";
import { Draggable } from "./node_modules/react-beautiful-dnd";

const Container = styled.div`
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};
  border-radius: 5px;
  border: 1px solid lightgrey;
  margin-bottom: 8px;
  margin-right: 2px;
  padding: 8px;
  width: 25vh;

  p {
    margin: 2px 5px;
  }
`;

const Task = ({ _id, elementCategory, index }) => {
  return (
    <Draggable draggableId={_id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
        <Container
          {...{ ...draggableProps, ...dragHandleProps, isDragging }}
          ref={innerRef}
        >
          <p>{_id}</p>
          <p>{elementCategory}</p>
          <p>{index}</p>
        </Container>
      )}
    </Draggable>
  );
};

export default Task;
