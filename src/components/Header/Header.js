import React from 'react';
import {Link} from 'react-router-dom';
import './Header.css';

export default class Header extends React.Component {

  render() {
    const login = <Link to='/login'><span className='login'>Log In</span></Link>;
    const signOut = <><Link to='/new-article'><span className='login'>Create Article</span></Link><Link to='/login' onClick={this.props.handleLogOut}><span className='login'>Sign Out</span></Link></>;
    return (
      <>
      <header>
        <nav className='nav'>
          <div className='nav-menu flex'>
            <Link to='/'><span className='logo'>BLOG || EME </span></Link>
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