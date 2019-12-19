import data from '../data/products.json';
import * as types from './../constants/action-types';

var initialState = data.products;

const products = (state = initialState, action) => {
	switch(action.type) {
		case types.ADD_TO_CART:
			var { product } = action;
			product.amount++;
			//console.log(action);
			return [...state];

		case types.GET_PRODUCT:
			// console.log(action);
			var { products } = action;
				for(var x=0;x<products.length;x++) {
					for(var i=0;i<state.length;i++) {
						if(state[i].itemId === products[x].itemId) {
							state[i].amount = products[x].amount;
							state[i].selled = products[x].selled;
						}
					}
				}
					return [...state];

		
		default : return [...state];
	}
};


export default products;

