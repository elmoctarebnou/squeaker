const tokenKey = 'blogEMEToken';
const userId = 'userId';

const TokenService = {
  saveAuthToken(token, id) {
    window.localStorage.setItem(tokenKey, token)
    window.localStorage.setItem(userId, id)
  },
  getUserId(){
    return window.localStorage.getItem(userId)
  },
  getAuthToken() {
    return window.localStorage.getItem(tokenKey)
  },
  clearAuthToken() {
    window.localStorage.removeItem(tokenKey)
    window.localStorage.removeItem(userId)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
}

export default TokenService