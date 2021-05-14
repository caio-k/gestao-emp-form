import React from 'react'
import styled from "styled-components"

import {HashRouter as Router, Redirect, Route} from 'react-router-dom'

import Home from './pages/home'
import Feedback from './pages/feedback'

const SiteContent = styled("div")`
  min-height: calc(100vh - 130px);
`;

const Routes = (props) => (
  <Router basename={"/"}>
    <SiteContent>
        <Route path="/home" component={Home}/>
        <Route path="/feedback" component={Feedback}/>
        <Route exact path="/" render={() => (<Redirect to="/home"/>)}/>
    </SiteContent>
  </Router>
);

export default Routes
