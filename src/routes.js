import React from 'react'

import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Home from './pages/home'
import Feedback from './pages/feedback'

const Routes = (props) => (
  <Router>
    <Route exact path="/" render={() => (<Redirect to="/home" />)} />
    <Route exact path="/gestao-emp-form" render={() => (<Redirect to="/home" />)} />
    <Route exact path='/home' component={Home} />
    <Route exact path='/feedback' component={Feedback} />
  </Router>
);

export default Routes
