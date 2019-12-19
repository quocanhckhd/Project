import * as types from './../constants/action-types';

var initialState = [];

var admin = (state = initialState, action) => {
	switch(action.type) { 
		case types.UPDATE_STATE_ADMIN: 
			var { admin } = action;
			for(var i = 0;i < state.length;i++) {
				if(state[i].itemId === admin.itemId) {
					state[i].state = 'Hàng đã bán'; 
				}
			}
			return [...state];

		case types.GET_PRODUCT_ON_ADMIN:
			var { products } = action;
			state = products;
			return [...state];

		default: return [...state];

	}
};

export default admin;