import { combineReducers } from 'redux';
import products from './products';
import carts from './carts';
import user from './user';
import bills from './bills';
import admin from './admin';

const appReducers = combineReducers({
	products,
	carts,
	user,
	bills,
	admin
});

export default appReducers;