import Cookies from 'js-cookie'

export const setAuthToken = (token: string) => {
  Cookies.set('authToken', token, { expires: 7, secure: window.location.protocol === 'https:' })
}

export const getAuthToken = (): string | undefined => {
  return Cookies.get('authToken')
}

export const IsAutenticated = (): boolean => {
  return !!getAuthToken()
}