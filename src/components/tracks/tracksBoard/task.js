import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ListGroup } from "react-bootstrap";

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
        <ListGroup.Item
          style={{
            backgroundColor: `${isDragging ? "lightgreen" : "white"}`,
          }}
          {...{ ...draggableProps, ...dragHandleProps, isDragging }}
          ref={innerRef}
        >
          <ul>
            <li>{elementnumber}</li>
            <li>{elementlabel}</li>
            <li>Desc: {elementDescription}</li>
            <li>{elementFormat}</li>
            <li>Time: {elementDuration}</li>
            <li>{elementCategory}</li>
            <li>{elementSubCategory}</li>
            <li>{elementMarket}</li>
            <li>CogRating: {elementCogRating}</li>
            <li>PhysRating: {elementPhysRating}</li>
            <li>{elementLink}</li>
          </ul>
        </ListGroup.Item>
      )}
    </Draggable>
  );
};

export default Task;
