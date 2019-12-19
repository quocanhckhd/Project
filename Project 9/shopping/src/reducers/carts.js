import * as types from './../constants/action-types';


var initialState = [];

const carts = (state = initialState, action) => {
	switch(action.type) {
		case types.ADD_TO_CART1: 
			const { cart } = action;
			cart.amount++;	
			return [...state];

		case types.PURCHASE: 
			state = [];
			return [...state];

		case types.GET_PRODUCT_ON_CART:
			const { carts } = action; 
			state = carts;
			// console.log(action);
				return [...state];


		case types.SUBSTRACT_TO_CART: 
			
			cart.amount--;	
			return [...state];

		default : return [...state];
	}
}

export default carts;