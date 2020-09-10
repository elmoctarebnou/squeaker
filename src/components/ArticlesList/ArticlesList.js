import React from "react";
import {Link} from 'react-router-dom';
import ApiService from '../../services/api-service';
import './ArticlesList.css';

export default class ArticlesList extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      articles:[],
      token: this.props.token
    }
  }
  componentDidMount = async () => {
    try {
      const data = await ApiService.getArticles(this.state.token);
      this.setState({articles : data})
    } catch (error) {
      console.error(error.message);
    }
  }
  render() {
    const allArticles = this.state.articles.map((article) => {
      return (
      <div className= 'article-div' key={article.id}>
        <Link to={`/articles/${article.id}`}><h1>{article.title}</h1></Link>
        <p>{article.content}</p>
      </div>
      )
    })
    return (
        <div className='flex-articles'>
          {allArticles}
        </div>
      )
  }
};
