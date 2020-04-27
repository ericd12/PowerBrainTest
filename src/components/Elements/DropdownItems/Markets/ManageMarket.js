import React, { Component } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";

class ManageMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementMarket: "",
    };
  }

  componentDidMount() {
    axios
      .get(`http://localhost:5000/markets/${this.props.match.params.id}`)
      .then(response => {
        const { elementMarket } = response.data;
        this.setState({
          elementMarket,
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  onSubmit = e => {
    e.preventDefault();
    const { elementMarket } = this.state;
    const { id } = this.props.match.params;
    axios
      .post(`http://localhost:5000/markets/update/${id}`, {
        elementMarket,
      })
      .then(res => {
        console.log(res.data);
        alert("updated");
        const { history } = this.props;
        history.push("/markets/create");
      });
  };

  render() {
    const { elementMarket } = this.state;

    return (
      <Container>
        <h3>Update Market</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementMarket">
            <Form.Label>Market</Form.Label>
            <Form.Control
              name="elementMarket"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              placeholder="add market"
              required
              type="text"
              value={elementMarket}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Update Market
          </Button>
        </Form>
      </Container>
    );
  }
}

export default ManageMarket;
