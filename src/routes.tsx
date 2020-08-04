import React from 'react';
import {BrowserRouter, Route} from 'react-router-dom';

// Pages
import Landing from './pages/Landing';
import FreelancersList from './pages/FreelancersList';
import FreelancerForm from './pages/FreelancerForm';

function Routes() {
  return(
    <BrowserRouter>
      <Route path="/" exact component={Landing} />
      <Route path="/search" component={FreelancersList} />
      <Route path="/promote" component={FreelancerForm} />
    </BrowserRouter>
  )
}

export default Routes;