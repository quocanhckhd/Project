import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Redirect, Link
} from 'react-router-dom';
import axios from 'axios';
class Post extends Component {
	constructor(props) {
		super(props);
		this.state = {
			posts : [
        {
          id:1,
          title:'Businesses, residents hope Malaysia’s East Coast Rail Link will go ahead despite cancellation fears',
          content:'KUALA LUMPUR: Mr Hamid Salleh, 68, has to wait for hours, especially during festive seasons, for his grandchildren to return to Terengganu from Kuala Lumpur.',
          link:`https://www.channelnewsasia.com/news/asia/malaysia-east-coast-rail-link-game-changer-cancellation-11239336`,         
        },
        {
          id:2,
          title:'Trump to avert shutdown, declare "national emergency" to fund border wall',
          link:`https://www.channelnewsasia.com/news/world/trump-to-avert-shutdown-declare-national-emergency-to-fund-11244628`,
          content:`WASHINGTON: US President Donald Trump will sign a spending bill averting a government shutdown but will also issue an emergency declaration to fund his controversial border wall, the White House and lawmakers said on Thursday (Feb 14).`,
        },
        {
          id: 3,
          title: 'SAF regular serviceman dies at Kranji Camp II',
          link: `https://www.channelnewsasia.com/news/singapore/saf-regular-serviceman-die-stairway-landing-kranji-camp-mindef-11244068`,
          content: 'SAF regular serviceman dies at Kranji Camp II',
          
        },
        {
          id:4,
          title: `Singapore economy slows to 3.2% growth in 2018`,
          link: `https://www.channelnewsasia.com/news/singapore/singapore-gdp-economy-slows-in-2018-growth-outlook-2019-11244876`,
          content: `Singapore economy slows to 3.2% growth in 2018`,
          
        },
        {
          id: 5,
          title: 'Singapore tiết lộ thu lợi nhuận lớn nhờ hội nghị Trump - Kim ',
          link: `https://cnalifestyle.channelnewsasia.com/dining/7-unusual-snacks-singapore-bak-chor-mee-coffee-ang-ku-kueh-11241482`,
          content: 'Lượt tìm kiếm về Singapore tăng vọt cùng sự phát triển của ngành du lịch giúp đảo quốc tăng doanh thu và quảng bá rộng rãi hình ảnh đất nước. ',
          
        },
        {
          id: 6,
          title: `Bak chor mee grilled cheese and salted egg hotpot: 7 unusual foods in Singapore`,
          link: `https://www.channelnewsasia.com/news/brandstudio/reimaginehappiness/johannesburg?cid=CNA_7thTile-Johannesburg_Reimaginehappiness_31012019_bstudio`,
          content: `Bak chor mee grilled cheese and salted egg hotpot: 7 unusual foods in Singapore`,
        }
      ],
      news : [
        {
          category: `Business`,
          title: `Mnuchin says US had 'productive' trade meetings with China`
        }, 
        {
          category: `Business`,
          title: `Mnuchin says US had 'productive' trade meetings with China`
        },
        {
          category: `Business`,
          title: `Mnuchin says US had 'productive' trade meetings with China`
        },
        {
          category: `Business`,
          title: `Mnuchin says US had 'productive' trade meetings with China`
        }
      ],

		};
	}
  	componentDidMount() {
	    axios.get(`http://localhost:8081/api/posts`)
	      .then(res => {
	        const posts = res.data;
          console.log(res.data);
          if(res.data.length === 0) {
            this.state.posts.map((post) => {
              axios.post('http://localhost:8081/api/posts',post)
              .then(res => console.log(res.data))
              .catch(err => this.setState({ errors: err.response.data }));
              this.setState({ back : true });
          });
          }
          else {
	        this.setState({ posts : posts });
        }
	    })
  	}

  	
	render() {
    
       var list = null;
       if(this.state.posts.length === 0) {
          return <h5 style={{textAlign: "center"}}>Hiện tại không có bài viết nào. <button className="btn btn-link" onClick={this.newPost}>Thêm bài viết</button></h5>
       } else {
        list = this.state.posts.map((post,i) => (
        
          <div className="col-lg-4 post"   key={i}>
              <a href={`${post.link}`}><p className="row title">{post.title}</p></a>
              <img className="row" src={`../image/${post.id}.jpg`} />
          </div>

      ));
       }

       const newList = this.state.news.map((new1) => (
          <div className="row">
            <h6 style={{ width: "30px", textAlign:"left"}}>{new1.category}</h6>
            <h4>{new1.title}</h4>
          </div>
       ));
   //}
		return (
			<Router>
				<div className="container">
	          		<div className="text-center mb-20 pt-20 row">
	            		<h1>Blog cá nhân</h1>
	            	</div>
                  <div className="row" style={{marginBottom:"30px"}}>
    	            	<div className="col-lg-9" style={{ width : "800px",  marginRight:"10px"}}>
                      <div className="row" style={{ marginBottom:"15px"}}>
                          <h1 style={{ borderBottom: "0.5px solid red", paddingBottom:"10px"}}>Top Stories</h1>                        
                      </div>
    	            		<div className="row">
                        { list }
                      </div>
    	            	</div>
                    <div className="col-lg-3">
                      <div className="row">
                        <h1 style={{ borderBottom: "0.5px solid red", paddingBottom:"10px"}}>Last News</h1>
                      </div>
                      <div className="row" style={{ paddingLeft:"15px"}}>
                        {newList}
                      </div>
                    </div>
                  </div>
	     </div>
            </Router>
		);
	}

}
export default Post;