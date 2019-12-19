import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import './admin.css';
import axios from 'axios';

class Admin extends Component {
	constructor(props) {
		super(props);
		this.state =  {
			products: {}
		};
	}

	componentDidMount () {
		this.props.onGetProductFromAdminServer();
		axios.get('http://localhost:8081/api/products')
		.then(res => this.setState({ products : res.data }))
		.catch(err => this.setState({ errors: err.response.data }));
	}

	confirm = (admin) => {
		document.getElementById(`confirm ${admin.name}`).disabled = true;
		const { products } = this.state;
		admin.state = "Hàng đã giao";
		this.props.onUpdateState(admin);
		const product = {
			userId : admin.userId,
			itemId: admin.itemId,
			name: admin.name,
			price: admin.price,
			amount: admin.amount
		};

		this.props.onUpdateProductOnAdmin(admin);
		for(var i = 0;i < products.length;i++) {
			if(products[i].itemId === admin.itemId) {
				product.selled = products[i].selled + admin.amount;
			}
		}

		this.props.onUpdateProductOnProductServer(product);
	}

	render () {
		console.log(this.props.admin);
		const list = this.props.admin.map((admin, id) => (
			<tr key={id} className="admin">
				<th className="item" scope="row">
					<img src={`${this.props.products[admin.itemId-1].photo}`} alt={`anh-${id-1}`} className="img-fluid admin-img z-depth-0"/>
				</th>
				<td className="item">
					<h5>
						<strong className="admin-name">{admin.name}</strong>
					</h5>
				</td>
				<td className='admin-price'>${admin.price}</td>
				<td className="center-on-small-only">
					<div className="btn-group radio-group" data-toggle="buttons">

							<span> { admin.amount } </span>

					</div>
				</td>
				<td className="total">${admin.price * admin.amount }</td>
				<td className="state">{admin.state}</td>
				<td>
					<button id={`confirm ${admin.name}`} className="btn btn-primary admin-button" onClick={() => this.confirm(admin)}>Xác nhận đơn hàng</button>
				</td>
			</tr>
		));

		return (
			<div className='admin-container'>
				<table className="admin">
					<thead>
						<tr className='admin'>
							<th></th>
							<th>Tên sản phẩm</th>
							<th>Giá sản phẩm</th>
							<th>Số lượng</th>
							<th>Tổng tiền</th>
							<th>Trạng thái</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{ list }
					</tbody>
				</table>
			</div>
		);
	}

}

const mapStateToProps = state => {
	return {
		products: state.products,
		carts: state.carts,
		bill: state.bill,
		admin: state.admin,
		user: state.user
	};
}


const mapDispatchToProps = (dispatch, props) => {
	return {
		onGetProductFromAdminServer : () => {
			dispatch(actions.getProductToAdminServer());
		},
		onUpdateProductOnAdmin: product => {
			dispatch(actions.upDateProductOnCart(product));
		},
		onUpdateProductOnProductServer : (product) => {
			dispatch(actions.upDateToProductServer(product));
		},
		onUpdateState: admin => {
			dispatch(actions.updateStateAdmin(admin));
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);