import React, { Component } from 'react';
import axios from 'axios';

export default class ManageElement extends Component {
  constructor(props) {
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

  componentDidMount() {
    axios.get('http://localhost:5000/elements/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          elementnumber: response.data.elementnumber,
          elementlabel: response.data.elementlabel,
          elementDescription: response.data.elementDescription
        })   
      })
      .catch(function (error) {
        console.log(error);
      })
  }

  onChangeElementNumber(e) {
    this.setState({
      elementnumber: e.target.value
    })
  }
  
  onChangeElementLabel(e) {
    this.setState({
      elementlabel: e.target.value
    })
  }

  onChangeElementDescription(e) {
    this.setState({
      elementDescription: e.target.value
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const element = {
      elementnumber: this.state.elementnumber,
      elementlabel: this.state.elementlabel,
      elementDescription: this.state.elementDescription      
    }

    console.log(element);

    axios.post('http://localhost:5000/elements/update/' + this.props.match.params.id, element)
      .then(res => console.log(res.data));
    alert('updated');
    window.location = '../';
  }

  render() {
    return (
    <div>
      <h3>Manage Elements</h3>
      <form onSubmit={this.onSubmit}>
        {/*<div className="form-group row"> */}
          <div className="form-group"> 
            <label>Number</label>		          
            <input type="text"
              required
              className="form-control"                
              placeholder="add #" 
              value = {this.state.elementnumber}
              onChange={this.onChangeElementNumber}
            />
          </div>
          <div className="form-group">
            <label>Label</label>	
            <input type="text"
              required
              className="form-control"    
              placeholder="add label"           
              value = {this.state.elementlabel}
              onChange={this.onChangeElementLabel}
            />
          </div>
           <div className="form-group">
            <label>Label</label>	
            <input type="text"
              required
              className="form-control"    
              placeholder="add description"           
              value = {this.state.elementDescription}
              onChange={this.onChangeElementDescription}
            />
            </div>
            {/* <div className="form-group col">
              <label htmlFor="description">Description</label>	
              <input  type="text"
                required
                className="form-control"
                name="description" 
                id="description" 
                placeholder="add description"
                value={this.state.description}
                onChange={this.onChangeDescription}
              />
            </div> */}

      {/*</div> */}

        <div className="form-group">
          <input type="submit" value="Update Element" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}