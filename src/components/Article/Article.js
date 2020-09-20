import React from 'react';
import ApiService from '../../services/api-service';
import Comment from '../Comment/Comment';
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
      .then(res => this.setState({article: res.article, comments: res.articleComments}))
      .catch ((error) => {
      console.log(error);
      });
  }
  componentDidMount(){
    this.fetchData();
  }
  handleDeleteArticle = async (event) => {
    event.preventDefault();
    await ApiService.deleteArticle(this.state.article.id)
    this.props.history.push('/')
  }
  updateNewComment = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleDeleteComment = (id) => {
    ApiService.deleteComment(id)
    .then(() => this.fetchData())
    .catch(err => console.log(err));
    
  }
  handleSubmitNewComment = (event) => {
    event.preventDefault();
    const newComment = {
      text: this.state.newComment,
      article_id: this.state.id,
      user_id: this.state.article.author_id
    }
    ApiService.postComment(newComment)
    .then(() => this.fetchData())
    .catch((err) => console.log(err));
    
  }
  render(){
    const commentsList = this.state.comments.map((comment) => {
     return <Comment key={comment.id} comment={comment} handleDeleteComment={this.handleDeleteComment}/>
    })
    
    return(
      <>
        <div key={this.state.id} className='article'>
          <h1>{this.state.article.title}</h1>
          <p>{this.state.article.content}</p>
          <button onClick={this.handleDeleteArticle}>DELETE ARTICLE</button>
        </div>
        <div className='new-comment'>
          <h1>DISCUSSION</h1>
          <form onSubmit={this.handleSubmitNewComment}className='comments-form'>
            <textarea onChange={this.updateNewComment} name='newComment' placeholder='Add to to discussion'></textarea>
            <button>SUBMIT</button>
          </form>
          <ul>
            {commentsList}
          </ul>
        </div>
      </>
    )
  }
}