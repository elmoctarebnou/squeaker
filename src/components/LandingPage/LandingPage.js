import React from 'react';
import './LandingPage.css';
import RegisterForm from '../RegisterForm/RegisterForm'
export default class LandingPage extends React.Component{
  render(){
    return (
      <div className='landing-page'>
        <RegisterForm/>
      </div>
    )
  }
}