import React, { Component } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import { Container, Button, Row, Col } from "react-bootstrap";
import Column from "./ProgramBoard/Column";

export default class CreateProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tracks: [],
      columns: {
        "column-1": {
          name: "Track List",
          items: [],
        },
        "column-2": {
          name: "Program List",
          items: [],
        },
      },
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/tracks/").then(response => {
      this.setState(prev => {
        const copy = { ...prev };
        const { columns } = copy;
        copy.tracks = response.data;

        // const [firstColumnId] = Object.keys(columns);

        columns["column-1"].items = [
          ...copy.columns["column-1"].items,
          ...response.data,
        ];

        return copy;
      });
    });
  }

  createProgram = e => {
    e.preventDefault();
    const { columns } = this.state;

    axios
      .post("http://localhost:5000/programs/add", {
        programinfo: columns["column-2"].items,
      })
      .then(res => {
        console.log(res.data);
        this.setState(prev => {
          return {
            ...prev,
            columns: {
              "column-1": {
                name: "Track List",
                items: prev.tracks,
              },
              "column-2": {
                name: "Program List",
                items: [],
              },
            },
          };
        });
      });
  };

  render() {
    const { columns } = this.state;
    return (
      <Container>
        <h1>Create Program</h1>
        <Row>
          <Col>
            <Button
              onClick={this.createProgram}
              style={{ marginBottom: "16px" }}
              type="button"
              variant="primary"
            >
              Create Program
            </Button>
          </Col>
        </Row>
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
                  },
                };
              });
            } else {
              this.setState(prev => {
                const column = prev.columns[source.droppableId];
                const copiedItems = [...column.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                return {
                  ...prev,
                  columns: {
                    ...prev.columns,
                    [source.droppableId]: {
                      ...column,
                      items: copiedItems,
                    },
                  },
                };
              });
            }
          }}
        >
          <Row>
            {Object.entries(columns).map(([id, column]) => {
              return (
                <Col key={id}>
                  <Column {...{ ...column, id }} />
                </Col>
              );
            })}
          </Row>
        </DragDropContext>
      </Container>
    );
  }
}
