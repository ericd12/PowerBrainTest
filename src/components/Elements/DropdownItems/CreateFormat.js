import React, { Component } from "react";
import axios from "axios";

class CreateFormat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementFormat: "",
    };
  }

  onChangeElementFormat = e => {
    this.setState({
      elementFormat: e.target.value,
    });
  };

  onSubmit = e => {
    e.preventDefault();
    const { elementFormat } = this.state;

    axios
      .post("http://localhost:5000/formats/add", { elementFormat })
      .then(res => {
        console.log(res.data);
        alert("New Format Added!");
        this.setState({
          elementFormat: "",
        });
      })
      .catch(error => console.log(error.response));
  };

  render() {
    const { elementFormat } = this.state;

    return (
      <div className="container">
        <h3>Create New Format</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Format: </label>
            <input
              className="form-control"
              onChange={this.onChangeElementFormat}
              required
              type="text"
              value={elementFormat}
            />
          </div>
          <div className="form-group">
            <input
              className="btn btn-primary"
              type="submit"
              value="Create New Format"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateFormat;
