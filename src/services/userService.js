export function logIn({ login = '', password = '' }) {
	return new Promise((resolve, reject) => {
		try {
			const parsedUserData = JSON.parse(localStorage.getItem('user'));
			
			if(parsedUserData !== null && login === parsedUserData.email && password === parsedUserData.password) {
				let userData = JSON.stringify({ login, password });
				localStorage.setItem('authorizedUser', userData);
				resolve('You have been successfully logged in');
			} else {
				reject('Sorry, something went wrong');
			}
		} catch(e) {
			reject('Sorry, something went wrong');
		}
	});
};

export function signUp({ firstName = '', lastName = '', email = '', password = '' }) {
	return new Promise((resolve, reject) => {
		if(firstName && lastName && email && password) {
			let userObj = JSON.stringify({ firstName, lastName, email, password });
			localStorage.setItem('user', userObj);
			localStorage.setItem('authorizedUser', userObj);
			resolve('You have been successfully signed up');
		} else {
			reject('Sorry, something went wrong');
		}
	});
};

export function logout() {
	localStorage.removeItem('authorizedUser');
};
