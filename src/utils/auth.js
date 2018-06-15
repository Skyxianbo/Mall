import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token',
	User = 'Admin-User';

export function getToken() {
	return Cookies.get(TokenKey)
}

export function setToken(token) {
	return Cookies.set(TokenKey, token)
}

export function removeToken() {
	return Cookies.remove(TokenKey)
}

export function getUser() {
	return JSON.parse(sessionStorage.getItem(User));
}

export function setUser(user) {
	return sessionStorage.setItem(User, JSON.stringify(user));
}

export function removeUser() {
	return sessionStorage.removeItem(User);
}

