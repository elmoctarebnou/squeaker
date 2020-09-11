import React from 'react';
import ReactDOM from 'react-dom';
import ArticlesList from './ArticlesList';

it('renders the ArticlesList', () => {
  const div = document.createElement('div');
  ReactDOM.render(<ArticlesList />, div);
  ReactDOM.unmountComponentAtNode(div);
})