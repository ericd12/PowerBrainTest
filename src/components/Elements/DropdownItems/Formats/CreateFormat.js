import React, { Component } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import FormatList from "./FormatList";

class CreateFormat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementFormat: "",
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { elementFormat } = this.state;

    axios
      .post("http://localhost:5000/formats/add", { elementFormat })
      .then(res => {
        console.log(res.data);
        alert("New Format Added!");
        this.setState({
          elementFormat: "",
        });
      })
      .catch(error => console.log(error.response));
  };

  render() {
    const { elementFormat } = this.state;

    return (
      <Container>
        <h3>Create New Format</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementFormat">
            <Form.Label>Format:</Form.Label>
            <Form.Control
              name="elementFormat"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              required
              type="text"
              value={elementFormat}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Create New Format
          </Button>
        </Form>
        <FormatList />
      </Container>
    );
  }
}

export default CreateFormat;
