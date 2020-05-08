import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import TracksTableRow from "./TracksTableRow";
import { CoolTableHead } from "../../styles";
import ComponentWrapper from "../ComponentWrapper";
import { API_URL } from "../../constants";

class TracksTable extends Component {
  constructor(props) {
    super(props);
    this.state = { trackinfo: [] };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/tracks/`)
      .then(response => {
        this.setState({ trackinfo: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteTrack = id => {
    axios.delete(`http://localhost:5000/tracks/${id}`).then(response => {
      console.log(response.data);
      alert("deleted");
      this.setState(prev => {
        return {
          trackinfo: prev.trackinfo.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { trackinfo } = this.state;
    return (
      <ComponentWrapper title="Tracks">
        <Table hover>
          <thead>
            <tr>
              <CoolTableHead>Track #</CoolTableHead>
              <CoolTableHead>Track Name</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
            </tr>
          </thead>
          <tbody>
            {trackinfo.map(currentTrack => {
              return (
                <TracksTableRow
                  key={currentTrack._id}
                  deleteTrack={this.deleteTrack}
                  {...currentTrack}
                />
              );
            })}
          </tbody>
        </Table>
      </ComponentWrapper>
    );
  }
}

export default TracksTable;
