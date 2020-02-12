import React, { Component } from 'react';
import axios from 'axios';
// import { Link } from 'react-router-dom';


export default class CreateElement extends Component {
    constructor(props){
        super(props);
        
        this.onChangeElementNumber = this.onChangeElementNumber.bind(this);
        this.onChangeElementLabel = this.onChangeElementLabel.bind(this);
        this.onChangeElementDescription = this.onChangeElementDescription.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            elementnumber: '',
            elementlabel: '',
            elementDescription:''
        }
    }

   
    onChangeElementNumber(e) {
      this.setState({
        elementnumber: e.target.value
      });
    }

    onChangeElementLabel(e) {
      this.setState({
        elementlabel: e.target.value
      });
    }

    onChangeElementDescription(e) {
      this.setState({
        elementDescription: e.target.value
      });
    }
  
    onSubmit(e){
      e.preventDefault();

      const element = {
        elementnumber: this.state.elementnumber,
        elementlabel: this.state.elementlabel,
        elementDescription: this.state.elementDescription
      }
      console.log(element);

      axios.post('http://localhost:5000/elements/add', element)
      .then(res => console.log(res.data));

      // window.location = '/';
           
 
      this.setState({
        elementnumber: '',
        elementlabel:'',
        elementDescription: ''
      });
    }



    render() {
        return (
          

          <div>               
            <h1 className= 'text-center'>Create a New Element</h1>
            <div className="jumbotron">
              <form onSubmit={this.onSubmit} /*id="createForm" */ > 
              <div className="form-row" >
                  <div className="form-group col">
                    <label htmlFor="number">Number</label>		
                    <input type="text"
                      required
                      className="form-control" 
                      placeholder="add number"
                      value = {this.state.elementnumber}
                      onChange={this.onChangeElementNumber}
                    />
                  </div>
                  <div className="form-group col">
                    <label htmlFor="label">Label</label>		
                    <input type="text"
                      className="form-control" 
                      placeholder="add label" /* name="label" id="label" */
                      value = {this.state.elementlabel}
                      onChange={this.onChangeElementLabel}
                    />
                  </div>
               </div> 
              <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="description">Description</label>		
                    <input type="text"
                      required
                      className="form-control"
                      placeholder="add description"
                      value = {this.state.elementDescription}
                      onChange={this.onChangeElementDescription}
                    />
                  </div>
              </div>
                    {/*
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
              

              {/* <div className="text-center">
                      <button type="submit" value="createElement" className="btn btn-lg btn-primary btn-center ">Submit!</button>
              </div> 
              <Link to={'./'}>Go Back</Link>
            </form>	 */}
              <div className="form-group">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
              </div>
            </form>
          </div>            
          </div>   
          
        )
    }
}