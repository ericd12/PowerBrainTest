import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import CategoriesTableRow from "./CategoriesTableRow";
import { CoolTableHead } from "../../../../styles";
import ComponentWrapper from "../../../ComponentWrapper";
import { API_URL } from "../../../../constants";

class CategoryList extends Component {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/categories/`)
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
      <ComponentWrapper style={{ marginTop: "5vh" }} title="Manage Categories">
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
      </ComponentWrapper>
    );
  }
}

export default CategoryList;
