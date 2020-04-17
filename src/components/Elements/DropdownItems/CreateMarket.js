import React, { Component } from "react";
import axios from "axios";

class CreateMarket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elementMarket: "",
    };
  }

  onChangeElementMarket = e => {
    this.setState({
      elementMarket: e.target.value,
    });
  };

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
      <div className="container">
        <h3>Create New Market</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Market: </label>
            <input
              className="form-control"
              onChange={this.onChangeElementMarket}
              required
              type="text"
              value={elementMarket}
            />
          </div>
          <div className="form-group">
            <input
              className="btn btn-primary"
              type="submit"
              value="Create New Market"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateMarket;
