import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import * as actions from './../actions/index';
import './carts.css';


class CartPage extends Component {

	constructor(props) {
		super(props);
		this.state = {
			back: false,
		}
	}

	comeback = () => {
		this.setState({
			back: true
		})
	}

	totalPrice = () => {
		var { carts } = this.props;
		var price = 0;
		for(var i = 0;i < carts.length;i++) {
			if(carts[i].userId === this.props.user[0].id) {
				price += carts[i].price * carts[i].amount;
			}
		}
		return price;	
	}

	componentDidMount() {
		this.props.onGetProduct();
	}

	onAdd = (cart) => {
		this.props.onAddAmount(cart);
		this.props.onUpdateToProductServer(cart);
		this.props.onUpdateToCartServer(cart);
	}

	onSubstract = (cart) => {
		this.props.onSubAmount(cart);
		this.props.onUpdateToProductServer(cart);
		this.props.onUpdateToCartServer(cart);
	 }

	onDelete = (cart, id) => {
		const { carts } = this.props;
		carts.splice(id,1);
		this.props.onDeleteRequest(cart.itemId);
	}

	purchase = () => {
		this.props.onPurchase();
		const { carts } = this.props;
		for(var i = 0; i < carts.length;i++) {
			this.props.onAddToBillServer(carts[i]);
		}

		for(var j = 0; j < carts.length; j++) {
			if(carts[j].userId === this.props.user[0].id) {
				this.props.onDeleteRequest(carts[j].itemId);
			}
		}
		alert('Mua hàng thành công. Vào đơn hàng để kiểm tra.');
	}

	render () {
		// console.log(this.props.user[0]);
		const price = this.totalPrice();
		const { carts, user } = this.props;
		var array = [];
		for(var i=0;i < carts.length;i++) {
			if(carts[i].userId === user[0].id) {
				array.push(carts[i]);
			}
		}

		if(user[0] === undefined) {
			return <Redirect to="undefined" />
		}
		const x = (array.length > 0) ? "block" : "none";
		const y = (array.length === 0 || carts === null) ? "block" : "none";

		const list1 = carts.filter(cart => cart.userId = user[0].id);
		const list = list1.map((cart,id) => (
			<tr className="row-cart" key={id}>
				<th scope="row">
					<img src={`${this.props.products[cart.itemId-1].photo}`} alt={`anh-${id-1}`} className="img-fluid z-depth-0 cart-img"/>
				</th>
				<td className="row-cart">
					<h5>
						<strong className="cart-name">{cart.name}</strong>
					</h5>
				</td>
				<td className='cart-price row-cart'>{cart.price}</td>
				<td className="center-on-small-only row-cart">
					<div className="btn-group radio-group" data-toggle="buttons">
						
							<button className="btn btn-primary left-label" onClick={() => this.onSubstract(cart)}> - </button>
						
							<span className="cart-amount"> { cart.amount } </span>
						
							<button className="btn btn-primary right-label" onClick={() => this.onAdd(cart)}> + </button>
						
					</div>
				</td>
				<td className="total row-cart">${cart.price * cart.amount }</td>
				<td className="x row-cart">
					<button type="button" className="btn btn-sm btn-primary waves-effect waves-light" data-toggle="buttons" title="" data-original-title="Remove item"
							onClick={() => this.onDelete(cart, id)}
					>
						X
					</button>
				</td>
			</tr>
		));
		return (
			<div className={`cart container`}>
				<div className="row first-cart">
					<h1 className="title">Giỏ hàng</h1>
				</div>
				<div className={`${y} row buy`}>
					Giỏ hàng hiện tại đang trống.                          
						<Link to={`/`} onClick={this.comeback} className="btn">Mua ngay</Link>
				</div>
				<div className={`row second-cart ${x}`}>
					<table className="table-cart">
						<thead>
							<tr className="row-cart">
								<th></th>
								<th>Sản phẩm</th>
								<th>Giá cả</th>
								<th>Số lượng</th>
								<th>Tổng tiền</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{ list }
						</tbody>
					</table>
				</div>
				<div className={`row final`}>
					<h1 className="sum">Tổng tiền ({carts.length} sản phẩm) : ${price}</h1> 
					<button style={{ cursor: 'pointer' }} onClick={this.purchase} className="purchase">Mua ngay</button>
				</div>
			</div>
		);
	}	

}

const mapStateToProps = state => {
	return {
		products: state.products,
		carts : state.carts,
		user: state.user
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onAddToBillServer : (cart) => {
			dispatch(actions.addToBillServer(cart));
		},
		onSubAmount : (cart) => {
			dispatch(actions.substractToCart(cart));
		},
		onAddAmount : (cart) => {
			dispatch(actions.addToCart1(cart));
		},
		onGetProduct: () => {
			dispatch(actions.getProductOnCartServer());
		},
		onUpdateToCartServer : (cart) => {
			dispatch(actions.upDateToCartServer(cart));
		},
		onDeleteRequest : (id) => {
			dispatch(actions.deleteProductOnServer(id));
		},
		onPurchase: () => {
			dispatch(actions.purchase());
		},
		onUpdateToProductServer : (cart) => {
			dispatch(actions.upDateToProductServer(cart));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(CartPage);