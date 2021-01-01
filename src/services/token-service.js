const tokenKey = 'elmoctarebnousqueaker';
const userId = 'userId';
const fullName = 'fullName';

const TokenService = {
  saveAuthToken(token, id, full_name) {
    window.localStorage.setItem(tokenKey, token)
    window.localStorage.setItem(userId, id)
    window.localStorage.setItem(fullName, full_name)
  },
  getUserId(){
    return window.localStorage.getItem(userId)
  },
  getAuthToken() {
    return window.localStorage.getItem(tokenKey)
  },
  getFullName(){
    return window.localStorage.getItem(fullName)
  },
  clearAuthToken() {
    window.localStorage.removeItem(tokenKey)
    window.localStorage.removeItem(userId)
    window.localStorage.removeItem(fullName)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },

}

export default TokenService