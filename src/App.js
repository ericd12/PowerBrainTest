import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
// import "bootstrap/dist/js/bootstrap.min.js";

import NavbarMain from "./components/navbar.component";

import CreateElement from "./components/elements/create-element.component";
import ManageElement from "./components/elements/manage-element.component";
import ElementsList from "./components/elements/elements-list.component";

import CreateFormat from "./components/elements/dropdown-items/create-format.component";
import CreateCategory from "./components/elements/dropdown-items/create-category.component";
import ManageCategory from "./components/elements/dropdown-items/manage-category.component";
import CreateMarket from "./components/elements/dropdown-items/create-market.component";

import CreateTrack from "./components/tracks/create-track.component";
import ManageTrack from "./components/tracks/manage-track.component";
import TracksList from "./components/tracks/tracks-list.component";

import CreateProgram from "./components/programs/create-program.component";
import ManageProgram from "./components/programs/manage-program.component";
import ProgramsList from "./components/programs/programs-list.component";

const App = () => {
  return (
    <Router>
      <div id="App">
        <NavbarMain />
        <br />
        <Route component={ElementsList} exact path="/elements" />
        <Route component={CreateElement} exact path="/elements/create" />
        <Route component={ManageElement} exact path="/elements/edit/:id" />

        <Route component={CreateFormat} exact path="/formats/create" />
        <Route component={CreateCategory} exact path="/categories/create" />
        <Route component={ManageCategory} exact path="/categories/edit/:id" />
        <Route component={CreateMarket} exact path="/markets/create" />

        <Route component={TracksList} exact path="/tracks" />
        <Route component={CreateTrack} exact path="/tracks/create" />
        <Route component={ManageTrack} exact path="/tracks/edit/:id" />

        <Route component={ProgramsList} exact path="/programs" />
        <Route component={CreateProgram} exact path="/programs/create" />
        <Route component={ManageProgram} exact path="/programs/edit/:id" />
      </div>
    </Router>
  );
};

export default App;
