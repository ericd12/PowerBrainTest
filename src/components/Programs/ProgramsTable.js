import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ProgramsTableRow from "./ProgramsTableRow";
import { CoolTableHead } from "../../styles";
import ComponentWrapper from "../ComponentWrapper";
import { API_URL } from "../../constants";

class ProgramsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { programInfo: [] };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/programs/`)
      .then((response) => {
        console.log(response.data);

        this.setState({ programInfo: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteProgram = (id) => {
    axios.delete(`http://localhost:5000/programs/${id}`).then((response) => {
      console.log(response.data);
      alert("deleted");
      this.setState((prev) => {
        return {
          programInfo: prev.programInfo.filter((el) => el._id !== id),
        };
      });
    });
  };

  render() {
    const { programInfo } = this.state;
    return (
      <ComponentWrapper title="Programs">
        <Table>
          <thead>
            <tr>
              <CoolTableHead>Program #</CoolTableHead>
              <CoolTableHead>Program Name</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
            </tr>
          </thead>
          <tbody>
            {programInfo.map((currentProgram) => {
              return (
                <ProgramsTableRow
                  key={currentProgram._id}
                  deleteProgram={this.deleteProgram}
                  {...currentProgram}
                />
              );
            })}
          </tbody>
        </Table>
      </ComponentWrapper>
    );
  }
}

export default ProgramsTable;
