import React, { Component } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import { Row } from "react-bootstrap";
import Column from "./TracksBoard/Column";
import TrackForm from "./TrackForm";
import { StyledContainer } from "../../styles";
import { API_URL } from "../../constants";

class ManageTrack extends Component {
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
    const { id } = this.props.match.params;
    axios.get(`http://localhost:5000/tracks/${id}`).then(response => {
      console.log({ response });
      this.setState(oldState => {
        console.log({ oldState });
        oldState.columns["column-2"].items = response.data.trackInfo;
        return {
          ...oldState,
          ...response.data,
        };
      });
    });

    const tracksPromise = axios
      .get(`http://localhost:5000/tracks/${id}`)
      .then(response => {
        return response.data;
      });

    const elementsPromise = axios.get(`${API_URL}/elements/`).then(response => {
      return response.data;
    });

    Promise.all([tracksPromise, elementsPromise]).then(data => {
      const tracks = data[0];
      const elements = data[1];

      this.setState(oldState => {
        oldState.columns["column-1"].items = elements.reduce((all, one) => {
          const test = tracks.trackInfo.find(item => item._id === one._id);
          if (!test) {
            all.push(one);
          }
          return all;
        }, []);
        oldState.columns["column-2"].items = tracks.trackInfo;
        return {
          ...oldState,
          ...tracks,
          // trackInfo: response.data.trackInfo
        };
      });
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { trackNumber, trackName, columns } = this.state;
    const track = {
      trackNumber,
      trackName,
      trackInfo: columns["column-2"].items,
    };

    axios.post(`http://localhost:5000/tracks/update/${id}`, track).then(res => {
      const { history } = this.props;
      console.log(res.data);
      console.log(track);
      alert("updated");
      history.push("/tracks");
    });
  };

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { columns } = this.state;

    return (
      <StyledContainer fluid title="Update Track">
        <TrackForm
          {...this.state}
          buttonText="Update Track"
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
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
              return <Column {...{ ...column, id, key: id }} />;
            })}
          </Row>
        </DragDropContext>
      </StyledContainer>
    );
  }
}

export default ManageTrack;
