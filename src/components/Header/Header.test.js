import React from 'react';
import ReactDOM from 'react-dom';
import Header from './Header';

it('renders the Header', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Header login={{login: true}}/>, div);
  ReactDOM.unmountComponentAtNode(div);
})