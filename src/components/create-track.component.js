import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { render } from '@testing-library/react';


export default class CreateTrack extends Component {
    constructor(props){
        super(props);
        
    }


    render(){
        return(
            <div>
                <h2>Create Track page</h2>
            </div>
        )
    }
}