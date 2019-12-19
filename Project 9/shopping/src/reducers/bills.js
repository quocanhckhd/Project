import * as types from './../constants/action-types';


var initialState = [];

const bills = (state = initialState, action) => {
	switch(action.type) {

		case types.GET_PRODUCT_ON_BILL:
			var { bills } = action;
			console.log(action);
			state = bills;
			return [...state];
		
		case types.UPDATE_STATE:
			var { bill } = action;
			for(var i = 0;i < state.length;i++) {
				if(state[i].itemId === bill.itemId) {
					state[i].state = 'Đang giao hàng'; 
				}
			}
			return [...state];


		default : return [...state];
	}
}

export default bills;