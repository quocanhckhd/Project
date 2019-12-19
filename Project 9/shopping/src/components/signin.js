import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom'
import './signin.css'

import { connect } from 'react-redux';
import * as actions from './../actions/index';

class Signin extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userName: '',
			userPass: '',
			userCheck: [],
      		goToPost: false,
      		goToSignup: false
		};
	}

	Signup = () => {
		this.setState({ goToSignup : true });
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
	      userPass: this.state.userPass
	    }

	    this.props.signIn(user);
	    // console.log(this.props.user);
	  }


	render() {
		if(this.state.goToSignup) {
			return <Redirect to={`/signup`}/>
		}
		if(this.props.user[0] !== undefined) {
			 return <Redirect to='/' /> 
		}
			var { userName, userPass } = this.state;
		return (
			<div className="container">
				<div className="main">
					<div className="main-w3l">
						<h1 className="logo-w3">Space Login Form</h1>
						<div className="w3layouts-main">
							<h2><span>Login now</span></h2>
								<form onSubmit={this.onSubmit}>
									<input placeholder="Username or Email" type="text"
										onChange={this.onChange}
										value={userName}
										name="userName"
									/>
									<input placeholder="Password"  type="password" 
										onChange={this.onChange}
										value={userPass}
										name="userPass"
									/>
									<button type="submit" className="submit" style={{ position: 'relative', top: '20px'}}  >Get Started</button>
								</form>
								<h6>Không có tài khoản?      <Link onClick={this.Signup} to={`/signup`}> Đăng ký</Link></h6>
						</div>
						
						<div className="footer-w3l">
							<p>&copy; 2017 Space Login Form. All rights reserved | Design by <Link to={`/ssss`}>W3layouts</Link></p>
						</div>
						
					</div>
				</div>
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		user : state.user,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		currentUser : (user) => {    
			dispatch(actions.currentUser(user));
		},
		signIn : (user) => {
			dispatch(actions.signIn(user));
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Signin);