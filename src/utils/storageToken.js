// storage 数据存储
import store from 'store'

const TOKEN_KEY = 'x-auth-token'

export const setToken = (token) => {
  store.set(TOKEN_KEY, token)
}

export const getToken = () => {
  return store.get(TOKEN_KEY) || {}
}

export const removeToken = () => {
  store.remove(TOKEN_KEY)
}