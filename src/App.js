import React from "react";
import { HashRouter } from "react-router-dom";

import GlobalStyle from './styles/GlobalStyle'
import Routes from './routes'
import Footer from "./components/footer/Footer";

const App = () => (
  <HashRouter>
    <GlobalStyle/>
    <Routes/>
    <Footer/>
  </HashRouter>
)

export default App;
