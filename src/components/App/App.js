import React from 'react';
import {Switch, Route} from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import ArticlesList from '../ArticlesList/ArticlesList'
import RegisterForm from '../RegisterForm/RegisterForm'
import LoginForm from '../LoginForm/LoginForm'
import Article from '../Article/Article'
import Footer from '../Footer/Footer'
import CreateArticle from '../CreateArticle/CreateArticle'
import TokenService from '../../services/token-service'
import ParticlesComponent from 'react-particles-js'
import particlesOption from '../../services/particlesParams'
import './App.css';
import LoadingAnimation from '../LoadingAnimation/LoadingAnimation';


const Particles = (process.env['NODE_ENV'] !== 'test') ? ParticlesComponent : (() => null);

class App extends React.Component{
  state = {
    login: TokenService.hasAuthToken(),
    user_id: TokenService.getUserId()
  }
  
  handleLogin = () => {
    this.setState({user_id: TokenService.getUserId(), login: true})
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
          <Route exact path='/' render={(props) => this.state.login ? (<ArticlesList token={this.state.token} {...props}/>) : <RegisterForm {...props} handleLogin={this.handleLogin}/> }/>
          <Route exact path='/register' render={(props) => <RegisterForm {...props} handleLogin={this.handleLogin}/>}/>
          <Route exact path='/login' render={(props) => <LoginForm {...props} handleLogin={this.handleLogin}/>}/>
          <Route exact path='/squeakes/:id' render={(props) => this.state.login ? (<Article {...props}/>) : <LoginForm {...props} handleLogin={this.handleLogin}/>}/>
          <Route exact path='/new-squeak' render={(props) => this.state.login ? (<CreateArticle {...props} user_id={this.state.user_id}/>) : <LoginForm {...props} handleLogin={this.handleLogin}/>}/>
          <Route exact path='/loading' component={LoadingAnimation}/>
        </Switch>
        <Footer/>
      </>
    );
  }
}

export default App;
