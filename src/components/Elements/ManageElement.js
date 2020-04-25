import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import { isArrayEmpty } from "../../helpers";
import ElementForm from "./ElementForm";

class ManageElement extends Component {
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
      markets:[]
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    axios.get("http://localhost:5000/formats/").then(response => {
      if (!isArrayEmpty(response.data)) {
        this.setState({
          formats: response.data.map(format => format.elementFormat),
          elementFormat: response.data.elementFormat,
        });
      }
    });

    axios.get("http://localhost:5000/categories/").then(response => {
      if (!isArrayEmpty(response.data)) {
        this.setState({
          categories: response.data.map(cat => cat.elementCategory),
          elementCategory: response.data.elementCategory,
        });
      }
    });

    axios.get("http://localhost:5000/markets/").then(response => {
      if (!isArrayEmpty(response.data)) {
        this.setState({
          markets: response.data.map(market => market.elementMarket),
          elementMarket: response.data.elementMarket,
        });
      }
    });

    axios
      .get(`http://localhost:5000/elements/${id}`)
      .then(response => {
        this.setState({
          ...response.data,
        });
      })
      .catch(error => {
        console.log(error);
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
    const { id } = this.props.match.params;
    const {
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
    } = this.state;

    axios
      .post(`http://localhost:5000/elements/update/${id}`, {
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
        alert("updated");
        window.location = "../";
      });
  };

  render() {
    //* Note: Pretty much the same as `CreateElement.js` could probably be a single reusable component

    return (
      <Container>
        <h3>Update Element</h3>
        <ElementForm
          {...this.state}
          buttonText="Update Element"
          onChange={this.onChange}
          onSubmit={this.onSubmit}
        />
      </Container>
    );
  }
}

export default ManageElement;
