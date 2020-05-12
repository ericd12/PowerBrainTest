import React, { Component } from "react";
import axios from "axios";
import CategoriesTableRow from "./CategoriesTableRow";
import {
  CoolTableHead,
  StyledTable,
  StyledTbody,
  StyledThead,
} from "../../../../styles";
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
      <div style={{ marginTop: "6vh" }}>
        <h3>Manage Categories</h3>
        <StyledTable hover>
          <StyledThead>
            <tr>
              <CoolTableHead>Name</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
            </tr>
          </StyledThead>
          <StyledTbody>
            {categories.map(currentcat => {
              return (
                <CategoriesTableRow
                  key={currentcat._id}
                  deleteCategory={this.deleteCategory}
                  {...currentcat}
                />
              );
            })}
          </StyledTbody>
        </StyledTable>
      </div>
    );
  }
}

export default CategoryList;
