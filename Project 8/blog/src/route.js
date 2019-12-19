import React from 'react';
import './App.css';
import NavBar from './components/navbar';
import Signin from './components/signin';
import Signup from './components/signup';
import Post from './components/posts';

const routes = [
	{
		path: '/',
		exact: 	false,
		main: () => <NavBar />
	},
	{
		path: '/signup',
		exact: true,
		main: () => <Signup />
	},
	{
		path: '/signin',
		exact: true,
		main: ({ match, history, location }) => <Signin match={match} history={history} location={location} />
	},
	{
		path: '/posts',
		exact: true,
		main: ({ match, location }) => <Post match={match} location={location} />
	},
	
];

export default routes;