import React, { Component } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import MarketsTableRow from "./MarketsTableRow";
import { CoolTableHead } from "../../../../styles";

class MarketList extends Component {
  constructor(props) {
    super(props);
    this.state = { markets: [] };
  }

  componentDidMount() {
    axios
      .get("http://localhost:5000/markets/")
      .then(response => {
        this.setState({ markets: response.data });
      })
      .catch(error => {
        console.log(error);
      });
  }

  deleteMarket = id => {
    axios.delete(`http://localhost:5000/markets/${id}`).then(response => {
      console.log(response.data);
      alert("deleted");
      this.setState(prev => {
        return {
          markets: prev.markets.filter(el => el._id !== id),
        };
      });
    });
  };

  render() {
    const { markets } = this.state;
    return (
      <div style={{ marginTop: "10vh" }}>
        <h3>Manage Markets</h3>
        <Table hover>
          <thead>
            <tr>
              <CoolTableHead>Name</CoolTableHead>
              <CoolTableHead>Actions</CoolTableHead>
            </tr>
          </thead>
          <tbody>
            {markets.map(currentMarket => {
              return (
                <MarketsTableRow
                  key={currentMarket._id}
                  deleteMarket={this.deleteMarket}
                  {...currentMarket}
                />
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default MarketList;
