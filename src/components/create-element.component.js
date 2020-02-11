import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class CreateElement extends Component {
    constructor(props){
        super(props);
        
        this.onChangeElementNumber = this.onChangeElementNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            elementnumber: ''

        }
    }

    // componentDidMount(){
    //     axios.get('http://localhost:5000/users/')
    //         .then(response => {
    //             if(response.data.length > 0){
    //                 this.setState({
    //                     users: response.data.map(user => user.username),
    //                     username: response.data[0].username
    //                   })
    //             }
    //         })
    // }
   
    onChangeElementNumber(e) {
      this.setState({
        elementnumber: e.target.value
      })
    }
  
    onSubmit(e){
      e.preventDefault();

      const element = {
        elementnumber: this.state.elementnumber,
      }
      console.log(element);

      axios.post('http://localhost:5000/elements/add', element)
      .then(res => console.log(res.data));

      // window.location = '/';
           

  
      this.setState({
        elementnumber: ''
      });
    }



    render() {
        return (
          

          <div>               
            <h1 className= 'text-center'>Create a New Entry </h1>
            <div className="jumbotron">
              <form onSubmit={this.onSubmit} id="createForm"> 
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="number">Number</label>		
                    <input className="form-control" type="text" placeholder="add #" 
                      value = {this.state.elementnumber}
                      onChange={this.onChangeElementNumber}
                    />
                  </div>
                  {/* <div className="form-group col">
                    <label htmlFor="label">Label</label>		
                    <input className="form-control" type="text" name="label" id="label" placeholder="add label" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="description">Description</label>		
                    <input className="form-control" type="text" name="description" id="description" placeholder="add description" />
                  </div>
                  <div className="form-group col">		
                    <label htmlFor="format">Format</label>	
                    <select className="form-control" name="format" id="format">	
                      <option defaultValue>Choose...</option>
                      <option value="1">Video</option>
                      <option value="2">#</option>
                      <option value="3">#</option>
                    </select>
                  </div>	
                </div>	
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="duration">Duration</label>		
                    <input className="form-control" type="text" name="duration" id="duration" placeholder="min:secs" />
                  </div>	
                  <div className="form-group col">		
                    <label htmlFor="category">Category</label>	
                    <select className="form-control" name="category" id="category">	
                      <option defaultValue>Choose...</option>
                      <option value="1">Timing</option>
                      <option value="2">#</option>
                      <option value="3">#</option>
                    </select>
                  </div>	
                </div>	 
                <div className="form-row"> */}
                  {/* May change 'Subcategory' to dropdown in future */}
                  {/* <div className="form-group col">	
                    <label className="subcategory">Subcategory</label>
                    <input className="form-control" type="text" name="subcategory" id="subcategory" placeholder="insert subcategory" />
                  </div>
  
                  <div className="form-group col">		
                    <label htmlFor="market">Market</label>	
                    <select className="form-control" name="market" id="market">	
                      <option defaultValue>Choose...</option>
                      <option value="1">Timing</option>
                      <option value="2">#</option>
                      <option value="3">#</option>
                    </select>
                  </div>
                </div>	
                <div className="form-row">
                  <div className="form-group col">		
                    <label htmlFor="cogRating">Cognitive Rating</label>	
                    <select className="form-control" name="cogRating" id="cogRating">	
                      <option defaultValue>Choose...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                  </div>	
  
                  <div className="form-group col">		
                    <label htmlFor="physRating">Physical Rating</label>	
                    <select className="form-control" name="physRating" id="physRating">	
                      <option defaultValue>Choose...</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                    </select>
                  </div>	
                </div> */}
        
                {/* <div className="form-group">	
                  <label className="vimeoLink">Vimeo Link</label>
                  <input className="form-control" type="text" name="vimeoLink" id="vimeoLink" placeholder="insert address" />
                </div>                 
              */}                       
              </div>

              <div className="text-center">
                      <button type="submit" value="createElement" className="btn btn-lg btn-primary btn-center ">Submit!</button>
              </div> 
              <Link to={'./'}>Go Back</Link>
            </form>	
          </div>            
          </div>   
          
        )
    }
}