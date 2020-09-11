import React from 'react';
import ReactDOM from 'react-dom';
import Article from './Article';

it('renders the Article', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Article match={{params:{id:1234}}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
})