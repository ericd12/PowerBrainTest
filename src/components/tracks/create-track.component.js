import axios from 'axios';
import '../../App.css';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import Column from './tracksBoard/column';
import React, { Component, useState, useEffect } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import ReactDOM from "react-dom";

// import AddItemForm from "./AddItemForm";
      
const Container = styled.div`
  display: flex;
  justify-content: left;
  width: 95%;
  
  `;


const CreateTrack = () => {
  const [columns, setColumns] = useState({
    "column-1": {
      name: "Elements",
      items: [],
    },
    "column-2": {
      name: "Track List",
      items: [],
    },
  });
        

  const onDragEnd = ({ source, destination }) => {
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      setColumns(prev => {
        const sourceColumn = prev[source.droppableId];
        const destColumn = prev[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        return {
          ...prev,
          [source.droppableId]: {
            ...sourceColumn,
            items: sourceItems,
          },
          [destination.droppableId]: {
            ...destColumn,
            items: destItems,
          },
        }
      });
    } else {
      setColumns(prev => {
        const column = prev[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        return {
          ...prev,
          [source.droppableId]: {
            ...column,
            items: copiedItems,
          },
        }
      });
    }
  }

  useEffect(() => {
    const getData = () => {
      axios.get("http://localhost:5000/elements/").then(response => {
        setColumns(prev => {
          const copy = { ...prev };
          const [firstColumnId] = Object.keys(copy);

          copy[firstColumnId].items = [
            ...copy[firstColumnId].items,
            ...response.data,
          ];
          return copy;
        });
      });
    };
    getData();
  }, []);

  console.log(columns)

  return (
    <Container>
      {/* <AddItemForm {...{ columns, setColumns }} /> */}
      {/* <Container> */}
        <DragDropContext
          onDragEnd={onDragEnd}
        >
          {Object.entries(columns).map(([id, column]) => {
            return <Column {...{ id, column, key: id }} />;
          })}
        </DragDropContext>
      {/* </Container> */}
    </Container>
  );
};


export default CreateTrack

      

      //             <ul id="list">
      //               <li>{i.elementnumber}</li>
      //               <li>{i.elementlabel}</li>                                  
      //               <li>{i.elementDescription}</li>
      //               <li>{i.elementFormat}</li>
      //               <li>{i.elementDuration}</li>
      //               <li>{i.elementCategory}</li>
      //               <li>{i.elementMarket}</li>
      //               <li>{i.elementCogRating}</li>
      //               <li>{i.elementPhysRating}</li>
      //               <li>{i.elementLink}</li>
      //             </ul>   