import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import FormatsTableRow from "./FormatsTableRow";
import { CoolTableHead } from "../../../../styles";

class FormatList extends Component {
  constructor(props) {
    super(props);
    this.state = { formats: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/formats/")
      .then(response => {
        this.setState({ formats: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteFormat = id => {
    axios.delete(`http://localhost:5000/formats/${id}`).then(response => {
      console.log(response.data);
      alert("deleted");
      this.setState(prev => {
        return {
          formats: prev.formats.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { formats } = this.state;
    return (
      <div style={{marginTop: '5vh'}}>
        <h3>Manage Formats</h3>
        <Table>
          <thead>
            <tr>
              <CoolTableHead>Name</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
            </tr>
          </thead>
          <tbody>
            {formats.map(currentFormat => {
              return (
                <FormatsTableRow
                  key={currentFormat._id}
                  deleteFormat={this.deleteFormat}
                  {...currentFormat}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default FormatList;
