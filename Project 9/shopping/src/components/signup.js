import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';
import './signup.css';

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			userName: '',
			password: '',
			userCheck: [],
			back: false,
			passCheck: ''
		};
	}

	onChange = (e) => {
		var target = e.target;
    	var name = target.name;
    	var value = target.type === 'checkbox' ? target.checked : target.value;
    	this.setState({ [name] : value });
	}

	addId = (e) => {
		e.preventDefault();
		if(this.state.passCheck === this.state.password) {
			const user = {
				userName: this.state.userName,
				userPass: this.state.password
			}

			if(this.state.userName === '' || this.state.password === '') {
		      alert('Bạn điền thiếu tài khoản hoặc mật khẩu.');
		    } else {
		    	axios.post('http://localhost:8081/api/users/signin', user)
		      .then(res => {
		        const usersCheck = res.data;
		        this.setState({usersCheck : usersCheck });
		        if(this.state.usersCheck[0] === undefined) {
		            const users = this.state.users;
		            users.push(user);
		            this.setState({ users : users });
		            axios.post('http://localhost:8081/api/users', user)
		            // .then(res => console.log(res.data))
		            .catch(err => this.setState({ errors: err.response.data }));
		            alert('Bạn đã đăng kí thành công.');
		            this.setState({ back : true });
		        } else {
		        alert('Tên tài khoản đã tồn tại');
		        }
		      });  
		    }
		} else {
			alert('Mật khẩu không khớp.');
		}
	}


	render() {

		const {userName, password, passCheck } = this.state;

		if(this.state.back) {
			return <Redirect to={`/`} />
		}

		return (
			<div className="container">
				<h1 className="w3ls">Official Signup Form</h1>
					<div className="content-w3ls">
						<div className="content-agile1">
							<h2 className="agileits1">Official</h2> <p className="agileits2">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
						</div>
						<div className="content-agile2">
							<form onSubmit={this.addId}>
								<div className="form-control w3layouts" style={{marginBottom: '20px'}}>	
									<input type="text" id="email"  placeholder="mail@example.com" title="Please enter a valid email"
										onChange={this.onChange}
										value={userName}
										name="userName"
									/>
								</div>

								<div className="form-control agileinfo" style={{marginBottom: '20px'}}>	
									<input type="password" className="lock"  placeholder="Password" id="password1"  
										onChange={this.onChange}
										value={password}
										name="password"
									/>
								</div>	

								<div className="form-control agileinfo" style={{marginBottom: '20px'}}>	
									<input type="password" className="lock"  placeholder="Confirm Password" id="password2"
										onChange={this.onChange}
										value={passCheck}
										name="passCheck"
									/>
								</div>			
								
								<button type="submit" className="register">Register</button>
							</form>
							
							<p className="wthree w3l">Fast Signup With Your Favourite Social Profile</p>
							<ul className="social-agileinfo wthree2">
								<li><Link to={`/sss`}><i className="fa fa-facebook"></i></Link></li>
								<li><Link to={`/s`}><i className="fa fa-youtube"></i></Link></li>
								<li><Link to={`/ss`}><i className="fa fa-twitter"></i></Link></li>
								<li><Link to={`/sssss`}><i className="fa fa-google-plus"></i></Link></li>
							</ul>
						</div>
						<div className="clear"></div>
					</div>
					<p className="copyright w3l">© 2017 Official Signup Form. All Rights Reserved | Design by <Link to={`/ss`}>W3layouts</Link></p>
			</div> 
		);
	}
}

export default Signup;