import axios from 'axios';
import '../../App.css';
import '@atlaskit/css-reset';
import styled from 'styled-components';
import Column from './tracksBoard/column';
import React, { Component} from "react";
import { DragDropContext } from "react-beautiful-dnd";
// import ReactDOM from "react-dom";

// import AddItemForm from "./AddItemForm";

const Container = styled.div`
  display: flex;
  justify-content: left;
  width: 95%;
  overflow: auto;
`;

export default class CreateTrack extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elements: [],
      columns: {
        "column-1": {
          name: "Elements",
          items: [],
        },
        "column-2": {
          name: "Track List",
          items: [],
        },
      },
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/elements/").then(response => {
      this.setState(prev => {
        const copy = { ...prev };
        const { columns } = copy;
        copy.elements = response.data;

        const [firstColumnId] = Object.keys(columns);

        columns["column-2"].items = [
          ...copy["column-2"].items,
          ...response.data,
        ];

        return copy;
      });
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const track = {
      trackname: this.state.columns["column-2"].items,
    };

    axios.post("http://localhost:5000/tracks/add", track).then(res => {
      console.log(res.data);
      this.setState(prev => {
        return {
          ...prev,
          "column-1": {
            name: "Elements",
            items: prev.elements,
          },
          "column-2": {
            name: "Track List",
            items: [],
          },
        };
      });
    });
  };

  render() {
    return (
      <div>
        <h1>Create Track</h1>

        <Container>
          <form onSubmit={this.onSubmit} /* id="createForm" */>
            <div className="form">
              <input
                className="btn btn-primary"
                type="submit"
                value="Create Track"
              />
            </div>

            <DragDropContext
              onDragEnd={({ source, destination }) => {
                if (!destination) {
                  return;
                }

                if (source.droppableId !== destination.droppableId) {
                  this.setState(prev => {
                    const sourceColumn = prev.columns[source.droppableId];
                    const destColumn = prev.columns[destination.droppableId];
                    const sourceItems = [...sourceColumn.items];
                    const destItems = [...destColumn.items];
                    const [removed] = sourceItems.splice(source.index, 1);
                    destItems.splice(destination.index, 0, removed);
                    return {
                      ...prev,
                      columns: {
                        ...prev.columns,
                        [source.droppableId]: {
                          ...sourceColumn,
                          items: sourceItems,
                        },
                        [destination.droppableId]: {
                          ...destColumn,
                          items: destItems,
                        },
                      }
                    };
                  });
                } else {
                  this.setState(prev => {
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
                    };
                  });
                }
              }}
            >
              {Object.entries(this.state.columns).map(([id, column]) => {
                return <Column {...{ ...column, id, key: id }} />;
              })}
            </DragDropContext>
          </form>
        </Container>
      </div>
    );
  }
}
