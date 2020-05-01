import React, { Component } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { isArrayEmpty } from "../../helpers";
import ElementForm from "./ElementForm";
import ComponentWrapper from "../ComponentWrapper";
import { API_URL } from "../../constants";

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
    axios.get(`${API_URL}/formats/`).then(response => {
      if (!isArrayEmpty(response.data)) {
        this.setState({
          formats: response.data.map(format => format.elementFormat),
          elementFormat: response.data[0].elementFormat,
        });
      }
    });
    axios.get(`${API_URL}/categories/`).then(response => {
      if (!isArrayEmpty(response.data)) {
        this.setState({
          categories: response.data.map(cat => cat.elementCategory),
          elementCategory: response.data[0].elementCategory,
        });
      }
    });
    axios.get(`${API_URL}/markets/`).then(response => {
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
      .post(`${API_URL}/elements/add`, {
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
