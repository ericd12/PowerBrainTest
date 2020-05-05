import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const TracksTableRow = ({ trackNumber, trackName, _id, deleteTrack }) => {
  return (
    <tr>
      <td>{trackNumber}</td>
      <td>{trackName}</td>
      <td style={{ whiteSpace: "nowrap" }}>
        <Link to={`/tracks/edit/${_id}`}>
          <Button size="sm" variant="outline-warning">
            edit
          </Button>
        </Link>
        <span> | </span>
        <Button
          onClick={() => {
            deleteTrack(_id);
          }}
          size="sm"
          variant="outline-danger"
        >
          delete
        </Button>
      </td>
    </tr>
  );
};

export default TracksTableRow;
