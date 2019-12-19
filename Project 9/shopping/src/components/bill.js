import  React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from './../actions/index';
import './bill.css';


class Bill extends Component {


	componentDidMount() {
		const { bills, user } = this.props;
		this.props.onGetProduct();
		this.props.onGetProductFromAdminServer();
		const list = bills.filter(bill => bill.userId = user[0].id);
		console.log(list);
		for(var i = 0;i < list.length;i++) {
			if(list[i].state === "Đang giao hàng") {
				document.getElementById(`giaohang ${i}`).style.display = 'none';
				document.getElementById(`xacnhan ${i}`).style.display = 'inline-block';
			}
		}
	}

	delivery = (bill,id) => {
		document.getElementById(`canceled ${bill.name}`).disabled = true;
		if(bill.state === 'Đang giao hàng') {			
			document.getElementById(`giaohang ${id}`).style.display = 'none';
			document.getElementById(`xacnhan ${id}`).style.display = 'inline-block';
		}
		this.props.onUpdateState(bill);
		this.props.onUpdateStateServer(bill);
		if(bill.state === 'Đang giao hàng') {
			this.props.onAddProductToAdminServer(bill);
		}
		console.log(`${bill.state}`);
		this.props.onGetProductFromAdminServer();
	}

	confirm = (bill, id, list1) => {
		var { admin } = this.props;
			for(var i = 0;i < admin.length;i++) {
				if(admin[i].itemId === bill.itemId) {
					if(admin[i].state === 'Hàng đã giao') {
						alert(`${bill.name} đã được giao cho khách hàng ${this.props.user[0].userName}`);
						list1.splice(id,1);
						this.props.onDelete(bill);
						break;
					} else {
						alert('Hàng chưa được bên bán giao tới nơi.');
					}
				}
			}
	}

	onDelete = (bill, id) => {
		if(bill.state ===  "Đang giao hàng") {
			alert('Không thể hủy đơn hàng.');
		} else {
			var { bills } = this.props;
			bills.splice(id,1);
			this.props.onDelete(bill);
		}
	}
	render () {
			const { user, bills } = this.props;
			if(this.props.user[0] === undefined) {
				return <Redirect to="/undefined" />
			}

			const x = (bills.length > 0) ? "block" : "none";
			const y = (bills.length === 0 ) ? "block" : "none";

			
			const list1 = bills.filter(bill => bill.userId = user[0].id);
			
			const list = list1.map((bill,id) => (
				<tr key={id}>
					<th className="item" scope="row">
						<img src={`${this.props.products[bill.itemId-1].photo}`} alt={`anh-${id-1}`} className="img-fluid bill-img z-depth-0"/>
					</th>
					<td className="item">
						<h5>
							<strong className="bill-name">{bill.name}</strong>
						</h5>
					</td>
					<td className='bill-price'>${bill.price}</td>
					<td className="center-on-small-only">
						<div className="btn-group radio-group" data-toggle="buttons">
			
								<span> { bill.amount } </span>

						</div>
					</td>
					<td className="total">${bill.price * bill.amount }</td>
					<td className="state">{bill.state}</td>
					<td className="x">
						<button id={ `giaohang ${id}`} type="button" className={`delivery giao btn btn-sm btn-primary waves-effect waves-light`} data-toggle="buttons" title="" data-original-title="Remove item"
								onClick={() => this.delivery(bill, id)}
						>
							Giao hàng
						</button>
						<button id={ `xacnhan ${id}`} type="button" className={`delivery btn btn-sm btn-primary waves-effect waves-light none`} data-toggle="buttons" title="" data-original-title="Remove item"
								onClick={() => this.confirm(bill, id, list1)}
						>
							Xác nhận đã nhận hàng
						</button>
						<button id={`canceled ${bill.name}`} type="button" className="delete btn btn-sm btn-primary waves-effect waves-light" data-toggle="buttons" title="" data-original-title="Remove item"
								onClick={() => this.onDelete(bill, id)}
						>
							Hủy
						</button>
					</td>
				</tr>
			));
		 
		return (
			<div className="Bill">
				<div className={`row ${y}`}>
					Hiện không có đơn hàng nào.
				</div>
				<div className={`row ${x}`}>
					<div className="title1">
						<h1>Đơn hàng đã đặt</h1>
					</div>
					<div className="row">
						<table className="bill">
							<thead>
								<tr className="bill">
									<th></th>
									<th className="item">Sản phẩm</th>
									<th>Giá cả</th>
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
				</div>
			</div>
		);
	}

}
const mapStateToProps = state => {
	return {
		products: state.products,
		bills: state.bills,
		user: state.user,
		admin: state.admin
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		onGetProduct : () => {
			dispatch(actions.getProductOnBillServer());
		},
		onUpdateStateServer: bill => {
			dispatch(actions.updateStateToServer(bill));
		},
		onUpdateState: bill => {
			dispatch(actions.updateState(bill));
		},
		onDelete : bill => {
			dispatch(actions.deleteFromServer(bill));
		},
		onAddProductToAdminServer: bill => {
			dispatch(actions.addProductToAdminServer(bill));
		},
		onGetProductFromAdminServer: () => {
			dispatch(actions.getProductToAdminServer());
		}
	};
}

export default connect(mapStateToProps, mapDispatchToProps)(Bill);