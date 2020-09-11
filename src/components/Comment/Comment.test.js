import React from 'react';
import ReactDOM from 'react-dom';
import Comment from './Comment';

it('renders the Comment', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Comment comment={{text:'hello'}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
})