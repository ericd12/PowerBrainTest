import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Elements = props => (
    <tr>
        <td>{props.element.elementnumber}</td>
        <td>{props.element.elementlabel}</td>
        <td>{props.element.elementDescription}</td>
        <td>{props.element.elementFormat}</td>
        <td>{props.element.elementDuration}</td>
        <td>{props.element.elementCategory}</td>
        <td>{props.element.elementSubCategory}</td>
        <td>{props.element.elementMarket}</td>
        <td>{props.element.elementCogRating}</td>
        <td>{props.element.elementPhysRating}</td>
        <td>{props.element.elementLink}</td>
        <td>
            <Link to={"/elements/edit/"+props.element._id}><button className="btn btn-sm btn-outline-warning">edit</button></Link> | {/*eslint-disable-next-line */}            
            <button className="btn text-center btn-sm btn-outline-danger" href="#" onClick={() => { props.deleteElement(props.element._id) }}>delete</button>
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
        alert('deleted');

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
                    { this.elementList() }
                </tbody>
            </table>
            </div>
        )
    }
}