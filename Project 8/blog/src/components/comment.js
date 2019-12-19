import React from 'react';
import axios from 'axios';
import './components.css';
class Comment extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			id: 0,
			comments: [],
			comment: {},
			name: '',
			value: '',

		};
	}

	onChange = (e) => {
		var target = e.target;
    	var name = target.name;
    	var value = target.type === 'checkbox' ? target.checked : target.value;
    	this.setState({ [name] : value });
	}

	addComment = () => {
		const match = this.props.match;
		const id = match.params.id;
		const comments = this.state.comments;
		const comment = {
			commentId: id,
			name: this.state.name,
			value: this.state.value
		}
		comments.push(comment);
		this.setState({ comments : comments });
		axios.post('http://localhost:8081/api/comments',comment)
    	.then(res => console.log(res.data))
    	.catch(err => this.setState({ errors: err.response.data }));
    }

    displayComment = () => {
    	const match = this.props.match;
  		const id = match.params.id;
		axios.get(`http://localhost:8081/api/comments/${id}`)
	      	.then(res => {
	        const comments = res.data;
	        this.setState({ comments : comments });
    	})
	}
	render() {
		var {location} = this.props;
		var userName = location.state.userName;
		const { value } = this.state;
		
		const listCommment = this.state.comments.map((comment,index) => (
			<li className="list-group-item" key={index}>{userName}<span>:</span>{comment.value}</li>
		)); 

		return (
			<div className='container-fluid'>
				<div className="row">
					<p>Những bình luận trước: </p>
					<ul className="list-group">
						{listCommment}
					</ul>
					<button onClick={ () => this.displayComment() }>Hien thi tat ca</button>
				</div>


				<div className="row">
					<textarea
								type="text"
							  	value={value}
							  	name="value"
					 			onChange={this.onChange} 
					 			style={{width: "1310px", height: "200px"}}>
					</textarea>
				</div>

				<div className="row">
					<button className="btn btn-primary" onClick={() => this.addComment()}>Bình luận</button>
				</div>
			</div>
		);
	}
}			

export default Comment;