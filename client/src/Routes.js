import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import Homepage from "./components/Homepage";
import Login from "./components/Login";
import Nav from "./components/Nav";
import AddPrescription from "./components/AddPrescription";
import UpdatePrescription from "./components/UpdatePrescription";
import ConsumeApi from "./components/ConsumeApi";

function Routes() {
  return (
    <BrowserRouter>
      {/* Navigation Bar */}
      <Nav />

      {/* Body */}
      <Switch>
        <Route path="/login" exact component={Login} />
        <PrivateRoute path="/" exact component={Homepage} />
        <PrivateRoute path="/add" exact component={AddPrescription} />
        <PrivateRoute path="/update/:id" exact component={UpdatePrescription} />
        <PrivateRoute path="/consume" exact component={ConsumeApi} />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
