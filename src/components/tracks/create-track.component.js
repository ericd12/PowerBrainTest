import React, { Component } from 'react';
import axios from 'axios';
import Board from './board'
import Card from './card'
// import { Link } from 'react-router-dom';



export default class CreateTrack extends Component {
  constructor(props) {
    super(props);

    // this.onChangeTrackName = this.onChangeTrackName.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
       
      this.state = {elements: []};
    }

  
  componentDidMount() {
    axios.get('http://localhost:5000/elements/')
            .then(response => {
                this.setState({elements: response.data})                
            })
            .catch((error) => {
                console.log(error);
            })
    }


  // onChangeTrackName(e) {
  //   this.setState({
  //     trackname: e.target.value
  //   })
  // }

  // onSubmit(e) {
  //   e.preventDefault();

  //   const track = {
  //     trackname: this.state.trackname
  //   }

  //   axios.post('http://localhost:5000/tracks/add', track)
  //     .then(res => console.log(res.data));

  //   this.setState({
  //     trackname: ''
  //   })
  // }

  render() {
  
    // const tracks = this.state.elements.map((i) => <Card id='card-1' className='card' draggable='true' key={i.elementnumber + 1}>{i.elementnumber}</Card>); 

    return (
      <div className='container'>
        <div className='flexbox'>
          <Board id='board-1' className='board'>
            <Card id='card-1' className='card' draggable='true'>Card 1</Card>
            <Card id='card-2' className='card' draggable='true'>Card 2</Card>

            {/* {tracks} */}
          </Board>
          <Board id='board-2' className='board'>
            <Card id='card-3' className='card' draggable='true'>Card 3</Card>
          </Board>
        </div>
      </div>
    )
  }
}



