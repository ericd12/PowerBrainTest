import React, { Component } from "react";
import axios from "axios";
import CategoryList from './category-list.component';

export default class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementCategory: "",
    };
  }

  onChangeElementCategory = e => {
    this.setState({
      elementCategory: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { elementCategory } = this.state;
    axios
      .post("http://localhost:5000/categories/add", { elementCategory })
      .then(res => console.log(res.data))
      .catch(error => console.log(error.response));
      alert("New Category Added!");

    this.setState({
      elementCategory: "",
    });
  };

  render() {
    const { elementCategory } = this.state;
    return (
      <div className="container">
        <h3>Create New Category</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Category: </label>
            <input
              className="form-control"
              onChange={this.onChangeElementCategory}
              required
              type="text"
              value={elementCategory}
            />
          </div>
          <div className="form-group">
            <input
              className="btn btn-primary"
              type="submit"
              value="Create New Category"
            />
          </div>
        </form>

        <CategoryList />
      </div>
  
    );
  }
}
