import React from 'react';
import '../App.css';

const Welcome = () => {
	return (
		<div className='center'>
			<h1>Welcome Page</h1>
			<a href='/login' className='button'>Login</a>
			<a href='/signup' className='button'>Signup</a>
		</div>
	);
};

export default Welcome;
