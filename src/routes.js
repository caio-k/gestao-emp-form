import React from 'react'

import {BrowserRouter as Router, Redirect, Route} from 'react-router-dom'

import Home from './pages/home'
import Feedback from './pages/feedback'

const Routes = (props) => (
  <Router>
    <Route exact path="/gestao-emp-form" render={() => (<Redirect to="/gestao-emp-form/home"/>)}/>
    <Route exact path='/gestao-emp-form/home' component={Home}/>
    <Route exact path='/gestao-emp-form/feedback' component={Feedback}/>
  </Router>
);

export default Routes
