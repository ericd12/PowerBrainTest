import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Tracks = props => (
    <tr>
        <td>{props.track._id}</td>
        {/* <td>{props.track._id.trackinfo}</td> */}
        {/* <td>{props.track._id.trackinfo}</td> */}
        {/* {console.log(props.track._id)} */}
        <td>
            <Link to={"/tracks/edit/" + props.track.trackinfo._id}><button className="btn btn-sm btn-outline-warning">edit</button></Link> 
        </td>

    </tr>
)

export default class TracksList extends Component {
    constructor(props) {
        super(props);
        
        this.state = {trackinfo: []};
    }
    
    componentDidMount() {
    axios.get('http://localhost:5000/tracks/')
            .then(response => {
                this.setState({trackinfo: response.data})
                // console.log(this.state)
            })
            .catch((error) => {
                console.log(error);
            })
    }
    
    trackList() {
        return this.state.trackinfo.map(currentTrack => {
            console.log(currentTrack)
            return <Tracks track={currentTrack} key={currentTrack._id}/>;
        })
    }
    
      render() {
        return (
        <div>
            <h3>Tracks</h3>
            <table className="table">
                <thead className="thead-light">
                    <tr>
                        <th>Track</th>
                        <th id="actions">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { this.trackList() }
                </tbody>
            </table>
        </div>
        )
      }
    }