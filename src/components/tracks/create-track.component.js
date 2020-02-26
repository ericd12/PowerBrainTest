import React, { Component } from 'react';
import axios from 'axios';
import Board from './board'
import Card from './card'
import { Link } from 'react-router-dom';
import '../../App.css';



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

  //   elementList() {
  //     return this.state.elements.map(currentelement => {
  //         return <Elements element={currentelement} deleteElement={this.deleteElement} key={currentelement._id}/>;
  //     })
  // }

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
      // <div className='container'>
        <div className='flexbox'>
          <Board id='board-1' className='board'>
            {this.state.elements.map((i) => 
              <Card 
                id={`card-${i._id}`} 
                className='card' 
                draggable='true' 
                key={i._id + 1}
                >  
                    
                  <ul id="list">
                    <li>{i.elementnumber}</li>
                    <li>{i.elementlabel}</li>                                  
                    <li>{i.elementDescription}</li>
                    <li>{i.elementFormat}</li>
                    <li>{i.elementDuration}</li>
                    <li>{i.elementCategory}</li>
                    <li>{i.elementMarket}</li>
                    <li>{i.elementCogRating}</li>
                    <li>{i.elementPhysRating}</li>
                    <li>{i.elementLink}</li>
                  </ul>            
                    
              </Card>)}         
          </Board>
          <Board id='board-2' className='board'>

            
          </Board>
        </div>
      /* </div> */
    )
  }
}



