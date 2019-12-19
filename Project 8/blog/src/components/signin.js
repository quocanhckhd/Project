import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect,
} from 'react-router-dom';
import axios from 'axios';
class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users : [],
      user : {},
      userId: 0,
      userName: '',
      password: '',
      userCheck: [],
      goToPost: false
    }
  }

  onChange = (e) => {
    var target = e.target;
    var name = target.name;
    var value = target.type === 'checkbox' ? target.checked : target.value;
    this.setState({ [name] : value });
  }

  onSubmit = (e) => {
    e.preventDefault();
    const user = {
      userName: this.state.userName,
      userPass: this.state.password
    }
    axios.post('http://localhost:8081/api/users/signin', user)
    .then(res => {
      const usersCheck = res.data;
      this.setState({usersCheck : usersCheck });
      if(this.state.usersCheck[0] === undefined) {
        alert('Tên tài khoản không đúng');
      } else {
        this.setState({ name : this.state.userName });
        this.setState({ goToPost : !this.state.goToPost });
      }
    })
    .catch(err => this.setState({ errors: err.response.data }));
  }


	render() {
    var { userName, password } = this.state;
    var {location} = this.props;

    if(this.state.goToPost) {
      return <Redirect to={{
          pathname: '/posts',
          state: {
            from: location,
            userName: userName
          }
      }} 

      />
    }

		return (
		<Router>	
      <div className='container-fluid'>
        <div className="pannel-body">
            <form className="form" onSubmit={this.onSubmit}>
                      <div className="form-group">
                        <label>userName: </label>
                        <input
                          type="text"
                          required="required"
                          className="form-control"
                          name="userName"
                          value={userName}
                          onChange={this.onChange}
                        />
                      </div>
                        
                      <div className="form-group">
                        <label>userPassWord: </label>
                        <input
                          type="password"
                          required="required"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group text-center">
                        <button type="submit" 
                                className="mr-5 up user-button btn btn-primary" 
                                >
                          Đăng nhập
                        </button> 
                      </div>
            </form>
            </div>
        </div>
     </Router>
		);
	}
}

export default Signin;