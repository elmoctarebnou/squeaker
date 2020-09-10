import React from 'react';
import './CreateArticle.css';
import ApiService from '../../services/api-service';
export default class CreateArticleForm extends React.Component {
  state = {
    title: '',
    content: '',
    author_id: this.props.user_id
  }
  handleUpdate = (event) => {
    this.setState({[event.currentTarget.name]: event.currentTarget.value})
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const newArticle = {
      title: this.state.title,
      content: this.state.content,
      author_id: this.state.author_id
      }
      await ApiService.postArticle(newArticle);
      this.props.history.push('/')
    } catch (error) {
      console.log(error)
    }
    
  }
  render(){
    return(
      <>
        <form onSubmit={this.handleSubmit} className='form-new-article'>
          <input onChange={this.handleUpdate} name='title' type='text' placeholder='Article title'/>
          <textarea onChange={this.handleUpdate} name='content' placeholder='article'/>
          <button>POST</button>
        </form>
      </>
    )
  }
}