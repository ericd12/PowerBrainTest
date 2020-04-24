import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Form, Container, Card, Col, Button } from "react-bootstrap";
import { isArrayEmpty } from "../../helpers";

class CreateElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
      elementCategory: "",
      elementCogRating: "",
      elementDescription: "",
      elementDuration: "",
      elementFormat: "",
      elementlabel: "",
      elementLink: "",
      elementMarket: "",
      elementnumber: "",
      elementPhysRating: "",
      elementSubCategory: "",
      formats: [],
      markets: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/formats/").then(response => {
      if (!isArrayEmpty(response.data)) {
        this.setState({
          formats: response.data.map(format => format.elementFormat),
          elementFormat: response.data[0].elementFormat,
        });
      }
    });
    axios.get("http://localhost:5000/categories/").then(response => {
      if (!isArrayEmpty(response.data)) {
        this.setState({
          categories: response.data.map(cat => cat.elementCategory),
          elementCategory: response.data[0].elementCategory,
        });
      }
    });
    axios.get("http://localhost:5000/markets/").then(response => {
      if (!isArrayEmpty(response.data)) {
        this.setState({
          markets: response.data.map(market => market.elementMarket),
          elementMarket: response.data[0].elementMarket,
        });
      }
    });
  }

  onChange = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      elementnumber,
      elementlabel,
      elementDescription,
      elementFormat,
      elementDuration,
      elementCategory,
      elementSubCategory,
      elementMarket,
      elementCogRating,
      elementPhysRating,
      elementLink,
    } = this.state;

    axios
      .post("http://localhost:5000/elements/add", {
        elementCategory,
        elementCogRating,
        elementDescription,
        elementDuration,
        elementFormat,
        elementlabel,
        elementLink,
        elementMarket,
        elementnumber,
        elementPhysRating,
        elementSubCategory,
      })
      .then(res => {
        console.log(res.data);
        alert("Element Created!");
        // window.location = '/';
        this.setState({
          elementCategory: "",
          elementCogRating: "",
          elementDescription: "",
          elementDuration: "",
          elementFormat: "",
          elementlabel: "",
          elementLink: "",
          elementMarket: "",
          elementnumber: "",
          elementPhysRating: "",
          elementSubCategory: "",
        });
      });
  };

  render() {
    const {
      elementnumber,
      elementlabel,
      elementDescription,
      elementFormat,
      elementDuration,
      elementCategory,
      elementSubCategory,
      elementMarket,
      elementCogRating,
      elementPhysRating,
      elementLink,
      formats,
      categories,
      markets,
    } = this.state;

    //* Note: Pretty much the same as `ManageElement.js` could probably be a single reusable component

    return (
      <Container>
        <Card bg="light">
          <Card.Header>Create a New Element</Card.Header>
          <Card.Body>
            <Form onSubmit={this.onSubmit}>
              <Form.Row>
                <Form.Group as={Col} controlId="elementnumber">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    name="elementnumber"
                    onChange={this.onChange}
                    placeholder="add #"
                    required
                    type="text"
                    value={elementnumber}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="elementlabel">
                  <Form.Label>Number</Form.Label>
                  <Form.Control
                    name="elementlabel"
                    onChange={this.onChange}
                    placeholder="add label"
                    required
                    type="text"
                    value={elementlabel}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="elementDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    name="elementDescription"
                    onChange={this.onChange}
                    placeholder="add description"
                    required
                    type="text"
                    value={elementDescription}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="elementFormat">
                  <Form.Label>Format</Form.Label>
                  <Form.Control
                    as="select"
                    name="elementFormat"
                    onChange={this.onChange}
                    required
                    value={elementFormat}
                  >
                    {formats.map(format => {
                      return (
                        <option key={format} value={format}>
                          {format}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="elementDuration">
                  <Form.Label>Duration</Form.Label>
                  <Form.Control
                    name="elementDuration"
                    onChange={this.onChange}
                    placeholder="min:secs"
                    required
                    type="text"
                    value={elementDuration}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="elementCategory">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    as="select"
                    name="elementCategory"
                    onChange={this.onChange}
                    required
                    value={elementCategory}
                  >
                    {categories.map(categorie => {
                      return (
                        <option key={categorie} value={categorie}>
                          {categorie}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="elementSubCategory">
                  <Form.Label>Subcategory</Form.Label>
                  <Form.Control
                    name="elementSubCategory"
                    onChange={this.onChange}
                    placeholder="insert subcategory"
                    required
                    type="text"
                    value={elementSubCategory}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="elementMarket">
                  <Form.Label>Market</Form.Label>
                  <Form.Control
                    as="select"
                    name="elementMarket"
                    onChange={this.onChange}
                    required
                    value={elementMarket}
                  >
                    {markets.map(market => {
                      return (
                        <option key={market} value={market}>
                          {market}
                        </option>
                      );
                    })}
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="elementCogRating">
                  <Form.Label>Cognitive Rating</Form.Label>
                  <Form.Control
                    as="select"
                    name="elementCogRating"
                    onChange={this.onChange}
                    required
                    value={elementCogRating}
                  >
                    <option defaultValue>Choose...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group as={Col} controlId="elementPhysRating">
                  <Form.Label>Physical Rating</Form.Label>
                  <Form.Control
                    as="select"
                    name="elementPhysRating"
                    onChange={this.onChange}
                    required
                    value={elementPhysRating}
                  >
                    <option defaultValue>Choose...</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                  </Form.Control>
                </Form.Group>
              </Form.Row>

              <Form.Row>
                <Form.Group as={Col} controlId="elementLink">
                  <Form.Label>Vimeo Link</Form.Label>
                  <Form.Control
                    name="elementLink"
                    onChange={this.onChange}
                    placeholder="insert address"
                    required
                    type="text"
                    value={elementLink}
                  />
                </Form.Group>
              </Form.Row>

              <Form.Row
                style={{
                  justifyContent: "flex-end",
                }}
              >
                <Button as={Link} to="./" variant="link">
                  Go Back
                </Button>
                <Button type="submit" variant="primary">
                  Create Element
                </Button>
              </Form.Row>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default CreateElement;
