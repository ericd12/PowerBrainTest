import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import TracksTableRow from "./TracksTableRow";

class TracksList extends Component {
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
    const { trackinfo } = this.state;
    axios.delete(`http://localhost:5000/tracks/${id}`).then(response => {
      console.log(response.data);
      alert("deleted");
      this.setState({
        trackinfo: trackinfo.filter(el => el._id !== id),
      });
    });
  };

  render() {
    const { trackinfo } = this.state;
    return (
      <Container>
        <h3>Tracks</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Track #</th>
              <th>Track Name</th>
              <th>Actions</th>
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
        </table>
      </Container>
    );
  }
}

export default TracksList;
