import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "@atlaskit/css-reset";
import "bootstrap/dist/css/bootstrap.min.css";

import NavbarMain from "./components/NavbarMain";

import CreateElement from "./components/Elements/CreateElement";
import ManageElement from "./components/Elements/ManageElement";
import ElementsList from "./components/Elements/ElementsList";

import CreateFormat from "./components/Elements/DropdownItems/CreateFormat";
import CreateCategory from "./components/Elements/DropdownItems/CreateCategory";
import ManageCategory from "./components/Elements/DropdownItems/ManageCategory";
import CreateMarket from "./components/Elements/DropdownItems/CreateMarket";

import CreateTrack from "./components/Tracks/CreateTrack";
import ManageTrack from "./components/Tracks/ManageTrack";
import TracksList from "./components/Tracks/TracksList";

import CreateProgram from "./components/Programs/CreateProgram";
import ManageProgram from "./components/Programs/ManageProgram";
import ProgramsList from "./components/Programs/ProgramsList";

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
