import React, { Component} from 'react';
import './product.css';
import { Redirect, Link, BrowserRouter as Router } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from './../actions/index';
import axios from 'axios';

class HomePage extends Component {
	constructor(props) {
		super(props);
		this.state = {
				goToPurchase: false,
				onestar: false,
				twostar: false,
				threestar: false,
				fourstar: false,
				fivestar: false,
				gotoCart: false,
				goToSignin: false,
				goToSignup: false,
				find: '',
				IPhone: false,
				Samsung: false,
				Xiaomi: false,
				Sony: false,
				Philips: false,
				Nokia: false,
				OPPO: false,
				sortIncrease: false,
				sortDecrease: false,
				admin: false,
				view: false,
				bestseller : false,
				new: false
		};
	}

	itemsSellInDay = (product) => {

	}

	toPurchase = () => {
		this.setState({ goToPurchase : true });
	}

	onChange = (e) => {
	    var target = e.target;
	    var name = target.name;
	    var value = target.type === 'checkbox' ? target.checked : target.value;
	    this.setState({ [name] : value });


  	}

  	Admin = () => {
  		this.setState({ admin : true});
  	}
	onGotoCart = () => {
		this.setState({ gotoCart : true });
	}
	Signin = () => {
		this.setState({ goToSignin : true });
	}

	Signup = () => {
		this.setState({ goToSignup : true });
	}

	componentDidMount () {
		this.props.onGetProduct(this.props.products);
		this.props.onGetProductOnCart();
		const user = {
			userName: 'admin',
			userPass: 'admin'
		}
		axios.post('http://localhost:8081/api/users/signin', user)
		.then(res => {
			if(res.data.length === 0) {
				axios.post('http://localhost:8081/api/users', user)
				 .then(res => console.log(res.data))
				.catch(err => this.setState({ errors: err.response.data }));	
			}
		})
		.catch(err => this.setState({ errors: err.response.data }));
	}

	showRating = (rating) => {
		var result = [];
		for(var j = 1;j <= 5-rating;j++) {
			result.push(<i key={6-j} className="fa fa-star-o"></i>);
		}
		for(var i = 1;i <= rating;i++) {
			result.push(<i key={i} className="fa fa-star"></i>);
		}
			return result;

	}

	signOut = () => {
		this.props.signOut();
	}
	
	addToCart = (product) => {
		this.props.onGetProductOnCart();
		var { carts, user } = this.props;
		console.log(carts);
		
		if(user[0] === undefined) {
			alert('Bạn chưa đăng nhập.');
		} else {
			product.userId = user[0].id;
			const product1 = {
				userId: user[0].id,
				itemId: product.itemId,
				amount: 1,
				price: product.price,
				name: product.name
			}
			this.props.onAddToCart(product);
			this.props.onGetProductOnCart();
			// console.log(product.amount);
			if(product.amount === 1) {
				console.log('TH1');
				if(carts.length === 0) {
					 this.props.onAddToCartServer(product);
					 this.props.onAddToProductServer(product);
					 this.props.onGetProductOnCart();
				} else {
					// console.log(`${product.itemId}`);
					for(var i = 0;i < carts.length;i++) {
						// console.log(`${carts[i].itemId}`);
						if(carts[i].itemId === product.itemId) {
							if(carts[i].userId === product.userId) {
								this.props.onUpdateCartAmount(product);
						 		this.props.onAddToProductServer(product);
						 		this.props.onGetProductOnCart();
						 		break;
							} else {
								this.props.onAddToCartServer(product);
								this.props.onUpDateToProductServer(product);
								this.props.onGetProductOnCart();
								break;
							}
						} else {
							this.props.onAddToCartServer(product);
							this.props.onAddToProductServer(product);
							this.props.onGetProductOnCart();
							break;
						}
					}
				}			
			} else {
				console.log('TH2');
				this.props.onGetProductOnCart();
				// if(carts.length === 0) {
				if(carts.length === 0) {					
					this.props.onAddToCartServer(product1);
					this.props.onUpDateToProductServer(product);
					this.props.onGetProductOnCart();
				} else {
					console.log('TH2-else');
					this.props.onGetProductOnCart();
					for(var j = 0;j < carts.length;j++) {
						this.props.onGetProductOnCart();
						console.log(carts[j].itemId, product.itemId);
						if(carts[j].itemId === product.itemId) {
							console.log('if');
							if(carts[j].userId === product.userId) {

								// console.log(carts[j].amount);
								const product2 = {
										userId: user[0].id,
										itemId: product.itemId,
										amount: carts[j].amount+1,
										price: product.price,
										name: product.name
								}
								this.props.onUpdateCartAmount(product2);
						 		this.props.onUpDateToProductServer(product);
						 		this.props.onGetProductOnCart();
						 		break;
							} else {
								console.log('else');
								if(j === carts.length-1) {
									continue;
								} else {
									this.props.onAddToCartServer(product1);
									this.props.onUpDateToProductServer(product);
									this.props.onGetProductOnCart();
									break;
								}
							}
						} else {
						 	 console.log('else1');
						 	if(j === carts.length-1) {
						 		if(carts[j].amount > 1) {
						 			this.props.onAddToCartServer(product);
						 			this.props.onUpDateToProductServer(product);
						 			this.props.onGetProductOnCart();
						 		} else {
						 			this.props.onAddToCartServer(product);
									this.props.onAddToProductServer(product);
									this.props.onGetProductOnCart();
									break;
						 		}
						 	} else {
						 		continue;
						 	}
						}
					}                                  
 				}		
			// }
			 
		}
	}
	this.props.onGetProductOnCart();
}


	render() {
		var { products, user } = this.props;
		// console.log(this.props.user);
		var date = new Date();
		var currentMonth = date.getMonth() + 1;
		var today = date.getFullYear() + "-" + currentMonth + "-" + date.getDate();
		console.log(today);
		var x = (user.length === 0) ? "block" : "none";
		var y = (user.length === 0) ? "none" : "block";
		var name = null;

		 if(user[0] ===  undefined) {
		 	name = '';
		 } else {
		 	name = user[0].userName;
		 	// products.map((product,i) => products[i].userId = user[0].id);
		 	var z = (user[0].userName === 'admin') ? "block1" : "none";
		 	// console.log(`${z}`);
			var t = (user[0].userName === 'admin') ? "none" : "block";
		 }

		 if(this.state.goToPurchase) {
		 	return <Redirect to="/purchase" />
		 }

		if(this.state.admin) {
			return <Redirect to="/admin" />
		}

		if(this.state.gotoCart) {
			if(user[0] === undefined) {
				alert('Bạn chưa đăng nhập.');
			} else {
				return <Redirect to='/cart' />
			}
		}

		if(this.state.goToSignup) {
			return <Redirect 
						to='/signup' 
			/>
		}

		if(this.state.goToSignin) {
			return <Redirect to='/signin' />
		}

		if(this.state.sortIncrease) {
					this.props.products.sort((a,b) => {
						if ((a.price * (100 - a.discount) / 100) < (b.price * (100 - b.discount) / 100)) {return -1;}
				        if ((a.price * (100 - a.discount) / 100) > (b.price * (100 - b.discount) / 100)) {return 1;}
				        return 0;

					});
		} else if(this.state.sortDecrease) {
					this.props.products.sort((a,b) => {
						if ((a.price * (100 - a.discount) / 100) < (b.price * (100 - b.discount) / 100)) {return 1;}
				        if ((a.price * (100 - a.discount) / 100) > (b.price * (100 - b.discount) / 100)) {return -1;}
				        return 0;

					});
		} 	
		if(this.state.view) {
			this.props.products.sort((a,b) => {	
						if (a.count_view < b.count_view) {return 1;}
				        if (a.count_view > b.count_view) {return -1;}
				        return 0;

					});
		}
		if(this.state.new) {
			this.props.products.sort((a,b) => {	
						if (a.selled < b.selled) {return 1;}
				        if (a.selled > b.selled) {return -1;}
				        return 0;

					});
		}
		

		const list = products.map((product, id) => {
			if(this.state.find !== '') {
				if(product.name.search(this.state.find) >= 0) {
					return (
						<div className="product-list-item" key={id}>
							<div className="image" style={{marginBottom: '20px'}}>
								<img
									style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
									alt={`anh-${id-1}`}
									height={100}
									className="product-img"
									title={ product.name }
									src={`${product.photo}`}
								/>
							</div>
							<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
							<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
								<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> 
								<div className="row">
									<strike>${ product.price }</strike> 
									<button className="product-discount">-{product.discount}%</button>
								</div>
							</div>
							
							<div className="product-button">
								<button
									onClick={() => this.addToCart(product)}
									className="btn btn-dark"
								>Add to cart ({product.amount})</button>
							</div>
							<div>
								<div className="product-selled">
									({ product.selled } đã bán)
								</div>
								<ul>
									<li className="product-rating">{this.showRating(product.rating)}</li>
								</ul>	
							</div>
						</div>
					);
				}} 
			else if(this.state.bestseller) {
				if(product.createdAt.slice(0,10) === today) {
					if(product.selled > 2) {
						return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
												({ product.selled } đã bán)
											</div>
											<ul>
												<li className="product-rating">{this.showRating(product.rating)}</li>
											</ul>
											</div>
										</div>
									);
					}
				}
			} else if(this.state.IPhone) {
					if(product.name.search('IPhone') >= 0) {
						if(this.state.onestar) {
								if(product.rating >= 1) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
												({ product.selled } đã bán)
											</div>
											<ul>
												<li className="product-rating">{this.showRating(product.rating)}</li>
											</ul>
											</div>
										</div>
									);
						}} else if(this.state.twostar) {
								if(product.rating >= 2) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
																							<div className="product-selled">
												({ product.selled } đã bán)
											</div>
											<ul>
												<li className="product-rating">{this.showRating(product.rating)}</li>
											</ul>
											</div>
										</div>
									);
						}} else if(this.state.threestar) {
								if(product.rating >= 3) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.fourstar) {
								if(product.rating >= 4) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.fivestar) {
								if(product.rating >= 5) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else {
							return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							)
						}
					}} 
			else if(this.state.Samsung) {
						if(product.name.search('Samsung') >= 0) {

							if(this.state.onestar) {
								if(product.rating >= 1) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.twostar) {
								if(product.rating >= 2) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.threestar) {
								if(product.rating >= 3) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.fourstar) {
								if(product.rating >= 4) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.fivestar) {
								if(product.rating >= 5) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}}

							else return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							)}} 
			else if(this.state.Xiaomi) {
				if(product.name.search('Xiaomi') >= 0) {
					if(this.state.onestar) {
						if(product.rating >= 1) {
							return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							);
				}} else if(this.state.twostar) {
						if(product.rating >= 2) {
							return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							);
				}} else if(this.state.threestar) {
						if(product.rating >= 3) {
							return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							);
				}} else if(this.state.fourstar) {
						if(product.rating >= 4) {
							return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							);
				}} else if(this.state.fivestar) {
						if(product.rating >= 5) {
							return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							);
				}}

					else return (
						<div className="product-list-item" key={id}>
							<div className="image" style={{marginBottom: '20px'}}>
								<img
									style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
									alt={`anh-${id-1}`}
									height={100}
									className="product-img"
									title={ product.name }
									src={`${product.photo}`}
								/>
							</div>
							<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
							<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
								<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
							</div>
							
							<div className="product-button">
								<button
									onClick={() => this.addToCart(product)}
									className="btn btn-dark"
								>Add to cart ({product.amount})</button>
							</div>
							<div>
								<div className="product-selled">
									({ product.selled } đã bán)
								</div>
								<ul>
									<li className="product-rating">{this.showRating(product.rating)}</li>
								</ul>
							</div>
						</div>
					)}

				} 
			else if(this.state.Sony) {
						if(product.name.search('Sony') >= 0) {
							if(this.state.onestar) {
								if(product.rating >= 1) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.twostar) {
								if(product.rating >= 2) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.threestar) {
								if(product.rating >= 3) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.fourstar) {
								if(product.rating >= 4) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.fivestar) {
								if(product.rating >= 5) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}}
							else return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							);}}  
			else if(this.state.Philips) {
						if(product.name.search('Philips') >= 0) {
							if(this.state.onestar) {
								if(product.rating >= 1) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.twostar) {
								if(product.rating >= 2) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.threestar) {
								if(product.rating >= 3) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.fourstar) {
								if(product.rating >= 4) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.fivestar) {
								if(product.rating >= 5) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}}
							else return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							);}} 
			else if(this.state.Nokia) {
						if(product.name.search('Nokia') >= 0) {
							return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							);}} 
			else if(this.state.OPPO) {
						if(product.name.search('OPPO') >= 0) {
							if(this.state.onestar) {
								if(product.rating >= 1) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.twostar) {
								if(product.rating >= 2) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.threestar) {
								if(product.rating >= 3) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.fourstar) {
								if(product.rating >= 4) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}} else if(this.state.fivestar) {
								if(product.rating >= 5) {
									return (
										<div className="product-list-item" key={id}>
											<div className="image" style={{marginBottom: '20px'}}>
												<img
													style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
													alt={`anh-${id-1}`}
													height={100}
													className="product-img"
													title={ product.name }
													src={`${product.photo}`}
												/>
											</div>
											<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
											<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
												<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
											</div>
											
											<div className="product-button">
												<button
													onClick={() => this.addToCart(product)}
													className="btn btn-dark"
												>Add to cart ({product.amount})</button>
											</div>
											<div>
												<div className="product-selled">
													({ product.selled } đã bán)
												</div>
												<ul>
													<li className="product-rating">{this.showRating(product.rating)}</li>
												</ul>
											</div>
										</div>
									);
						}}
							else return (
								<div className="product-list-item" key={id}>
									<div className="image" style={{marginBottom: '20px'}}>
										<img
											style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
											alt={`anh-${id-1}`}
											height={100}
											className="product-img"
											title={ product.name }
											src={`${product.photo}`}
										/>
									</div>
									<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
									<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
										<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
									</div>
									
									<div className="product-button">
										<button
											onClick={() => this.addToCart(product)}
											className="btn btn-dark"
										>Add to cart ({product.amount})</button>
									</div>
									<div>
										<div className="product-selled">
											({ product.selled } đã bán)
										</div>
										<ul>
											<li className="product-rating">{this.showRating(product.rating)}</li>
										</ul>
									</div>
								</div>
							);}}  
			
			
			
					
					
			else if(this.state.twostar) {
				if(product.rating >= 2) {
					return (
						<div className="product-list-item" key={id}>
							<div className="image" style={{marginBottom: '20px'}}>
								<img
									style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
									alt={`anh-${id-1}`}
									height={100}
									className="product-img"
									title={ product.name }
									src={`${product.photo}`}
								/>
							</div>
							<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
							<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
								<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
							</div>
							
							<div className="product-button">
								<button
									onClick={() => this.addToCart(product)}
									className="btn btn-dark"
								>Add to cart ({product.amount})</button>
							</div>
							<div>
								<div className="product-selled">
									({ product.selled } đã bán)
								</div>
								<ul>
									<li className="product-rating">{this.showRating(product.rating)}</li>
								</ul>
							</div>
						</div>
					);
				}}
			else if(this.state.threestar) {
				if(product.rating >= 3) {
					return (
						<div className="product-list-item" key={id}>
							<div className="image" style={{marginBottom: '20px'}}>
								<img
									style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
									alt={`anh-${id-1}`}
									height={100}
									className="product-img"
									title={ product.name }
									src={`${product.photo}`}
								/>
							</div>
							<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
							<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
								<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
							</div>
							
							<div className="product-button">
								<button
									onClick={() => this.addToCart(product)}
									className="btn btn-dark"
								>Add to cart ({product.amount})</button>
							</div>
							<div>
								<div className="product-selled">
									({ product.selled } đã bán)
								</div>
								<ul>
									<li className="product-rating">{this.showRating(product.rating)}</li>
								</ul>
							</div>
						</div>
					);
				}}
			else if(this.state.fourstar) {
				if(product.rating >= 4) {
					return (
						<div className="product-list-item" key={id}>
							<div className="image" style={{marginBottom: '20px'}}>
								<img
									style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
									alt={`anh-${id-1}`}
									height={100}
									className="product-img"
									title={ product.name }
									src={`${product.photo}`}
								/>
							</div>
							<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
							<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
								<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
							</div>
							
							<div className="product-button">
								<button
									onClick={() => this.addToCart(product)}
									className="btn btn-dark"
								>Add to cart ({product.amount})</button>
							</div>
							<div>
								<div className="product-selled">
									({ product.selled } đã bán)
								</div>
								<ul>
									<li className="product-rating">{this.showRating(product.rating)}</li>
								</ul>
							</div>
						</div>
					);
				}}
			else if(this.state.fivestar) {
				if(product.rating >= 5) {
					return (
						<div className="product-list-item" key={id}>
							<div className="image" style={{marginBottom: '20px'}}>
								<img
									style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
									alt={`anh-${id-1}`}
									height={100}
									className="product-img"
									title={ product.name }
									src={`${product.photo}`}
								/>
							</div>
							<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
							<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
								<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
							</div>
							
							<div className="product-button">
								<button
									onClick={() => this.addToCart(product)}
									className="btn btn-dark"
								>Add to cart ({product.amount})</button>
							</div>
							<div>
								<div className="product-selled">
									({ product.selled } đã bán)
								</div>
								<ul>
									<li className="product-rating">{this.showRating(product.rating)}</li>
								</ul>
							</div>
						</div>
					);
				}}

			else {
				return (
					<div className="product-list-item" key={id}>
						<div className="image" style={{marginBottom: '20px'}}>
							<img
								style={{ display:'block', paddingRight:'auto',paddingLeft:'auto'}}
								alt={`anh-${id-1}`}
								height={100}
								className="product-img"
								title={ product.name }
								src={`${product.photo}`}
							/>
						</div>
						<h3 className="product-name" style={{marginBottom: '10px'}}>{ product.name }</h3>
						<div className="product-price" style={{marginBottom: '10px', fontSize:'14px'}}>
							<div className="row product-price-discount"> ${product.price - product.price * product.discount / 100} </div> <div className="row"><strike>${ product.price }</strike> <button className="product-discount">-{product.discount}%</button></div>
						</div>
						
						<div className="product-button">
							<button
								onClick={() => this.addToCart(product)}
								className="btn btn-dark"
							>Add to cart ({product.amount})</button>
						</div>
						<div>
							<div className="product-selled">
								({ product.selled } đã bán)
							</div>
							<ul>
								<li className="product-rating">{this.showRating(product.rating)}</li>
							</ul>
						</div>
					</div>
					)}

		});

		return (
			<Router>
				<div className="container" style={{width: '100%',background: '#ffffff', position:'relative', left:'-15px'}}>
					<div className="row first col-lg-12">
						<div className="row" style={{ width:'100%', height:'10px'}}>
							<ul className='navbar-ul'>
								<li className={`navbar ${y} name`}><div className={`btn btn-link`} to='/signin'> {name} </div>
									<ul>
										<li><Link className="li" to={`/undefined`}>Tài khoản của tôi</Link></li>
										<li><Link onClick={this.toPurchase} className="li" to ={`/purchase`}>Đơn hàng</Link></li>
										<li><Link className="li" to={`/signin`} onClick={this.signOut}>Đăng xuất</Link></li>
									</ul>
								</li>
								<li className={`navbar ${x}`}><Link onClick={this.Signin} className={`btn btn-link`} to='/signin'>  Đăng nhập    <i className="fa fa-sign-in"></i></Link></li>
								<li className={`navbar none ${z}`}><Link onClick={this.Admin} className={`btn btn-link`} to='/admin'>Quản lý trang web         <i className="fa fa-user-plus"></i>  </Link></li>
								<li className={`navbar ${t}`}><Link onClick={this.Signup} className={`btn btn-link`} to='/signup'> Đăng ký   <i className="fa fa-user-plus"></i>  </Link></li>
								<li className="navbar"><Link to='/annouce' className='btn btn-link'>Thông báo    <i className="fa fa-bell"></i></Link></li>
							</ul>
						</div>
						<div className="row under">
							<div className="row col-lg-2" style={{ marginLeft:'20px'}}>
								<Link to="/">
									<img 
										style={{ position: 'relative', top:'15px'}}
										className="logo"
										alt={`anh-logo`} 
										src={`../products/logo.png`} 

									/>
								</Link>
							</div>
							<div className="row col-lg-8">
								<input 
									style={{ background: "#ffffff", position: 'relative',top:'-30px', left:'210px', height: '20px', width:'90%', color: 'black'}}
									type="text" 
									className="form-control" 
									id="usr" 
									placeholder="Tìm sản phẩm"
									name="find"
									onChange={this.onChange}
								/>
							</div>
							<div className="row col-lg-2">
								<Link to="/cart" onClick={this.onGotoCart}><i className="fa fa-shopping-cart" style={{fontSize:'30px', position:'relative', top:'-40px', left:'300px'}}></i></Link>
							</div>
						</div>
					</div>
					<div className="row col-lg-12">
						<div className="row col-lg-2" style={{background: '#ffffff', height:'1000%', marginBottom: '20px', paddingLeft:'15px'}}>
							<div className="row" style={{ marginBottom: '20px'}}>
								<h4 style={{ position: 'relative', left:'10px'}}><i className="fa fa-filter"></i>   Bộ lọc tìm kiếm </h4>
							</div>
							<div className="row sell">
								<h4 style={{ marginBottom: '20px', position:'relative', left:'10px'}}>Mặt hàng</h4>
								<div className="form-check">
									
									  	<input onClick={this.onChange} type="checkbox" name="bestseller" /> Bán chạy nhất
									
								</div>
								<div className="form-check">
									
									  	<input onClick={this.onChange} type="checkbox" name="view" /> Lượt xem nhiều nhất
									
								</div>
							</div>
							<div className="row form">
								<h4 style={{ marginBottom: '20px', position:'relative', left:'10px'}}>Loại hàng</h4>
								<div className="form-check">
									
									   <input onClick={this.onChange} type="checkbox" className="form-check-input" name="IPhone" /> IPhone
								
								</div>
								<div className="form-check">
									
									   <input onClick={this.onChange} type="checkbox" className="form-check-input" name="Samsung" /> Samsung
									
								</div> 
								<div className="form-check">
									
									   <input onClick={this.onChange} type="checkbox" className="form-check-input" name="Xiaomi" /> Xiaomi
									
								</div> 
								<div className="form-check">
									
									   <input onClick={this.onChange} type="checkbox" className="form-check-input" name="Sony" /> Sony
									
								</div> 
								<div className="form-check">
									
									   <input onClick={this.onChange} type="checkbox" className="form-check-input" name="Philips" /> Philips
									
								</div> 

								<div className="form-check">
									
									  	<input onClick={this.onChange} type="checkbox" className="form-check-input" name="Nokia" /> Nokia
									
								</div>
								<div className="form-check">
									
									   <input onClick={this.onChange} type="checkbox" className="form-check-input" name="OPPO" /> Oppo

								</div> 	
							</div>	
							<div className="row sort" style={{ marginTop: '20px'}}>
								<h4 style={{ marginBottom: '20px', position:'relative', left:'10px'}}>Sắp xếp theo giá</h4>
								<div className="form-check">
									
									  	<input onClick={this.onChange} type="checkbox" name="sortIncrease" className="form-check-input" id="increase" /> Từ thấp đến cao
									
								</div>	
								<div className="form-check">
									
									  	<input onClick={this.onChange} type="checkbox" name="sortDecrease" className="form-check-input" id="reduce" /> Từ cao xuống thấp
									
								</div>
							</div>
							<div className="row rate" style={{ marginTop: '20px'}} >
								<h4 style={{ marginBottom: '20px', position:'relative', left:'10px'}}>Đánh giá</h4>
								<div className="form-check">
									
									  	<input onClick={this.onChange} type="checkbox" name="onestar" className="1star" id="1-star" /> <i className="fa fa-star-o sao"></i><i className="fa fa-star-o sao"></i><i className="fa fa-star-o sao"></i><i className="fa fa-star-o sao"></i><i className="fa fa-star sao"></i> <span className="rating-up">trở lên</span>
									
								</div>
								<div className="form-check">
									
									  	<input onClick={this.onChange} type="checkbox" name="twostar" className="2star" id="2-star" /> <i className="fa fa-star-o sao"></i><i className="fa fa-star-o sao"></i><i className="fa fa-star-o sao"></i><i className="fa fa-star sao"></i><i className="fa fa-star sao"></i> <span className="rating-up">trở lên</span>
									
								</div>
								<div className="form-check">
									
									  	<input onClick={this.onChange} type="checkbox" name="threestar" className="3star" id="3-star" /> <i className="fa fa-star-o sao"></i><i className="fa fa-star-o sao"></i><i className="fa fa-star sao"></i><i className="fa fa-star sao"></i><i className="fa fa-star sao"></i> <span className="rating-up">trở lên</span>
									
								</div>
								<div className="form-check">
									
									  	<input onClick={this.onChange} type="checkbox" name="fourstar" className="4star" id="4-star" /> <i className="fa fa-star-o sao"></i><i className="fa fa-star sao"></i><i className="fa fa-star sao"></i><i className="fa fa-star sao"></i><i className="fa fa-star sao"></i> <span className="rating-up">trở lên</span>
									
								</div>
								<div className="form-check">
									
									  	<input onClick={this.onChange} type="checkbox" name="fivestar" className="5star" id="5-star" /> <i className="fa fa-star sao"></i><i className="fa fa-star sao"></i><i className="fa fa-star sao"></i><i className="fa fa-star sao"></i><i className="fa fa-star sao"></i>
									
								</div>
							</div>
							
						</div>
						<div className="row col-lg-10 product-listing">
							{list}
						</div>
					</div>
				</div>
			</Router>
		);
	}
}

const mapStateToProps = state => {
	return {
		products : state.products,
		user : state.user,
		carts : state.carts,
	}
}

const mapDispatchToProps = (dispatch, props) => {
	return {
		signOut : () => {
			dispatch(actions.signOut());
		},
		onAddToCart : (product) => {
			dispatch(actions.addToCart(product));
		},
		onAddToCartServer : (product) => {
			dispatch(actions.addToCartServer(product));
		},
		onUpdateCartAmount : (product) => {
			dispatch(actions.upDateToCartServer(product));
		},
		onGetProduct : (products) => {
			dispatch(actions.getProductRequest(products));
		},
		onAddToProductServer : (product) => {
			dispatch(actions.addToProductServer(product));
		},
		onUpDateToProductServer : (product) => {
			dispatch(actions.upDateToProductServer(product));
		},
		onGetProductOnCart : () => {
			dispatch(actions.getProductOnCartServer());
		}
	}}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);