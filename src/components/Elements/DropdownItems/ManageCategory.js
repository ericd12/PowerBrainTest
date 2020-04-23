import React, { Component } from "react";
import axios from "axios";

class ManageCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementCategory: "",
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/categories/${this.props.match.params.id}`)
      .then(response => {
        const { elementCategory } = response.data;
        this.setState({
          elementCategory,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onChangeElementCategory = e => {
    this.setState({
      elementCategory: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { elementCategory } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`http://localhost:5000/categories/update/${id}`, {
        elementCategory,
      })
      .then(res => {
        console.log(res.data);
        alert("updated");
      });
  };

  render() {
    const { elementCategory } = this.state;

    return (
      <div className="container">
        <h1>Update Category</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <div className="form-group col">
              <label>Category</label>
              <input
                className="form-control"
                onChange={this.onChangeElementCategory}
                placeholder="add category"
                required
                type="text"
                value={elementCategory}
              />
            </div>
          </div>
          <div className="form-group">
            <input
              className="btn btn-primary"
              type="submit"
              value="Update Category"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ManageCategory;
