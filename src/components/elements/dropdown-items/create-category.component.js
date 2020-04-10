import React, { Component } from 'react';
import axios from 'axios';

export default class CreateCategory extends Component {
  constructor(props) {
    super(props);

    this.onChangeElementCategory = this.onChangeElementCategory.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
        elementCategory: ''
    }
  }
  
  onChangeElementCategory(e) {
    this.setState({
        elementCategory: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const elementCategory = {
        elementCategory: this.state.elementCategory
    }

    console.log(elementCategory);

    axios.post('http://localhost:5000/categories/add', elementCategory)
        .then(res => console.log(res.data))
        .catch((error) => console.log( error.response ) )

    this.setState({
        elementCategory: ''
    });
  }

  render() {
    return (
      <div className='container'>
        <h3>Create New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group"> 
            <label>Format: </label>
            <input  type="text"
                required
                className="form-control"
                value={this.state.elementCategory}
                onChange={this.onChangeElementCategory}
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