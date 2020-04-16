import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default class CreateElement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      elementnumber: "",
      elementlabel: "",
      elementDescription: "",
      elementFormat: "",
      elementDuration: "",
      elementCategory: "",
      elementSubCategory: "",
      elementMarket: "",
      elementCogRating: "",
      elementPhysRating: "",
      elementLink: "",
      formats: [],
      categories: [],
    };
  }

  componentDidMount() {
    axios.get("http://localhost:5000/formats/").then(response => {
      if (response.data.length > 0) {
        this.setState({
          formats: response.data.map(format => format.elementFormat),
          elementFormat: response.data[0].elementFormat,
        });
      }
    });
    axios.get("http://localhost:5000/categories/").then(response => {
      if (response.data.length > 0) {
        this.setState({
          categories: response.data.map(cat => cat.elementCategory),
          elementCategory: response.data[0].elementCategory,
        });
      }
    });
  }

  onChangeElementNumber = e => {
    this.setState({
      elementnumber: e.target.value,
    });
  };

  onChangeElementLabel = e => {
    this.setState({
      elementlabel: e.target.value,
    });
  };

  onChangeElementDescription = e => {
    this.setState({
      elementDescription: e.target.value,
    });
  };

  onChangeElementFormat = e => {
    this.setState({
      elementFormat: e.target.value,
    });
  };

  onChangeElementDuration = e => {
    this.setState({
      elementDuration: e.target.value,
    });
  };

  onChangeElementCategory = e => {
    this.setState({
      elementCategory: e.target.value,
    });
  };

  onChangeElementSubCategory = e => {
    this.setState({
      elementSubCategory: e.target.value,
    });
  };

  onChangeElementMarket = e => {
    this.setState({
      elementMarket: e.target.value,
    });
  };

  onChangeElementCogRating = e => {
    this.setState({
      elementCogRating: e.target.value,
    });
  };

  onChangeElementPhysRating = e => {
    this.setState({
      elementPhysRating: e.target.value,
    });
  };

  onChangeElementLink = e => {
    this.setState({
      elementLink: e.target.value,
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
      })
      .then(res => console.log(res.data));

    // window.location = '/';

    this.setState({
      elementnumber: "",
      elementlabel: "",
      elementDescription: "",
      elementFormat: "",
      elementDuration: "",
      elementCategory: "",
      elementSubCategory: "",
      elementMarket: "",
      elementCogRating: "",
      elementPhysRating: "",
      elementLink: "",
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
    } = this.state;

    return (
      <div className="container">
        <h1 className="text-left">Create a New Element</h1>
        <div className="jumbotron">
          <form onSubmit={this.onSubmit} /* id="createForm" */>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="number">Number</label>
                <input
                  className="form-control"
                  onChange={this.onChangeElementNumber}
                  placeholder="add number"
                  required
                  type="text"
                  value={elementnumber}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="label">Label</label>
                <input
                  className="form-control"
                  onChange={this.onChangeElementLabel}
                  placeholder="add label" /* name="label" id="label" */
                  type="text"
                  value={elementlabel}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="description">Description</label>
                <input
                  className="form-control"
                  onChange={this.onChangeElementDescription}
                  placeholder="add description"
                  required
                  type="text"
                  value={elementDescription}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="format">Format</label>
                <select
                  ref="userInput"
                  className="form-control"
                  onChange={this.onChangeElementFormat}
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
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="duration">Duration</label>
                <input
                  className="form-control"
                  id="duration"
                  name="duration"
                  onChange={this.onChangeElementDuration}
                  placeholder="min:secs"
                  required
                  type="text"
                  value={elementDuration}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="category">Category</label>
                <select
                  ref="catInput"
                  className="form-control"
                  onChange={this.onChangeElementCategory}
                  required
                  value={elementCategory}
                >
                  {categories.map(cat => {
                    return (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
            <div className="form-row">
              {/* May change 'Subcategory' to dropdown in future */}
              <div className="form-group col">
                <label className="subcategory">Subcategory</label>
                <input
                  className="form-control"
                  id="subcategory"
                  name="subcategory"
                  onChange={this.onChangeElementSubCategory}
                  placeholder="insert subcategory"
                  required
                  type="text"
                  value={elementSubCategory}
                />
              </div>
              <div className="form-group col">
                <label htmlFor="market">Market</label>
                <select
                  className="form-control"
                  id="market"
                  name="market"
                  onChange={this.onChangeElementMarket}
                  required
                  value={elementMarket}
                >
                  <option defaultValue>Choose...</option>
                  <option value="Memory Care">Memory Care</option>
                  <option value="2">#</option>
                  <option value="3">#</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label htmlFor="cogRating">Cognitive Rating</label>
                <select
                  className="form-control"
                  id="cogRating"
                  name="cogRating"
                  onChange={this.onChangeElementCogRating}
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
                </select>
              </div>
              <div className="form-group col">
                <label htmlFor="physRating">Physical Rating</label>
                <select
                  className="form-control"
                  id="physRating"
                  name="physRating"
                  onChange={this.onChangeElementPhysRating}
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
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="form-group col">
                <label className="vimeoLink">Vimeo Link</label>
                <input
                  className="form-control"
                  id="vimeoLink"
                  name="vimeoLink"
                  onChange={this.onChangeElementLink}
                  placeholder="insert address"
                  required
                  type="text"
                  value={elementLink}
                />
              </div>
            </div>
            <div className="form-group text-center">
              <input
                className="btn btn-primary"
                type="submit"
                value="Create Element"
              />
            </div>

            <Link to="./">Go Back</Link>
          </form>
        </div>
      </div>
    );
  }
}
