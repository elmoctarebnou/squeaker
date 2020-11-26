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
    const {title, content, author_id} = this.state;
    const newArticle = {
    title,
    content,
    author_id,
    date_ft: Date()
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
        <form onSubmit={this.handleSubmit} className='form-squeak'>
          <input onChange={this.handleUpdate} name='title' type='text' placeholder='Squeak title' maxLength='100' required/>
          <textarea onChange={this.handleUpdate} name='content' placeholder='Squeak using markdown' required/>
          <button>Squeak</button>
        </form>
      </>
    )
  }
}