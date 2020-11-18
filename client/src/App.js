import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Navbar from "../src/components/layout/Navbar";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import RecipeState from "./context/recipe/RecipeState";
import AuthState from "./context/auth/Auth_State";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import AlertState from "./context/alert/Alert_State";
import Alerts from "./components/layout/Alerts"
import "materialize-css";
import "./App.css";

const App = () => {
  return (
    <AuthState>
      <RecipeState>
        <AlertState>
          <Router>
            <body>
              <Fragment>
                <Navbar />
                <main>
                  <Alerts/>
                  <Switch>
                    <Route exact path='/' component={Home} />
                    <Route exact path='/about' component={About} />
                    <Route exact path='/register' component={Register} />
                    <Route exact path='/login' component={Login} />
                  </Switch>
                </main>
              </Fragment>
            </body>
          </Router>
        </AlertState>
      </RecipeState>
    </AuthState>
  );
};

export default App;
