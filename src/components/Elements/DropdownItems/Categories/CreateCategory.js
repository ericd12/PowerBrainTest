import React, { Component } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import CategoryList from "./CategoryList";

class CreateCategory extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementCategory: "",
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { elementCategory } = this.state;
    axios
      .post("http://localhost:5000/categories/add", { elementCategory })
      .then(res => {
        console.log(res.data);
        alert("New Category Added!");
        this.setState({
          elementCategory: "",
        });
      })
      .catch(error => console.log(error.response));
  };

  render() {
    const { elementCategory } = this.state;
    return (
      <Container>
        <h3>Create New Category</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementCategory">
            <Form.Label>Category: </Form.Label>
            <Form.Control
              name="elementCategory"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              required
              type="text"
              value={elementCategory}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Create New Category
          </Button>
        </Form>
        <CategoryList />
      </Container>
    );
  }
}

export default CreateCategory;
