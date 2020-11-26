import React from 'react';
import TokenService from '../../services/token-service';
import './Header.css';
import logo from './squeak.png'

export default class Header extends React.Component {
  state = {
    hasToken: TokenService.hasAuthToken()
  }
  componentDidMount(){
    window.addEventListener('scroll', this.handleScroll);
  }
  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }
  handleScroll = () => {
    if(this.state.hasToken){
      if (window.scrollY > 20) {
        document.querySelector(".nav").className = "nav scroll";
        document.querySelector('.squeak').className = 'squeak black';
        document.querySelector('.login').className =  'login black';
        document.querySelector('.logo').className =  'logo black';
  
      } else {
        document.querySelector(".nav").className = "nav";
        document.querySelector('.squeak').className = 'squeak';
        document.querySelector('.login').className =  'login';
        document.querySelector('.logo').className =  'logo';
      }
    }
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