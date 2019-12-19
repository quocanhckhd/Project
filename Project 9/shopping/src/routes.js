import React from 'react';
import HomePage from './components/homepage';
import CartPage from './components/cart';
import Signup from './components/signup';
import Signin from './components/signin';
import Bill from './components/bill';
import Admin from './components/admin';
const routes = [
	{
		path: '/',
		exact: true,
		main: (match, location) => <HomePage match={match} location={location}  />
	},
	{
		path: '/cart',
		exact: true,
		main: (match, location) => <CartPage match={match} location={location} />
	},
	{
		path: '/signup',
		exact: true,
		main: (match, location) => <Signup match={match} location={location} />
	},
	{
		path: '/signin',
		exact: true,
		main: ({ match, history, location }) => <Signin match={match} history={history} location={location} />
	},
	{
		path: '/purchase',
		exact: true,
		main: ({ match, history, location }) => <Bill match={match} history={history} location={location} />
	},
	{
		path: '/admin',
		exact: true,
		main: () => <Admin />
	}
];

export default routes;