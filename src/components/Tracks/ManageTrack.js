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
      trackInfo: [],
      elements: [],
      elementsEnums: {},
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
    // axios.get(`${API_URL}/tracks/${id}`).then(response => {
    //   console.log({ response });
    //   this.setState(oldState => {
    //     const state = { ...oldState };
    //     state.columns["column-2"].items = response.data.trackInfo;
    //     return {
    //       ...state,
    //       ...response.data,
    //     };
    //   });
    // });

    Promise.all([
      axios.get(`${API_URL}/tracks/${id}`).then(response => {
        return response.data;
      }),
      axios.get(`${API_URL}/elements/`).then(response => {
        return response.data;
      }),
    ]).then(([tracks, elements]) => {
      const elementsEnums = elements.reduce((all, one) => {
        return {
          ...all,
          [one._id]: one,
        };
      }, {});

      console.log({ tracks, elements, elementsEnums });

      this.setState(oldState => {
        const state = { ...oldState };
        // state.columns["column-1"].items = elements.reduce((all, one) => {
        //   const test = tracks.trackInfo.find(id => id === one._id);
        //   if (!test) {
        //     all.push(one);
        //   }
        //   return all;
        // }, []);

        // state.columns["column-2"].items = tracks.trackInfo
        return {
          ...state,
          ...tracks,
          elementsEnums,
          elements,
          // trackInfo: response.data.trackInfo
        };
      });
    });
  }

  onSubmit = e => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { trackNumber, trackName, trackInfo, columns } = this.state;
    const track = {
      trackNumber,
      trackName,
      trackInfo,
      // trackInfo: columns["column-2"].items,
    };

    axios.put(`${API_URL}/tracks/update/${id}`, track).then(res => {
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
    const { columns, elementsEnums, elements, trackInfo, ...rest } = this.state;
    const col1 = columns["column-1"];
    const col2 = columns["column-2"];
    console.log({ col2, trackInfo, rest });
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
            const { droppableId: sourceId, index: sourceIndex } = source;
            const {
              droppableId: destinationId,
              index: destinationIndex,
            } = destination;

            if (sourceId !== destinationId) {
              this.setState(prev => {
                const sourceColumn = prev.columns[sourceId];
                const destColumn = prev.columns[destinationId];
                const sourceItems = [...sourceColumn.items];
                const destItems = [...destColumn.items];

                console.log({ source, destination, sourceItems, destItems });

                const [removed] = sourceItems.splice(source.index, 1);

                destItems.splice(destination.index, 0, removed);
                return {
                  ...prev,
                  columns: {
                    ...prev.columns,
                    [sourceId]: {
                      ...sourceColumn,
                      items: sourceItems,
                    },
                    [destinationId]: {
                      ...destColumn,
                      items: destItems,
                    },
                  },
                };
              });
            } else {
              this.setState(prev => {
                const column = prev.columns[sourceId];
                const copiedItems = [...column.items];
                const [removed] = copiedItems.splice(source.index, 1);
                copiedItems.splice(destination.index, 0, removed);
                return {
                  ...prev,
                  columns: {
                    ...prev.columns,
                    [sourceId]: {
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
            {/* {Object.entries(columns).map(([id, column]) => {
              console.log({id, column})
              return <Column {...{ ...column, id, key: id, items: column.items.map(id => elementsEnums[id]) }} />;
            })} */}

            <Column
              {...{
                ...col1,
                id: "column-1",
                items: elements.reduce((all, one) => {
                  const test = trackInfo.find(id => id === one._id);
                  if (!test) {
                    all.push(one);
                  }
                  return all;
                }, []),
              }}
            />
            <Column
              {...{
                ...col2,
                id: "column-2",
                items: trackInfo.map(id => elementsEnums[id]),
              }}
            />
          </Row>
        </DragDropContext>
      </StyledContainer>
    );
  }
}

export default ManageTrack;
