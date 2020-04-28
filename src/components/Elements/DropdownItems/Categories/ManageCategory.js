import React, { Component } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";

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
        const { history } = this.props;
        history.push("/categories/create");
      });
  };

  render() {
    const { elementCategory } = this.state;

    return (
      <Container>
        <h3>Update Category</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              name="elementCategory"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              placeholder="add category"
              required
              type="text"
              value={elementCategory}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Category
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ManageCategory;
