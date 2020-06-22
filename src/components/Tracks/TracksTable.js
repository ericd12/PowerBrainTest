import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import TracksTableRow from "./TracksTableRow";
import { CoolTableHead, StyledContainer } from "../../styles";
import ComponentWrapper from "../ComponentWrapper";
import { API_URL } from "../../constants";

class TracksTable extends Component {
  constructor(props) {
    super(props);
    this.state = { trackInfo: [] };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/tracks/`)
      .then(response => {
        this.setState({ trackInfo: response.data });
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
          trackInfo: prev.trackInfo.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { trackInfo } = this.state;
    return (
      <StyledContainer fluid title="Tracks">
        <Table hover>
          <thead style={{borderBottom: "2px solid white"}}> 
            <tr>
              <CoolTableHead width="200">Track #</CoolTableHead>
              <CoolTableHead width="200">Track Name</CoolTableHead>
              <CoolTableHead>Slide Data</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
            </tr>
          </thead>
          <tbody>
            {trackInfo.map(currentTrack => {
              // console.log(currentTrack)
              return (
                <TracksTableRow
                  key={currentTrack._id}
                  deleteTrack={this.deleteTrack}
                  info={currentTrack}
                  {...currentTrack}
                />
              );
            })}
          </tbody>
        </Table>
      </StyledContainer>
    );
  }
}

export default TracksTable;
