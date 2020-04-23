import React, { Component } from "react";
import axios from "axios";

class ManageElement extends Component {
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
    const { id } = this.props.match.params;

    axios.get("http://localhost:5000/formats/").then(response => {
      if (response.data.length > 0) {
        this.setState({
          formats: response.data.map(format => format.elementFormat),
          elementFormat: response.data.elementFormat,
        });
      }
    });

    axios.get("http://localhost:5000/categories/").then(response => {
      if (response.data.length > 0) {
        this.setState({
          categories: response.data.map(format => format.elementCategory),
          elementCategory: response.data.elementCategory,
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
    const { id } = this.props.match.params;
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
      .post(`http://localhost:5000/elements/update/${id}`, {
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
    alert("updated");
    window.location = "../";
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
    } = this.state;

    return (
      <div className="container">
        <h1>Update Element</h1>
        <form onSubmit={this.onSubmit}>
          <div className="form-group row">
            <div className="form-group col">
              <label>Number</label>
              <input
                className="form-control"
                onChange={this.onChangeElementNumber}
                placeholder="add #"
                required
                type="text"
                value={elementnumber}
              />
            </div>
            <div className="form-group col">
              <label>Label</label>
              <input
                className="form-control"
                onChange={this.onChangeElementLabel}
                placeholder="add label"
                required
                type="text"
                value={elementlabel}
              />
            </div>
          </div>
          <div className="form-group row">
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
                className="form-control"
                id="format"
                name="format"
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
          <div className="form-group row">
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
                className="form-control"
                id="category"
                name="category"
                onChange={this.onChangeElementCategory}
                required
                value={elementCategory}
              >
                {this.state.categories.map(function(cat) {
                  return (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            {/* May change 'Subcategory' to dropdown in future */}
            <div className="form-group col">
              <label htmlFor="subcategory">Subcategory</label>
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
          <div className="form-group row">
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
          <div className="form-group row">
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

          <div className="form-group">
            <input
              className="btn btn-primary"
              type="submit"
              value="Update Element"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default ManageElement;
