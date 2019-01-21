export function logIn({ login = '', password = '' }) {
	return new Promise((resolve, reject) => {
		const parsedUserData = JSON.parse(localStorage.getItem('user'));
		if(login === parsedUserData.email && password === parsedUserData.password) {
			let userData = JSON.stringify({ login, password });
			localStorage.setItem('authorizedUser', userData);
			resolve('You have been successfully logged in');
		} else {
			reject('Sorry, something went wrong');
		}
	});
};

export function signUp({ firstName = '', lastName = '', email = '', birthday = '', password = '' }) {
	return new Promise((resolve, reject) => {
		if(firstName && lastName && email && birthday && password) {
			let userObj = JSON.stringify({ firstName, lastName, email, birthday , password });
			localStorage.setItem('user', userObj);
			resolve('You have been successfully signed up');
		} else {
			reject('Sorry, something went wrong');
		}
	});
};



