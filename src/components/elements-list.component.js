import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Elements = props => (
    <tr>
        <td>{props.element.elementnumber}</td>
        {/* <td>{props.element.description}</td>
        <td>{props.element.duration}</td> */}
        <td>
            <Link to={"/edit/"+props.element._id}>edit</Link> | <a href="#" onClick={() => { props.deleteElement(props.element._id) }}>delete</a>
        </td>
    </tr>
)

export default class ElementsList extends Component {
    constructor(props) {
        super(props);
    
        this.deleteElement = this.deleteElement.bind(this);
        this.state = {elements: []};
    }

    componentDidMount(){
        axios.get('http://localhost:5000/elements/')
            .then(response => {
                this.setState({elements: response.data})
            })
            .catch((error) => {
                console.log(error);
            })
    }

    deleteElement(id) {
        axios.delete('http://localhost:5000/elements/' + id)
          .then(response => { console.log(response.data)});
    
        this.setState({
          elements: this.state.elements.filter(el => el._id !== id)
        })
    }

    elementList() {
        return this.state.elements.map(currentelement => {
            return <Elements element={currentelement} deleteElement={this.deleteElement} key={currentelement._id}/>;
        })
    }

    render() {
        return (
            <div>
            <h3>Elements</h3>
            <table className="table">
                <thead className="thead-light">
                <tr>
                    <th>Username</th>
                    <th>Description</th>
                    <th>Duration</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                { this.elementList() }
                </tbody>
            </table>
            </div>
        )
    }
}