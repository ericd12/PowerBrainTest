import React, { Component } from "react";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { isArrayEmpty } from "../../helpers";
import ElementForm from "./ElementForm";

const initalElementState = {
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
};

class CreateElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initalElementState,
      categories: [],
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
          ...initalElementState,
        });
      });
  };

  render() {
    //* Note: Pretty much the same as `ManageElement.js` could probably be a single reusable component
    return (
      <Container>
      <h3>Create a New Element</h3>
        <Card bg="light">
          <Card.Body>
            <ElementForm
              {...this.state}
              buttonText="Create Element"
              onChange={this.onChange}
              onSubmit={this.onSubmit}
            />
          </Card.Body>
        </Card>
      </Container>
    );
  }
}

export default CreateElement;
