import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import NavbarMain from "./components/navbar.component"
import ElementsList from "./components/elements-list.component";
import CreateElement from "./components/create-element.component";
import ManageElement from "./components/manage-element.component";
import CreateTrack from "./components/create-track.component";

function App() {
  return (
    <Router>
      <div id="App">
      <NavbarMain />
      <br />
      {/* <Route path='/elements' exact component = {ElementsList} /> */}
      <Route path='/elements/create' exact component = {CreateElement} />
      <Route path='/elements' exact component = {ElementsList} />     
      <Route path='/elements/edit/:id' exact component = {ManageElement} />     
      <Route path='/tracks/create' exact component = {CreateTrack} />
      {/* <Route path='/tracks' exact component = {ElementsTrack} />     
      <Route path='/tracks/edit/:id' exact component = {ManageTrack} />      */}
      </div>
    </Router>
  );
}

export default App;
