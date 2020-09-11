import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default class Header extends React.Component {

  render() {
    const login = <a href='/login'><span className='login'>Log In</span></a>;
    const signOut = <><a href='/new-article'><span className='login'>Create Article</span></a><a href='/login' onClick={this.props.handleLogOut}><span className='login'>Sign Out</span></a></>;
    return (
      <>
      <header>
        <nav className='nav'>
          <div className='nav-menu flex'>
            <a href='/'><span className='logo'>BLOG || EME </span></a>
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