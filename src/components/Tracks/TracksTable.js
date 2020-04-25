import React, { Component } from "react";
import axios from "axios";
import { Table, Container } from "react-bootstrap";
import TracksTableRow from "./TracksTableRow";
import { CoolTableHead } from "../../styles";

class TracksTable extends Component {
  constructor(props) {
    super(props);
    this.state = { trackinfo: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/tracks/")
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
      <Container>
        <h3>Tracks</h3>
        <Table>
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
      </Container>
    );
  }
}

export default TracksTable;
