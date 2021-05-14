import React from 'react'
import styled from "styled-components"

import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'

import Home from './pages/home'
import Feedback from './pages/feedback'

const SiteContent = styled("div")`
  min-height: calc(100vh - 130px);
`;

const Routes = (props) => (
  <Router>
    <SiteContent>
        <Route path="/gestao-emp-form/home" component={Home}/>
        <Route path="/gestao-emp-form/feedback" component={Feedback}/>
        <Route exact path="/gestao-emp-form" render={() => (<Redirect to="/gestao-emp-form/home"/>)}/>
    </SiteContent>
  </Router>
);

export default Routes
