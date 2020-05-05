import React, { Component } from "react";
import axios from "axios";
import { DragDropContext } from "react-beautiful-dnd";
import Column from "./ProgramBoard/Column";
import ProgramForm from "./ProgramForm";
import { API_URL } from "../../constants";
import { StyledContainer } from "../../styles";

class ManageProgram extends Component {
  constructor(props) {
    super(props);
    this.state = {
      programName: "",
      programNumber: "",
      tracks: [],
      columns: {
        "column-1": {
          name: "Tracks",
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
    const { id } = this.props.match.params;
    axios.get(`http://localhost:5000/programs/${id}`).then((response) => {
      console.log({ response });
      this.setState((oldState) => {
        console.log({ oldState });
        oldState.columns["column-2"].items = response.data.programInfo;
        return {
          ...oldState,
          ...response.data,
        };
      });
    });

    const programsPromise = axios
      .get(`http://localhost:5000/programs/${id}`)
      .then((response) => {
        return response.data;
      });

    const tracksPromise = axios.get(`${API_URL}/tracks/`).then((response) => {
      return response.data;
    });

    Promise.all([programsPromise, tracksPromise]).then((data) => {
      const programs = data[0];
      const tracks = data[1];

      this.setState((oldState) => {
        oldState.columns["column-1"].items = tracks.reduce((all, one) => {
          const test = programs.programInfo.find(
            (item) => item._id === one._id
          );
          if (!test) {
            all.push(one);
          }
          return all;
        }, []);
        oldState.columns["column-2"].items = programs.programInfo;
        return {
          ...oldState,
          ...programs,
        };
      });
    });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const { id } = this.props.match.params;
    const { programNumber, programName, columns } = this.state;
    const program = {
      programNumber,
      programName,
      programinfo: columns["column-2"].items,
    };

    axios
      .post(`http://localhost:5000/programs/update/${id}`, program)
      .then((res) => {
        const { history } = this.props;
        console.log(res.data);
        console.log(program);
        alert("updated");
        history.push("/programs");
      });
  };

  onChange = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { columns } = this.state;

    return (
      <StyledContainer fluid title="Create Program">
        <ProgramForm
          {...this.state}
          buttonText="Update Program"
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
        <DragDropContext
          onDragEnd={({ source, destination }) => {
            if (!destination) {
              return;
            }

            if (source.droppableId !== destination.droppableId) {
              this.setState((prev) => {
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
              this.setState((prev) => {
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
      </StyledContainer>
    );
  }
}

export default ManageProgram;
