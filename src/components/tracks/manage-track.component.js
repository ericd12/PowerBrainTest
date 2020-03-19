import React, { Component } from 'react';
import axios from 'axios';
// import Board from './board';
// import Card from './card';

export default class ManageTrack extends Component {
  constructor(props) {
    super(props);

    this.onChangeTrackName  = this.onChangeTrackName.bind(this);
    this.onSubmit           = this.onSubmit.bind(this);

    this.state = {
        trackinfo: '',
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/tracks/'+this.props.match.params.id)
      .then(response => {
        this.setState({
            trackinfo: response.data.trackinfo,
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeTrackName(e) {
    this.setState({
      trackinfo: e.target.value
    })
  }
  

  onSubmit(e) {
    e.preventDefault();

    const track = {
      trackinfo: this.state.trackinfo,
    }

    console.log(track);

    axios.post('http://localhost:5000/tracks/update/' + this.props.match.params.id, track)
      .then(res => console.log(res.data));
    alert('updated');
    window.location = '../';
  }

  render() {
    return (
    <div>
      {/* <main className='flexbox'>
        <Board id='board-1' className='board'>
          <Card id='card-1' className='card' draggable='true'>
            <p>Card one</p>
          </Card>
        </Board>
        <Board id='board-2' className='board'>
          <Card id='card-2' className='card' draggable='true'>
            <div>{this.state.trackinfo}</div>
          </Card>
        </Board>
      </main> */}
      
      
      {/* <div className="container">
        <h3>Manage Tracks</h3>
        <form onSubmit={this.onSubmit}>  
          <div className="form-group col">
            <label>Track Name</label>	
            <input type="text"
                required
                className="form-control"    
                placeholder="add name"           
                value = {this.state.trackinfo}
                onChange={this.onChangeTrackName}
            />
          </div>        

          <div className="form-group">
            <input type="submit" value="Update Track" className="btn btn-primary" />
          </div>
        </form>
      </div> */}
    </div>
    )
  }
}