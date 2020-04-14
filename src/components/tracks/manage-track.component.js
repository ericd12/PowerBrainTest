import React, { Component } from "react";
import axios from "axios";
import "@atlaskit/css-reset";
import styled from "styled-components";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./tracksBoard/column";

const Container = styled.div`
  width: 100%;
  overflow: inherit;
  margin-left: 3%;
`;
const Form = styled.form`
  width: 90%;
  margin-top: 1vh;
`;
const InputGroup = styled.div`
  width: 45%;
`;
const Button = styled.input`
  margin: 0 4px;
  margin-top: calc(1.5rem + 4px);
  height: calc(1.5em + 0.75rem + 2px);
  padding: 0.375rem 0.5rem;
  font-weight: 500;
  color: white;
`;
export default class ManageTrack extends Component {
  constructor(props) {
    super(props);

    this.onChangeTrackName = this.onChangeTrackName.bind(this);
    this.onChangeTrackNumber = this.onChangeTrackNumber.bind(this);

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
    axios
      .get(`http://localhost:5000/tracks/${this.props.match.params.id}`)
      .then(response => {
        this.setState({
          trackName: response.data.trackName,
          trackNumber: response.data.trackNumber,
        });
      });
  }

  onChangeTrackNumber(e) {
    this.setState({
      trackNumber: e.target.value,
    });
  }

  onChangeTrackName(e) {
    this.setState({
      trackName: e.target.value,
    });
  }

  onSubmit = e => {
    e.preventDefault();

    const track = {
      trackNumber: this.state.trackNumber,
      trackName: this.state.trackName,
      // trackinfo: this.state.columns["column-2"].items
    };

    axios
      .post(
        `http://localhost:5000/tracks/update/${this.props.match.params.id}`,
        track
      )
      .then(res => {
        console.log(res.data);
        console.log(track);

        this.setState({
          trackName: "",
          trackNumber: "",
          //   prev => {
          //   return {
          //     ...prev,
          //     columns: {
          //       "column-1": {
          //         name: "Elements",
          //         items: prev.elements,
          //       },
          //       "column-2": {
          //         name: "Track List",
          //         items: [],
          //       }
          //     },
          //   };
        });
      });
    // window.location = '../';
  };

  render() {
    return (
      <div>
        <Container>
          <h1>Update Track</h1>

          <Form id="submit-track" onSubmit={this.onSubmit}>
            <InputGroup>
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="number">Number</label>
                  <input
                    className="form-control"
                    onChange={this.onChangeTrackNumber}
                    placeholder="add number"
                    required
                    type="text"
                    value={this.state.trackNumber}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="name">Name</label>
                  <input
                    className="form-control"
                    onChange={this.onChangeTrackName}
                    placeholder="add name"
                    type="text"
                    value={this.state.trackName}
                  />
                </div>
                <Button
                  className="btn btn-primary"
                  form="submit-track"
                  type="submit"
                  value="Update Track"
                />
              </div>
            </InputGroup>

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
              {Object.entries(this.state.columns).map(([id, column]) => {
                return <Column {...{ ...column, id, key: id }} />;
              })}
            </DragDropContext>
          </Form>
        </Container>
      </div>
    );
  }
}
