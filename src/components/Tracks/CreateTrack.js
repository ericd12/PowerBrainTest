import React, { Component } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import { Container, Form, Col, Button, Row } from "react-bootstrap";
import Column from "./TracksBoard/Column";

class CreateTrack extends Component {
  constructor(props) {
    super(props);

    this.state = {
      trackName: "",
      trackNumber: "",
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

        columns["column-1"].items = [
          ...copy.columns["column-1"].items,
          ...response.data,
        ];

        return copy;
      });
    });
  }

  onChange = e => {
    const { id, value } = e.target;
    this.setState({
      [id]: value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { trackNumber, trackName, columns } = this.state;
    axios
      .post("http://localhost:5000/tracks/add", {
        trackNumber,
        trackName,
        trackinfo: columns["column-2"].items,
      })
      .then(res => {
        console.log(res.data);
        this.setState(prev => {
          return {
            ...prev,
            trackName: "",
            trackNumber: "",
            columns: {
              "column-1": {
                name: "Elements",
                items: prev.elements,
              },
              "column-2": {
                name: "Track List",
                items: [],
              },
            },
          };
        });
      });
  };

  render() {
    const { trackNumber, trackName, columns } = this.state;
    return (
      <Container>
        <h1>Create Track</h1>
        <Form id="submit-track" onSubmit={this.onSubmit}>
          <Form.Row
            style={{
              alignItems: "center",
            }}
          >
            <Form.Group as={Col} controlId="trackNumber">
              <Form.Label>Number</Form.Label>
              <Form.Control
                onChange={this.onChange}
                placeholder="add number"
                type="text"
                value={trackNumber}
              />
            </Form.Group>
            <Form.Group as={Col} controlId="trackName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                onChange={this.onChange}
                placeholder="add name"
                type="text"
                value={trackName}
              />
            </Form.Group>
            <Col>
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Col>
          </Form.Row>
        </Form>

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

export default CreateTrack;
