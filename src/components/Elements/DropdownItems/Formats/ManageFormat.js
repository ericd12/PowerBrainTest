import React, { Component } from "react";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import ComponentWrapper from "../../../ComponentWrapper";

class ManageFormat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementFormat: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    axios
      .get(`http://localhost:5000/formats/${id}`)
      .then(response => {
        const { elementFormat } = response.data;
        this.setState({
          elementFormat,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSubmit = e => {
    e.preventDefault();
    const { elementFormat } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`http://localhost:5000/formats/update/${id}`, {
        elementFormat,
      })
      .then(res => {
        console.log(res.data);
        alert("updated");
        const { history } = this.props;
        history.push("/formats");
      });
  };

  render() {
    const { elementFormat } = this.state;

    return (
      <ComponentWrapper title="Update Format">
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementFormat">
            <Form.Label>Format</Form.Label>
            <Form.Control
              name="elementFormat"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              placeholder="add format"
              required
              type="text"
              value={elementFormat}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Format
          </Button>
        </Form>
      </ComponentWrapper>
    );
  }
}

export default ManageFormat;
