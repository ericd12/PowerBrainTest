import React, { Component } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import ElementForm from "./ElementForm";
import ComponentWrapper from "../ComponentWrapper";
import { API_URL } from "../../constants";

const initalElementState = {
  elementCategory: "",
  elementCogRating: "",
  elementDescription: "",
  elementDuration: "",
  elementFormat: "",
  elementLabel: "",
  elementLink: "",
  elementMarket: "",
  elementNumber: "",
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
    Promise.all([
      axios.get(`${API_URL}/formats/`),
      axios.get(`${API_URL}/categories/`),
      axios.get(`${API_URL}/markets/`),
    ]).then(([{ data: formats }, { data: categories }, { data: markets }]) => {
      this.setState({
        formats: formats.map(format => format.elementFormat),
        elementFormat: formats[0].elementFormat,
        categories: categories.map(cat => cat.elementCategory),
        elementCategory: categories[0].elementCategory,
        markets: markets.map(market => market.elementMarket),
        elementMarket: markets[0].elementMarket,
      });
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
      elementNumber,
      elementLabel,
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
      .post(`${API_URL}/elements/add`, {
        elementCategory,
        elementCogRating,
        elementDescription,
        elementDuration,
        elementFormat,
        elementLabel,
        elementLink,
        elementMarket,
        elementNumber,
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
      })
      .catch(err => console.log({ err }));
  };

  render() {
    //* Note: Pretty much the same as `ManageElement.js` could probably be a single reusable component
    return (
      <ComponentWrapper title="Create a New Element">
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
      </ComponentWrapper>
    );
  }
}

export default CreateElement;
