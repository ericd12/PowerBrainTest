import React, { Component } from 'react';
import axios from 'axios';

export default class ManageElement extends Component {
  constructor(props) {
    super(props);

    this.onChangeElementNumber = this.onChangeElementNumber.bind(this);

    this.state = {
      elementnumber: ''
    }
  }

  componentDidMount() {
    axios.get('http://localhost:5000/elements/'+this.props.match.params.id)
      .then(response => {
        this.setState({
          elementnumber: response.data.elementnumber
        })   
      })
      .catch(function (error) {
        console.log(error);
      })

    // axios.get('http://localhost:5000/users/')
    //   .then(response => {
    //     if (response.data.length > 0) {
    //       this.setState({
    //         users: response.data.map(user => user.username),
    //       })
    //     }
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   })

  }

  onChangeElementNumber(e) {
    this.setState({
      elementnumber: e.target.value
    })
  }


  onSubmit(e) {
    e.preventDefault();

    const element = {
      elementnumber: this.state.elementnumber
    }

    console.log(element);

    axios.post('http://localhost:5000/elements/update/' + this.props.match.params.id, element)
      .then(res => console.log(res.data));

    // window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Manage Elements</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group col"> 
          <label htmlFor="number">Number</label>		
          
            <input className="form-control" type="text" placeholder="add #" 
              required
              value = {this.state.elementnumber}
              onChange={this.onChangeElementNumber}
            />
          </div>

              {/* {
                this.state.elementnumber.map(function(element) {
                  return <option 
                    key={element}
                    value={element}>{element}
                    </option>;
                })
              } */}
      


        <div className="form-group">
          <input type="submit" value="Edit Exercise Log" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}