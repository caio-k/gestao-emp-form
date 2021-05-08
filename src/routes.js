import React from 'react'

import { BrowserRouter as Router, Route } from 'react-router-dom'

import Home from './pages/home'
import Feedback from './pages/feedback'

const Routes = (props) => (
  <Router>
    <Route path='/home' component={Home} />
    <Route path='/feedback' component={Feedback} />
  </Router>
);

export default Routes
