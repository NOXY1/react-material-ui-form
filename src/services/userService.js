export function logIn({login, password}) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if(login && password) {
				resolve('You have been successfully logged in');
			} else {
				reject('Sorry, something went wrong');
			}
		}, 1000);
				
	});
};

 