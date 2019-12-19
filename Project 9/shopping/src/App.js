import React, { Component} from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from "react-router-dom";
import routes from './routes';
////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

class App extends Component {
  
  render() {
    return(
      <Router>
        <div className="container-fluid">
        <Switch>
          {this.contentMenu(routes)}
        </Switch>
        </div>
      </Router>
    );
  }

  contentMenu = (routes) => {
    var result  = null;
    result = routes.map((route, index) => {
      return (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          component={route.main}
        />
      );
    }); 
    return result;
  }
}



export default App;

