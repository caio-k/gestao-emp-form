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
      <Route exact path="/home" render={() => (<Redirect to="/gestao-emp-form/home"/>)}/>
      <Route exact path="/feedback" render={() => (<Redirect to="/gestao-emp-form/home"/>)}/>
      <Route exact path="/gestao-emp-form" render={() => (<Redirect to="/gestao-emp-form/home"/>)}/>
      <Route exact path='/gestao-emp-form/home' component={Home}/>
      <Route exact path='/gestao-emp-form/feedback' component={Feedback}/>
    </SiteContent>
  </Router>
);

export default Routes
