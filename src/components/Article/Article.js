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
  async componentDidMount(){
    try {
      const data = await ApiService.getArticle(this.state.id);
      this.setState({article: data.article, comments: data.articleComments});
    } catch (error) {
      console.log(error);
    }
  }
  handleDeleteArticle = async (event) => {
    event.preventDefault();
    await ApiService.deleteArticle(this.state.article.id)
    this.props.history.push('/')
  }
  updateNewComment = (event) => {
    this.setState({[event.target.name]: event.target.value})
  }
  handleDeleteComment = async (id) => {
    console.log(id);
    await ApiService.deleteComment(id);
    const updatedComments = this.state.comments.filter(comment => comment.id !== id)
    this.setState({comments: updatedComments});
  }
  handleSubmitNewComment = async (event) => {
    event.preventDefault();
    const newComment = {
      text: this.state.newComment,
      article_id: this.state.id,
      user_id: this.state.article.author_id
    }
    await ApiService.postComment(newComment);
    this.props.history.push(`/articles/${this.state.id}`)
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