import React from "react";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Dashboard from "./components/dashboard";
import Portfolio from "./components/portfolio";
import Layout from "./components/layout";
import Stocks from "./components/stocks";
import Stock from "./components/stock";
import Cryptos from "./components/cryptos";
import Crypto from "./components/crypto";
import Currencies from "./components/currencies";
import Register from "./components/auth/register";
import Login from "./components/auth/login";

const App = () => {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Dashboard />
          </Route>
          <Route path="/portfolio">
            <Portfolio />
          </Route>
          <Route exact path="/stocks">
            <Stocks />
          </Route>
          <Route path="/stocks/:id">
            <Stock />
          </Route>
          <Route exact path="/cryptos">
            <Cryptos />
          </Route>
          <Route path="/cryptos/:id">
            <Crypto />
          </Route>
          <Route path="/currencies">
            <Currencies />
          </Route>

          <Route path="/register">
            <Register />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
        </Switch>
      </Layout>
    </Router>
  );
};
export default App;
