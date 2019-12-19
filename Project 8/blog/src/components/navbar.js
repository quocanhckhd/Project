import React, { Component } from 'react';

import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink
} from "react-router-dom";
import './components.css';
import Signin from './signin';
import Signup from './signup';
import Post from './posts';

const MenuLink = (({ label, to, activeOnlyWhenExact}) => {
  return (
    <Route path={to} exact={activeOnlyWhenExact} children={({match}) => {
      var active = match ? 'active' : '';
      return (
        <li className={active}>
          <NavLink to={to}>
            { label }
          </NavLink>
        </li>
      );
    }} />
  );
});

class NavBar extends Component {

  render() {
    return (
      <Router>
        <div >
          <div>
            <nav className="navbar navbar-default">
                <ul className="nav navbar-nav">
                  <MenuLink className="left" label="Bài viết" to='/posts' activeOnlyWhenExact={true}/>
                  <MenuLink label="Đăng nhập" to='/signin' activeOnlyWhenExact={true} />
                  <MenuLink label="Đăng ký" to='/signup' activeOnlyWhenExact={true} />
                </ul>
            </nav>
            <Switch>
              <Route  exact path='/posts' component={Post} />
              <Route  exact path='/signin' component={Signin} />
              <Route  exact path='/signup' component={Signup} />
            </Switch>
          </div>
          <div className="row">

          </div>
        </div>
      </Router>
    );
  }
}

export default NavBar;