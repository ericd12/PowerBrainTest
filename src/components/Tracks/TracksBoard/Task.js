import React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Table, Card } from "react-bootstrap";
import styled from "styled-components";

const TrackTable = styled(Table)`
  table-layout: fixed;
  white-space: nowrap;
  background-color: white;
  th,
  td {
    padding: 2px;
    border-style: hidden !important;
  }
`;

const ElementCard = styled(Card)`
  margin: 2px;
  padding: 10px;
`;

const Task = ({
  _id,
  elementCategory,
  elementCogRating,
  elementDescription,
  elementDuration,
  elementFormat,
  elementLabel,
  elementLink,
  elementMarket,
  elementNumber,
  elementPhysRating,
  elementSubCategory,
  index,
}) => {
  return (
    <Draggable draggableId={_id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }, { isDragging }) => (
        <ElementCard
          style={{
            backgroundColor: `${isDragging ? "lightgreen" : "white"}`,
          }}
          {...{ ...draggableProps, ...dragHandleProps, isDragging }}
          ref={innerRef}
        >
          <TrackTable>
            <thead>
              <tr>
                <th>Number: {elementNumber}</th>
                <th>Label: {elementLabel}</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Description: {elementDescription}</td>
              </tr>
              <tr>
                <td>Format: {elementFormat}</td>
                <td>Time: {elementDuration}</td>
                <td>Category: {elementCategory}</td>
              </tr>
              <tr>
                <td>SubCategory: {elementSubCategory}</td>
                <td>{elementMarket}</td>
                <td>Cog Rating: {elementCogRating}</td>
                <td>Phys Rating: {elementPhysRating}</td>
              </tr>
              <tr>
                <td>{elementLink}</td>
              </tr>
            </tbody>
          </TrackTable>
        </ElementCard>
      )}
    </Draggable>
  );
};

export default Task;
