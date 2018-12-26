export function logIn({login, password}) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if(login && password) {
				resolve("You are successfully logged in")
			} else {
				reject("Fields are empty")
			}
		}, 1000);
				
	});
};

 