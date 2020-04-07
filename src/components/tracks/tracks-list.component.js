import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;
`

const Tracks = props => (
    <tr>
        <td>{props.track.trackNumber}</td>
        <td>{props.track.trackName}</td>
        <td>
            <Link to={"/tracks/edit/" + props.track.trackinfo._id}><button className="btn btn-sm btn-outline-warning">edit</button></Link> | {/*eslint-disable-next-line */}            
            <button className="btn btn-sm btn-outline-danger" href="#" onClick={() => { props.deleteTrack(props.track._id) }}>delete</button> 
        </td>
    </tr>
)

export default class TracksList extends Component {
    constructor(props) {
        super(props);
    
        this.deleteTrack = this.deleteTrack.bind(this);
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
    
    deleteTrack(id) {
        axios.delete('http://localhost:5000/tracks/' + id)
          .then(response => { console.log(response.data)});
        alert('deleted');
        this.setState({
          trackinfo: this.state.trackinfo.filter(el => el._id !== id)
        })
    }

    trackList() {
        return this.state.trackinfo.map(currentTrack => {
            return <Tracks track={currentTrack} key={currentTrack._id} deleteTrack={this.deleteTrack}/>;
        })
    }
    
    
      render() {
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
                    { this.trackList() }
                </tbody>
            </table>
        </Container>
        )
      }
    }