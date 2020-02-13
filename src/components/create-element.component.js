import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


export default class CreateElement extends Component {
    constructor(props){
      super(props);
      
      this.onChangeElementNumber      = this.onChangeElementNumber.bind(this);
      this.onChangeElementLabel       = this.onChangeElementLabel.bind(this);
      this.onChangeElementDescription = this.onChangeElementDescription.bind(this);
      this.onChangeElementFormat      = this.onChangeElementFormat.bind(this);
      this.onChangeElementDuration    = this.onChangeElementDuration.bind(this);
      this.onChangeElementCategory    = this.onChangeElementCategory.bind(this);
      this.onSubmit                   = this.onSubmit.bind(this);

      this.state = {
          elementnumber: '',
          elementlabel: '',
          elementDescription:'',
          elementFormat: ''     ,      
          elementDuration: '',
          elementCategory: ''
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
    
    onChangeElementFormat(e) {
      this.setState({
        elementFormat: e.target.value
      });
    }
    
    onChangeElementDuration(e) {
      this.setState({
        elementDuration: e.target.value
      });
    }
    
    onChangeElementCategory(e) {
      this.setState({
        elementCategory: e.target.value
      });
    }
  
    onSubmit(e){
      e.preventDefault();

      const element = {
        elementnumber: this.state.elementnumber,
        elementlabel: this.state.elementlabel,
        elementDescription: this.state.elementDescription,
        elementFormat: this.state.elementFormat ,
        elementDuration:this.state.elementDuration, 
        elementCategory: this.state.elementCategory
      }
      console.log(element);

      axios.post('http://localhost:5000/elements/add', element)
      .then(res => console.log(res.data));

      // window.location = '/';
           
 
      this.setState({
        elementnumber: '',
        elementlabel: '',
        elementDescription:'',
        elementFormat: ''     ,      
        elementDuration: '',
        elementCategory: ''
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
                <div className="form-group col">
                  <label htmlFor="description">Description</label>		
                  <input type="text"
                    required
                    className="form-control"
                    placeholder="add description"
                    value = {this.state.elementDescription}
                    onChange={this.onChangeElementDescription}
                  />
                </div>
                <div className="form-group col">		
                  <label htmlFor="format">Format</label>	
                  <select className="form-control" 
                    required
                    name="format" 
                    id="format"
                    value = {this.state.elementFormat}
                    onChange={this.onChangeElementFormat}>
                    <option defaultValue>Choose...</option>
                    <option value="1">Video</option>
                    <option value="2">#2</option>
                    <option value="3">#3</option>
                  </select>
                </div>	
              </div> 
              <div className="form-row">
                <div className="form-group col">
                  <label htmlFor="duration">Duration</label>		
                  <input type="text"
                    required
                    className="form-control"
                    name="duration" 
                    id="duration" 
                    placeholder="min:secs"
                    value = {this.state.elementDuration}
                    onChange={this.onChangeElementDuration}
                  />
                </div>                    
                <div className="form-group col">		
                  <label htmlFor="category">Category</label>	
                  <select className="form-control" 
                    required
                    name="category" 
                    id="category"
                    value = {this.state.elementCategory}
                    onChange={this.onChangeElementCategory}>
                    <option defaultValue>Choose...</option>
                    <option value="1">Timing</option>
                    <option value="2">#</option>
                    <option value="3">#</option>
                  </select>
                </div>	
              </div>	 
                {/*<div className="form-row"> */}
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
              
            </form>	 */}
              <div className="form-group text-center">
                <input type="submit" value="Create Exercise Log" className="btn btn-primary" />
              </div>
              <Link to={'./'}>Go Back</Link>
            </form>
          </div>            
          </div>   
          
        )
    }
}