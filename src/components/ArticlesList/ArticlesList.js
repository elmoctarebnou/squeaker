import React from "react";
import {Link} from 'react-router-dom';
import ApiService from '../../services/api-service';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'
import './ArticlesList.css';

export default class ArticlesList extends React.Component {
  
  state = {
      articles:[]
    }
  fetchArticles = () => {
    ApiService.getArticles()
    .then((res) => this.setState({articles : res}));
  }
  componentDidMount = async () => {
    this.fetchArticles();
  }
  render() {
    let allArticles = this.state.articles.reverse().map((article) => {
      return (
      <Link key={article.id} to={`/squeakes/${article.id}`}>
        <div className= 'article-div' key={article.id}>
          <div className='head'>
            <h1 className='author'><i className="fas fa-user-circle"></i> {article.author_name}</h1>
            <h1 className='title'>{article.title}</h1>
          </div>
          <div className='info'>
            <h4 className='comments'><i className="far fa-comment"></i> {article.comments} comments</h4>
            <h4 className='date'><i className="far fa-calendar-alt"></i> {article.date_ft.substring(0, 15)}</h4>
          </div>
        </div>
      </Link>
      )
    })
    return (
        <div className='flex-articles'>
          {this.state.articles.length !== 0 ? allArticles : <LoadingAnimation/>}
        </div>
      )
  }
};
