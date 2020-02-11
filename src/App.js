import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";

import NavbarMain from "./components/navbar.component"
import ElementsList from "./components/elements-list.component";
import CreateElement from "./components/create-element.component";
// import ManageElement from "./components/edit-element.component";
// import CreateUser from "./components/create-user.component";

function App() {
  return (
    <Router>
      <div className='container'>
      <NavbarMain />
      <br />
      {/* <Route path='/elements' exact component = {ElementsList} /> */}
      <Route path='/elements/create' exact component = {CreateElement} />
      <Route path='/elements' exact component = {ElementsList} />     
      {/* <Route path='/elements/edit/:id' exact component = {ManageElement} />       */} 
      {/* <Route path='/user' exact component = {CreateUser} /> */}
      </div>
    </Router>
  );
}

export default App;
