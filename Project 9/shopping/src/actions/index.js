import * as types from './../constants/action-types';
import callApi from './../utils/apiCaller';
import axios from 'axios';

//Hàm liên quan đến bảng Cart


export const substractToCart = cart => {
	return {
		type: types.SUBSTRACT_TO_CART,
		cart
	};
}

export const addToCartServer = product => {
	return (dispatch) => {
		return callApi('api/carts', 'POST', product).then((res) => {
			dispatch(addToCart(res.data));
			console.log(`${res.data.name} => đã thêm vào giỏ hàng!`);
		});
	};
}

export const upDateToCartServer = product => {
	return (dispatch) => {
		return callApi(`api/carts/${product.itemId}`, 'PUT', product).then((res) => {
			console.log(`Đã cập nhật giỏ hàng thành công!`);
		});
	};
}

export const getProductOnCart = carts => {
	return {
		type: types.GET_PRODUCT_ON_CART,
		carts
	};
}

export const getProductOnCartServer = () => {
	return (dispatch) => {
		return callApi(`api/carts`, 'GET', null).then((res) => {
			dispatch(getProductOnCart(res.data));
		});
	};
}



export const deleteProductOnServer = id => {
	return (dispatch) => {
		return callApi(`api/carts/${id}`, 'DELETE', null).then((res) => {
			dispatch(getProduct(res.data));
		});
	};
}

export const currentUser = user =>  {
	return {
		type: types.CURRENT_USER,
		user
	};
}

export const addToCart1 = cart => {
	return {
		type: types.ADD_TO_CART1,
		cart
	};
}

export const signIn = user => {
	return (dispatch) => {
		return callApi('api/users/signin', 'POST', user).then((res) => {
			if(res.data[0] === undefined ) {
				alert('Tên tài khoản không đúng.');
			} else {
				console.log(`${res.data[0].userName} đã đăng nhập.`);
				dispatch(currentUser(res.data));
			}
		});
	};
}
//Hàm đăng xuất
export const signOut = () => {
	return {
		type: types.SIGN_OUT
	};
}


export const addToBillServer = cart => {
	return (dispatch) => {
		return callApi('api/bills', 'POST', cart).then((res) => {
			console.log(`${res.data.name} => đã thêm vào hóa đơn!`);
		});
	};
}



//Hàm liên quan đến Bill

export const purchase = () => {
	return {
		type: types.PURCHASE
	};
}

export const getProductOnBill = bills => {
	return {
		type: types.GET_PRODUCT_ON_BILL,
		bills
	};
}

export const getProductOnBillServer = () => {
	return (dispatch) => {
		axios.get('http://localhost:8081/api/bills')
		.then(res => {
			console.log(res.data);
			return dispatch(getProductOnBill(res.data));
		});
	};
}

export const updateState = bill => {
	return {
		type: types.UPDATE_STATE,
		bill
	};
}

export const updateStateToServer = bill => {
	return (dispatch) => {
		return callApi(`api/bills/${bill.itemId}`, 'PUT', null).then((res) => {
			dispatch(updateState(res.data));
		});
	};
}

export const deleteFromServer = bill => {
	return (dispatch) => {
		return callApi(`api/bills/${bill.itemId}`, 'DELETE', null).then((res) => {
			console.log(res.data);
		});
	};
}

//Hàm liên quan đến bảng product
export const getProduct = products => {
	return {
		type: types.GET_PRODUCT,
		products
	};
}

export const getProductRequest = () => {
	return (dispatch) => {
		return callApi(`api/products`, 'GET', null).then((res) => {
			dispatch(getProduct(res.data));
		});
	};
}

export const addToCart = product => {
	return {
		type: types.ADD_TO_CART,
		product : product
	};
}

export const addToProductServer = product => {
	return (dispatch) => {
		return callApi(`api/products`, 'POST', product).then((res) => {
			dispatch(addToCart(res.data));
			console.log(`${res.data.name} đã được thêm vào kho sản phẩm.`);
		});
	};
}

export const upDateToProductServer = product => {
	return (dispatch) => {
		return callApi(`api/products/${product.itemId}`, 'PUT', product).then((res) => {
			console.log('Cập nhật kho sản phẩm thành công.');
		});
	};
}

//Đăng sản phẩm lên bảng admin
export const updateStateAdmin = admin => {
	return {
		type: types.UPDATE_STATE_ADMIN,
		admin
	}
}

export const addProductToAdminServer = bill => {
	return (dispatch) => {
		return callApi(`api/admin`, 'POST', bill).then((res) => {
			console.log('Đơn hàng đã được chuyển lên admin.');
		});
	}
}

export const getProductToAdminServer = () => {
	return (dispatch) => {
		return callApi(`api/admin`, 'GET', null).then((res) => {
			dispatch(getProductOnAdmin(res.data));
		});
	};
}

export const getProductOnAdmin = products => {
	return {
		type: types.GET_PRODUCT_ON_ADMIN,
		products
	};
}
export const upDateProductOnCart = product => {
	return (dispatch) => {
		return callApi(`api/admin/${product.itemId}`, 'PUT', product).then((res) => {
			console.log('Mặt hàng đã bán thành công.');
		});
	};
}