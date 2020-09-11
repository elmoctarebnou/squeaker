import React from 'react';
import ReactDOM from 'react-dom';
import RegisterForm from './RegisterForm';

it('renders the RegisterForm', () => {
  const div = document.createElement('div');
  ReactDOM.render(<RegisterForm />, div);

  // clean up code
  ReactDOM.unmountComponentAtNode(div);
})