import React from 'react';
import ApiService from '../../services/api-service';
import ReactMarkdown from 'react-markdown'
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation'
import './Article.css'

export default class Article extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      user:'',
      id: props.match.params.id,
      article: {},
      comments:[],
      newComment: ''
    }
  }
  fetchData = () => {
      ApiService.getArticle(this.state.id)
      .then(res => this.setState({article: res.article, comments: res.comments}))
      .catch ((error) => {
      console.log(error);
      });
  }
  componentDidMount(){
    this.fetchData();
  }
  handleDeleteArticle = async (event) => {
    event.preventDefault();
    console.log(event.currentTarget.id)
    await ApiService.deleteArticle(event.currentTarget.id)
    this.props.history.push('/')
  }
  updateNewComment = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleDeleteComment = (event) => {
    event.preventDefault();
    let id = event.currentTarget.id;
    ApiService.deleteComment(id)
    .then(() => this.fetchData())
    .catch(err => console.log(err));
    
  }
  handleSubmitNewComment = (event) => {
    event.preventDefault();
    
    const newComment = {
      text: this.state.newComment,
      article_id: this.state.id,
      date_ft: Date()
    }
    ApiService.postComment(newComment)
    .then(() => this.fetchData())
    .catch((err) => console.log(err));
    this.setState({newComment: ''})
  }
  render(){
    let article = this.state.article;
    const deleteArticle = article.author_id === article.user_id 
    ? <button id={article.id} type='submit' onClick={this.handleDeleteArticle}><i className="fas fa-trash"></i>  Delete Squeak</button>
    : <></>
    const commentsList = this.state.comments.map((comment) => {
      if(comment.owner){
        return(
          <div key={comment.id} className="comment">
            <h3 className='comment-author'><i className="fas fa-user-circle"></i> {comment.author}</h3>
            <h3 className='comment-text'>{comment.comment}</h3>
            <div>
              <p><i className="far fa-clock"></i> {comment.date_ft.substring(3, 10)} {comment.date_ft.substring(15, 21)} CT</p>
              <button id={comment.id} type='submit' onClick={this.handleDeleteComment}><i className="fas fa-trash"></i></button>
            </div>
          </div>
        )
      }else{
        return(
          <div key={comment.id} className="comment">
            <h3 className='comment-author'><i className="fas fa-user-circle"></i> {comment.author}</h3>
            <h3 className='comment-text'>{comment.comment}</h3>
            <p><i className="far fa-clock"></i> {comment.date_ft.substring(3, 10)} {comment.date_ft.substring(15, 21)} CT</p>
          </div>
        )
      }
    })
    return(this.state.article.title
      ?<div className='article-page'>
        <div key={this.state.id} className='article'>
          <h1>{article.title}</h1>
          <div className='top'>
            <h3 className='author'><i className="fas fa-user-circle"></i> {article.author_name}</h3>
            <h3 className='date'><i className="far fa-calendar-alt"></i> {article.date_ft ? article.date_ft.substring(3, 21) : ''}</h3>
          </div>
          <div><ReactMarkdown source={article.content}/></div>
          {deleteArticle}
        </div>
        <div className='comments'>
          <h1>Discussion <i className="far fa-comment"></i></h1>
          <form onSubmit={this.handleSubmitNewComment}className='comments-form'>
            <textarea value={this.state.newComment} onChange={this.updateNewComment} name='newComment' placeholder='Comment on this squeak' maxLength='100'></textarea>
            <button>Submit</button>
          </form>
        </div>
        <ul>
          {commentsList}
        </ul>
      </div>
      : <LoadingAnimation/>
    )
  }
}