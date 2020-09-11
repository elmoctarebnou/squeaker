import React from 'react';
import ReactDOM from 'react-dom';
import CreateArticle from './CreateArticle';

it('renders the CreateArticle', () => {
  const div = document.createElement('div');
  ReactDOM.render(<CreateArticle />, div);
  ReactDOM.unmountComponentAtNode(div);
})