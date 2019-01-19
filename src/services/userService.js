import { user } from './mocks/userData';

export function logIn({ login = '', password = '' }) {
	return new Promise((resolve, reject) => {
		if(login === user.login && password === user.password) {
			resolve('You have been successfully logged in');
		} else {
			reject('Sorry, something went wrong');
		}
	});
};

export function signUp({ firstName = '', lastName = '', email = '', birthday = '' }) {
	return new Promise((resolve, reject) => {
		if(firstName && lastName && email && birthday) {
			resolve('You have been successfully signed up');
		} else {
			reject('Sorry, something went wrong');
		}
	});
};

