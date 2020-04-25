import React, { Component } from "react";
import axios from "axios";
import { Form, Container, Button } from "react-bootstrap";
import MarketList from "./MarketList";

class CreateMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementMarket: "",
    };
  }

  onSubmit = e => {
    e.preventDefault();
    const { elementMarket } = this.state;
    axios
      .post("http://localhost:5000/markets/add", { elementMarket })
      .then(res => {
        console.log(res.data);
        alert("New Market Added!");
        this.setState({
          elementMarket: "",
        });
      })
      .catch(error => console.log(error.response));
  };

  render() {
    const { elementMarket } = this.state;

    return (
      <Container>
        <h3>Create New Market</h3>
        <Form onSubmit={this.onSubmit}>
          <Form.Group controlId="elementMarket">
            <Form.Label>Market:</Form.Label>
            <Form.Control
              name="elementMarket"
              onChange={e => {
                const { name, value } = e.target;
                this.setState({
                  [name]: value,
                });
              }}
              required
              type="text"
              value={elementMarket}
            />
          </Form.Group>
          <Button type="submit" variant="primary">
            Create New Market
          </Button>
        </Form>
        <MarketList />
      </Container>
    );
  }
}

export default CreateMarket;
