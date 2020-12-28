import React from 'react';
import TokenService from '../../services/token-service';
import './Header.css';
import logo from './squeak.png'

export default class Header extends React.Component {
  state = {
    hasToken: TokenService.hasAuthToken(),
    fullName: TokenService.getFullName(),
  }
 
  render() {
    const login = <a href='/login'><span className='login'>Log In</span></a>;
    const signOut = <>
      <span className='user-name'><i className="far fa-user"></i> {this.state.fullName}</span>
      <a href='/new-squeak' className='squeak'><i className="fas fa-plus"></i></a>
      <a href='/login' onClick={this.props.handleLogOut}><span className='login'>Sign out</span></a>
    </>;
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