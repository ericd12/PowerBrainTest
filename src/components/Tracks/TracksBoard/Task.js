import React from "react";
import styled from "styled-components";
import { Draggable } from "react-beautiful-dnd";

const TaskContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 5px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? "lightgreen" : "white")};

  p {
    display: inline-block;
    margin: 2px 10px 2px 5px;
  }
`;

const Task = ({
  _id,
  elementCategory,
  elementCogRating,
  elementDescription,
  elementDuration,
  elementFormat,
  elementlabel,
  elementLink,
  elementMarket,
  elementnumber,
  elementPhysRating,
  elementSubCategory,
  index,
}) => {
  return (
    <Draggable draggableId={_id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
        <TaskContainer
          {...{ ...draggableProps, ...dragHandleProps, isDragging }}
          ref={innerRef}
        >
          <p>{elementnumber}</p>
          <p>{elementlabel}</p>
          <p>Desc: {elementDescription}</p>
          <p>{elementFormat}</p>
          <p>Time: {elementDuration}</p>
          <p>{elementCategory}</p>
          <p>{elementSubCategory}</p>
          <p>{elementMarket}</p>
          <p>CogRating: {elementCogRating}</p>
          <p>PhysRating: {elementPhysRating}</p>
          <p>{elementLink}</p>
        </TaskContainer>
      )}
    </Draggable>
  );
};

export default Task;
