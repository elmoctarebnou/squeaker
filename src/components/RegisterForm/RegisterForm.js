import React from 'react';
import ApiService from '../../services/api-service';
import TokenService from '../../services/token-service'
import './RegisterForm.css'


export default class RegisterForm extends React.Component {
    state = {
      user_name:'',
      full_name:'',
      nick_name:'',
      password:'',
      confirm_password:'',
      error_password: false
    }
  handleChange = (event) => {
    event.preventDefault();
    this.setState({[event.target.name]: event.target.value})
    
  }
  handleSubmit = async (event) => {
    event.preventDefault();
    const data = this.state;
    if(data.password !== data.confirm_password) this.setState({error_password: true})
    if(data.password === data.confirm_password) {
      this.setState({error_password: false});
      const newUser = {
        user_name: data.user_name,
        full_name: data.full_name,
        password: data.password,
        nickname: data.nick_name
      };
      const res = await ApiService.createUser(newUser);
      const {user, authToken} = res;
      TokenService.saveAuthToken(authToken)
      this.props.handleLogin(user.id);
      this.props.history.push('/')
    };
  }
  handleDemo = async(event) => {
    event.preventDefault();
    let demoUser = {
      user_name:'leo',
      password: 'Leo12345@'
    }
    const res = await ApiService.loginUser(demoUser);
    const {user, authToken} = res;
    TokenService.saveAuthToken(authToken, user.id)
    this.props.handleLogin();
    this.props.history.push('/')
  }
  
  render(){
    
    return (
      <>
        <form onSubmit={this.handleSubmit} className='register-form'>
          <h1>
            Welcome to Squeaker!<br/>
            Create an account to start.<br/>
            <br/>
           </h1>
          <h2>{this.state.error_password ? 'PASSWORDS DO NOT MATCH!' : ''}</h2>
          <input onChange={this.handleChange} name='full_name' type='text' placeholder='Full name' required></input>
          <br/>
          <input onChange={this.handleChange} name='user_name' type='text' placeholder='Username' required></input>
          <br/>
          <input onChange={this.handleChange} name='password' type='password' placeholder='Password' required></input>
          <br/>
          <input onChange={this.handleChange} name='confirm_password' type='password' placeholder='Confirm Password' required></input>
          <br/>
          <div className='buttons'>
            <button >Create</button>
            <button type='submit' onClick={this.handleDemo}>Demo</button>
          </div>
        </form>
      </>
    )
  }
}