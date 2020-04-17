import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";


const Td = styled.td`
  text-align: center;
`;

const Categories = props => (
  <tr>
    <Td>{props.category.elementCategory}</Td>
    
    <Td>
      <Link to={`/categories/edit/${props.category._id}`}>
        <button className="btn btn-sm btn-outline-warning">edit</button>
      </Link>{" "}
      | {/* eslint-disable-next-line */}
            <button className="btn btn-sm btn-outline-danger" href="#" onClick={() => { props.deleteCategory(props.category._id) }}>delete</button>
    </Td>
  </tr>
);

export default class CategoryList extends Component {
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
    });
    alert("deleted");
    this.setState({
        categories: this.state.categories.filter(el => el._id !== id),
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
                <Categories
                  key={currentcat._id}
                  deleteCategory={this.deleteCategory}
                  category={currentcat}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}
