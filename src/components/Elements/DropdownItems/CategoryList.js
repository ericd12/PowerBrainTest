import React, { Component } from "react";
import axios from "axios";
import CategoriesTableRow from "./CategoriesTableRow";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/categories/")
      .then(response => {
        this.setState({ categories: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteCategory = id => {
    axios.delete(`http://localhost:5000/categories/${id}`).then(response => {
      console.log(response.data);
      alert("deleted");
      const { categories } = this.state;

      this.setState({
        categories: categories.filter(el => el._id !== id),
      });
    });
  };

  render() {
    const { categories } = this.state;
    return (
      <div>
        <h3>Manage Categories</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th id="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map(currentcat => {
              return (
                <CategoriesTableRow
                  key={currentcat._id}
                  deleteCategory={this.deleteCategory}
                  {...currentcat}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default CategoryList;
