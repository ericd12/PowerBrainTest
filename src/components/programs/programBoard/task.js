import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { ListGroup } from "react-bootstrap";

const Task = ({ _id, elementCategory, index }) => {
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
          <ul
            {...{ ...draggableProps, ...dragHandleProps, isDragging }}
            ref={innerRef}
          >
            <li>{_id}</li>
            <li>{elementCategory}</li>
            <li>{index}</li>
          </ul>
        </ListGroup.Item>
      )}
    </Draggable>
  );
};

export default Task;
