import React from 'react';
import TokenService from '../../services/token-service';
import './Header.css';
import logo from './squeak.png'

export default class Header extends React.Component {
  state = {
    hasToken: TokenService.hasAuthToken()
  }
  render() {
    const login = <a href='/login'><span className='login'>Log In</span></a>;
    const signOut = <><a href='/new-squeak'><span className='squeak'>Squeak</span></a><a href='/login' onClick={this.props.handleLogOut}><span className='login'>Sign out</span></a></>;
    return (
      <>
      <header>
        <nav className='nav'>
          <div className='nav-menu flex'>
            <a href='/'><img src={logo} alt='logo'></img> <span className='logo'>Squeaker</span></a>
            <div className='button flex'>{
              this.props.login.login ? signOut : login
            }
            </div>
          </div>
        </nav>
      </header>
      </>
    )
  }
}