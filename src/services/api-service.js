import config from '../config'
import TokenService from '../services/token-service';
const ApiService = {
  getArticles() {
    return fetch(`${config.API_ENDPOINT}/articles`,{
      method: 'GET',
      headers: {
        'authorization': TokenService.getAuthToken()
      }
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  getArticle(articleId) {
    return fetch(`${config.API_ENDPOINT}/articles/${articleId}`)
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  postArticle(newArticle){
    return fetch(`${config.API_ENDPOINT}/articles`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newArticle)
    })
  },
  deleteArticle(articleId){
    return fetch(`${config.API_ENDPOINT}/articles/${articleId}`, {
      method: 'DELETE',
    })
  },
  postComment(newComment) {
    return fetch(`${config.API_ENDPOINT}/comments`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify(newComment),
    })
      .then(res =>
        (!res.ok)
          ? res.json().then(e => Promise.reject(e))
          : res.json()
      )
  },
  deleteComment(comment_id){
    return fetch(`${config.API_ENDPOINT}/comments/${comment_id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({id: comment_id})
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  loginUser(user){
    return fetch(`${config.API_ENDPOINT}/login`, {
      method: 'POST',
      headers: {'content-type': 'application/json'},
      body: JSON.stringify(user)
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  createUser(user){
    return fetch(`${config.API_ENDPOINT}/users`, {
      method: 'POST',
      headers:{'content-type': 'application/json'},
      body: JSON.stringify(user)
    })
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  },
  getUsers(){
    return fetch(`${config.API_ENDPOINT}/users`)
    .then(res =>
      (!res.ok)
        ? res.json().then(e => Promise.reject(e))
        : res.json()
    )
  }
}

export default ApiService
