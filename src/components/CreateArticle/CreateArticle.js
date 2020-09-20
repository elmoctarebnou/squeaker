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
  handleSubmit = (event) => {
    event.preventDefault();
    const newArticle = {
    title: this.state.title,
    content: this.state.content,
    author_id: this.state.author_id
    }
    ApiService.postArticle(newArticle)
    .then(res => console.log('Article posted'))
    .catch(err => {
      console.log(err)
    });
    this.props.history.push('/'); 
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