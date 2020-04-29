import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ElementsTableRow from "./ElementsTableRow";
import { CoolTableHead } from "../../styles";
import ComponentWrapper from "../ComponentWrapper";
import { API_URL } from "../../constants";

class ElementsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { elements: [] };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/elements/`)
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
      this.setState(prev => {
        return {
          elements: prev.elements.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { elements } = this.state;
    return (
      <ComponentWrapper title="Manage Elements">
        <Table>
          <thead>
            <tr>
              <CoolTableHead>Number</CoolTableHead>
              <CoolTableHead>Label</CoolTableHead>
              <CoolTableHead>Description</CoolTableHead>
              <CoolTableHead>Format</CoolTableHead>
              <CoolTableHead>Duration</CoolTableHead>
              <CoolTableHead>Category</CoolTableHead>
              <CoolTableHead>Subcategory</CoolTableHead>
              <CoolTableHead>Market</CoolTableHead>
              <CoolTableHead>Cognitive Rating</CoolTableHead>
              <CoolTableHead>Physical Rating</CoolTableHead>
              <CoolTableHead>Vimeo Link</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
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
        </Table>
      </ComponentWrapper>
    );
  }
}

export default ElementsTable;
