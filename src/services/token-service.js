const tokenKey = 'blogEMEToken'

const TokenService = {
  saveAuthToken(token) {
    window.localStorage.setItem(tokenKey, token)
  },
  getAuthToken() {
    return window.localStorage.getItem(tokenKey)
  },
  clearAuthToken() {
    window.localStorage.removeItem(tokenKey)
  },
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
}

export default TokenService