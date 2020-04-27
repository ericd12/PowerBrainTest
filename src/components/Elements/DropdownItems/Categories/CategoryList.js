import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import CategoriesTableRow from "./CategoriesTableRow";
import { CoolTableHead } from "../../../../styles";

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
      this.setState(prev => {
        return {
          categories: prev.categories.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { categories } = this.state;
    return (
      <div style={{ marginTop: "5vh" }}>
        <h3>Manage Categories</h3>
        <Table hover>
          <thead>
            <tr>
              <CoolTableHead>Name</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
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
        </Table>
      </div>
    );
  }
}

export default CategoryList;
