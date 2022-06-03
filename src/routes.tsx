import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Pages
import Landing from "./pages/Landing";
import FreelancersList from "./pages/FreelancersList";
import FreelancerForm from "./pages/FreelancerForm";
import Contacts from "./pages/Contacts";

function Routes() {
  return (
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/search" component={FreelancersList} />
      <Route path="/promote" component={FreelancerForm} />
      <Route path="/contacts" component={Contacts} />
    </BrowserRouter>
  );
}

export default Routes;
