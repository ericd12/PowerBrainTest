import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ElementsTableRow from "./ElementsTableRow";
import { CoolTableHead, StyledContainer } from "../../styles";
import { API_URL } from "../../constants";

class ElementsTable extends Component {
  constructor(props) {
    super(props);
    this.state = { elements: [] };
  }

  componentDidMount() {
    axios
      .get(`${API_URL}/elements/`)
      .then(({ data: elements }) => {
        this.setState({ elements });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteElement = id => {
    axios.delete(`${API_URL}/elements/${id}`).then(() => {
      alert("deleted");
      this.setState(({ elements }) => {
        return {
          elements: elements.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { elements } = this.state;
    return (
      <StyledContainer fluid title="Manage Elements">
        <Table hover>
          <thead>
            <tr>
              <CoolTableHead>#</CoolTableHead>
              <CoolTableHead>Label</CoolTableHead>
              <CoolTableHead>Description</CoolTableHead>
              <CoolTableHead>Format</CoolTableHead>
              <CoolTableHead>Time</CoolTableHead>
              <CoolTableHead>Category</CoolTableHead>
              <CoolTableHead>Subcategory</CoolTableHead>
              <CoolTableHead>Market</CoolTableHead>
              <CoolTableHead>Cog#</CoolTableHead>
              <CoolTableHead>Phys#</CoolTableHead>
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
      </StyledContainer>
    );
  }
}

export default ElementsTable;
