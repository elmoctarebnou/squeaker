import React from 'react';
import './Comment.css';

export default class Comment extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  render(){
  return (
    <>
      <li>
        <span className='comment'>{this.props.comment.text}</span>
        <br/>
        <button className='delete-comment' id={this.props.comment.id} onClick={(e) => this.props.handleDeleteComment(e.currentTarget.id)}>DELETE</button>
      </li>
    </>
  )
  }
}