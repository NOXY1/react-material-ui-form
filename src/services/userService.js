import { user } from './mocks/userData';

export function logIn({login, password}) {
	return new Promise((resolve, reject) => {
		if(password && login === user.login && password === user.password) {
			resolve('You have been successfully logged in');
		} else {
			reject('Sorry, something went wrong');
		}
	});
};

 