import React, { Component } from "react";
import axios from "axios";
import { Container } from "react-bootstrap";
import ElementsTableRow from "./ElementsTableRow";

class ElementsList extends Component {
  constructor(props) {
    super(props);
    this.state = { elements: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/elements/")
      .then(response => {
        this.setState({ elements: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteElement = id => {
    axios.delete(`http://localhost:5000/elements/${id}`).then(response => {
      console.log(response.data);
      alert("deleted");
      this.setState({
        elements: this.state.elements.filter(el => el._id !== id),
      });
    });
  };

  render() {
    const { elements } = this.state;
    return (
      <Container>
        <h1>Manage Elements</h1>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Number</th>
              <th>Label</th>
              <th>Description</th>
              <th>Format</th>
              <th>Duration</th>
              <th>Category</th>
              <th>Subcategory</th>
              <th>Market</th>
              <th>Cognitive Rating</th>
              <th>Physical Rating</th>
              <th>Vimeo Link</th>
              <th id="actions">Actions</th>
            </tr>
          </thead>
          <tbody>
            {elements.map(currentelement => {
              return (
                <ElementsTableRow
                  key={currentelement._id}
                  deleteElement={this.deleteElement}
                  {...currentelement}
                />
              );
            })}
          </tbody>
        </table>
      </Container>
    );
  }
}

export default ElementsList;
