import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import Navbar from '../src/components/layout/Navbar'
import Home from './components/pages/Home'
import About from './components/pages/About'
import RecipeState from './context/recipe/RecipeState'
import 'materialize-css'
import './App.css';


const App = () => {
  return (
  <RecipeState>
    <Router>
       <body>
        <Fragment>
          <Navbar/>
          <main>
            <Switch>
              <Route exact path = '/' component={Home}/>
              <Route exact path = '/about' component={About}/>
            </Switch>
          </main>
        </Fragment>
      </body> 
    </Router>
  </RecipeState>
  );
}

export default App;
