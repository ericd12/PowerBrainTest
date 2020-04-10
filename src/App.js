import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";

import NavbarMain from "./components/navbar.component"

import CreateElement from "./components/elements/create-element.component";
import ManageElement from "./components/elements/manage-element.component";
import ElementsList from "./components/elements/elements-list.component";

import CreateFormat from "./components/elements/dropdown-items/create-format.component";
import CreateCategory from "./components/elements/dropdown-items/create-category.component";


import CreateTrack from "./components/tracks/create-track.component";
import ManageTrack from "./components/tracks/manage-track.component";
import TracksList from "./components/tracks/tracks-list.component";

import CreateProgram from "./components/programs/create-program.component";
import ManageProgram from "./components/programs/manage-program.component";
import ProgramsList from "./components/programs/programs-list.component";



function App() {
  return (
    <Router>
      <div id="App">
        <NavbarMain />
        <br />
        <Route path='/elements' exact component = {ElementsList} />
        <Route path='/elements/create' exact component = {CreateElement} />     
        <Route path='/elements/edit/:id' exact component = {ManageElement} />

        <Route path='/formats/create' exact component = {CreateFormat} />     
        <Route path='/categories/create' exact component = {CreateCategory} />     
        
        <Route path='/tracks' exact component = {TracksList} />    
        <Route path='/tracks/create' exact component = {CreateTrack} />
        <Route path='/tracks/edit/:id' exact component = {ManageTrack} />

        <Route path='/programs' exact component = {ProgramsList} />    
        <Route path='/programs/create' exact component = {CreateProgram} />
        <Route path='/programs/edit/:id' exact component = {ManageProgram} />         
      </div>
    </Router>
  );
}

export default App;
