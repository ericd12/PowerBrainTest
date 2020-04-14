import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
`;

const Tracks = props => (
  <tr>
    <td>{props.track.trackNumber}</td>
    <td>{props.track.trackName}</td>
    <td>
      <Link to={`/tracks/edit/${props.track._id}`}>
        <button className="btn btn-sm btn-outline-warning">edit</button>
      </Link>{" "}
      | {/* eslint-disable-next-line */}
            <button className="btn btn-sm btn-outline-danger" href="#" onClick={() => { props.deleteTrack(props.track._id) }}>delete</button>
    </td>
  </tr>
);

export default class TracksList extends Component {
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
    });
    alert("deleted");
    this.setState({
      trackinfo: trackinfo.filter(el => el._id !== id),
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
                <Tracks
                  key={currentTrack._id}
                  deleteTrack={this.deleteTrack}
                  track={currentTrack}
                />
              );
            })}
          </tbody>
        </table>
      </Container>
    );
  }
}
