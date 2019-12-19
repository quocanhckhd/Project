import * as types from './../constants/action-types';

var initialState = [];

const user = (state = initialState, action) => {
	switch(action.type) {
		case types.CURRENT_USER:
			const { user } = action;
			state = user;
			return [...state];
		case types.SIGN_OUT: 
			state = null;
			return [...state];
		
		default : return [...state];
	}
}

export default user;