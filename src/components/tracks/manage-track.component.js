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
    .then((response) => {
      console.log({ response });
      this.setState((oldState) => {
        console.log({ oldState });
        oldState.columns["column-2"].items = response.data.trackinfo;
        return {
          ...oldState,
          ...response.data,
          // trackinfo: response.data.trackinfo
        };
      });
    });
  
  const tracksPromise = axios
    .get(`http://localhost:5000/tracks/${this.props.match.params.id}`)
    .then((response) => {
      return response.data;
    });
  
  const elementsPromise = axios
    .get("http://localhost:5000/elements/")
    .then((response) => {
      return response.data;
    });
  
  Promise.all([tracksPromise, elementsPromise]).then((data) => {
    const tracks = data[0];
    const elements = data[1];
  
    this.setState((oldState) => {
      oldState.columns["column-1"].items = elements.reduce((all, one) => {
        const test = tracks.trackinfo.find((item) => item._id === one._id);
        if (!test) {
          all.push(one);
        }
        return all;
      }, []);
      oldState.columns["column-2"].items = tracks.trackinfo;
      return {
        ...oldState,
        ...tracks,
  
        // trackinfo: response.data.trackinfo
      };
    });
  });
  


      // axios.get("http://localhost:5000/elements/").then(response => {
      //   this.setState(prev => {
      //     const copy = { ...prev };
      //     const { columns } = copy;
      //     copy.elements = response.data;
  
      //     // const [firstColumnId] = Object.keys(columns);
  
      //     columns["column-1"].items = [
      //       ...copy.columns["column-1"].items,
      //       ...response.data,
      //     ];
  
      //     return copy;
      //   });
      // });
  }

  onChangeTrackNumber = e => {
    this.setState({
      trackNumber: e.target.value,
    });
  };

  onChangeTrackName = e => {
    this.setState({
      trackName: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const { trackNumber, trackName } = this.state;

    const track = {
      trackNumber,
      trackName,
      trackinfo: this.state.columns["column-2"].items
    };

    axios
      .post(
        `http://localhost:5000/tracks/update/${this.props.match.params.id}`,
        track
      )
      .then(res => {
        console.log(res.data);
        console.log(track);
        alert("updated");
        window.location = '../';
      });
  };

  render() {
    const { trackNumber, trackName, columns, trackinfo } = this.state;
    console.log(this.state, 'tes')
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
                    value={trackNumber}
                  />
                </div>
                <div className="form-group col">
                  <label htmlFor="name">Name</label>
                  <input
                    className="form-control"
                    onChange={this.onChangeTrackName}
                    placeholder="add name"
                    type="text"
                    value={trackName}
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
              {Object.entries(columns).map(([id, column]) => {
                return <Column {...{ ...column, id, key: id }} />;
              })}
            </DragDropContext>
          </Form>
        </Container>
      </div>
    );
  }
}
