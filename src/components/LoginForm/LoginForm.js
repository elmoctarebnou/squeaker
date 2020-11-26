import React from 'react';
import './LoginForm.css';
import ApiService from '../../services/api-service';
import TokenService from '../../services/token-service'

export default class LoginForm extends React.Component {
  state = {
    user_name:'',
    password: '',
    loginError: false 
  }
  handleUpdate = (event) => {
    event.preventDefault();
    this.setState({[event.currentTarget.name]: event.currentTarget.value})
  }
  handleSubmit = async(event) => {
    event.preventDefault();
    const {user_name, password} = this.state;
    const findUser= {
      user_name,
      password
    }
    const res = await ApiService.loginUser(findUser);
    const {user, authToken} = res;
    TokenService.saveAuthToken(authToken, user.id)
    this.props.handleLogin();
    this.props.history.push('/')
  }
  render(){
    return(
      <>
        <form onSubmit={this.handleSubmit} className='login-form'>
          <h1>Sign in to Squeaker!</h1>
          <h2>{this.state.loginError ? 'USERNAME OR PASSWORD WRONG!' : ''}</h2>
          <input onChange={this.handleUpdate} name='user_name' type='text' placeholder='Username' required></input>
          <br/>
          <input type='password' onChange={this.handleUpdate} name='password' placeholder='Password' required></input>
          <br/>
          <button>Sign In</button>
        </form>
      </>
    )
  }
}