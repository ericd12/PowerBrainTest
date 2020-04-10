import React, { Component } from 'react';
import axios from 'axios';

export default class CreateFormat extends Component {
  constructor(props) {
    super(props);

    this.onChangeElementFormat = this.onChangeElementFormat.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        elementFormat: ''
    }
  }
  
  onChangeElementFormat(e) {
    this.setState({
        elementFormat: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const elementFormat = {
        elementFormat: this.state.elementFormat
    }

    console.log(elementFormat);

    axios.post('http://localhost:5000/formats/add', elementFormat)
        .then(res => console.log(res.data))
        .catch((error) => console.log( error.response ) )

    this.setState({
        elementFormat: ''
    });
  }

  render() {
    return (
      <div>
        <h3>Create New Format</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Format: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.elementFormat}
                onChange={this.onChangeElementFormat}
                />
          </div>
          <div className="form-group">
            <input type="submit" value="Create New Format" className="btn btn-primary" />
          </div>
        </form>
      </div>
    )
  }
}