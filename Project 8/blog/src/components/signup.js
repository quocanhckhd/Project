import React, { Component } from 'react';
import {  BrowserRouter as Router, Redirect } from 'react-router-dom';
import axios from 'axios';
class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users : [],
			user : {},
			userId: 0,
			userName: '',
			password: '',
			userCheck: [],
			back : false
		}
	}

	onChange = (e) => {
		var target = e.target;
		var name = target.name;
		var value = target.type === 'checkbox' ? target.checked : target.value;
		this.setState({ [name] : value });
	}


  	Signup = () => {
    	const user = {
	      userName : this.state.userName,
	      userPass : this.state.password
    	}
	    if(this.state.userName === '' || this.state.password === '') {
	      alert('Bạn điền thiếu tài khoản hoặc mật khẩu.');
	    }
	    else {
	      axios.post('http://localhost:8081/api/users/signin', user)
	      .then(res => {
	        const usersCheck = res.data;
	        this.setState({usersCheck : usersCheck });
	        if(this.state.usersCheck[0] === undefined) {
	            const users = this.state.users;
	            users.push(user);
	            this.setState({ users : users });
	            axios.post('http://localhost:8081/api/users', user)
	            .then(res => console.log(res.data))
	            .catch(err => this.setState({ errors: err.response.data }));
	            alert('Bạn đã đăng kí thành công.');
	            this.setState({ back : !this.state.back });
	        } else {
	        alert('Tên tài khoản đã tồn tại');
	        }
	      });  
	    }
  	}

	render() {
		const { userName, password } = this.state;
		if(this.state.back) {
			return <Redirect to='/' />
		}
		return(
			<Router>
			<div className="row">
			<div className="pannel-body">
                    <form className="form">
                      <div className="form-group">
                        <label>userName: </label>
                        <input
                          type="text"
                          required="required"
                          className="form-control"
                          value={userName}
                          name="userName"
                          onChange={this.onChange}
                        />
                      </div>
                        
                      <div className="form-group">
                        <label>passwordWord: </label>
                        <input
                          type="password"
                          required="required"
                          className="form-control"
                          value={password}
                          name="password"
                          onChange={this.onChange}
                        />
                      </div>
                      <div className="form-group text-center">
                        <button type="button" 
                                className="mr-5 up user-button btn btn-primary" 
                                onClick={this.Signup}>
                          Đăng ký
                        </button> 
                      </div>
                    </form>
            </div>
            </div>
            </Router>
		);
	}
}

export default Signup;