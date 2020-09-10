import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import ArticlesList from '../ArticlesList/ArticlesList'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoginForm from '../LoginForm/LoginForm'
import Article from '../Article/Article'
import Footer from '../Footer/Footer'
import LandingPage from '../LandingPage/LandingPage'
import CreateArticle from '../CreateArticle/CreateArticle'
import TokenService from '../../services/token-service'
import Particles from 'react-particles-js'
import particlesOption from '../../services/particlesParams'
import './App.css';




class App extends React.Component{
  state = {
    login: TokenService.hasAuthToken(),
    user_id: null
  }
  
  handleLogin = (id) => {
    this.setState({user_id: id, login: true})
  }
  handleLogOut = () => {
    this.setState({user_id: null, login: false})
    TokenService.clearAuthToken();
  }
  
  render(){
    return (
      <>
        <Particles className='particles' params={particlesOption}/>
        <Header handleLogOut={this.handleLogOut} login={this.state}/>
        <Switch>
          <Route exact path='/' render={(props) => this.state.login ? (<ArticlesList token={this.state.token} {...props}/>) : <LandingPage/>}/>
          <Route exact path='/Register' render={(props) => this.state.login ? (<RegisterForm {...props}/>) : <LandingPage/>}/>
          <Route exact path='/login' render={(props) => <LoginForm {...props} handleLogin={this.handleLogin}/>}/>
          <Route exact path='/articles/:id' render={(props) => this.state.login ? (<Article {...props}/>) : <LandingPage/>}/>
          <Route exact path='/new-article' render={(props) => this.state.login ? (<CreateArticle {...props} user_id={this.state.user_id}/>) : <LandingPage/>}/>
        </Switch>
        <Footer/>
      </>
    );
  }
}

export default App;
