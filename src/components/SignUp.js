import React, { Fragment, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { signUp } from '../services/userService';
import { Redirect } from 'react-router-dom';
import '../App.css';


export default class SignUp extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		birthday: '',
		notification: '',
  	notificationType: '',
  	password: '',
  	agreementChecked: false,
		redirect: false,
	}

	handleChange = e => {
    	this.setState({ agreementChecked: e.target.checked });
  	}

	handleChangeInput = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		const { firstName, lastName, email, birthday, password } = this.state;
		signUp({ firstName, lastName, email, birthday, password })
								.then(result => {
									if(result) {
										this.setState({ redirect: true });
									}
								})
								.catch(error => {
									this.showNotification(error, 'notification error');
									console.log(error)
								});
	}

	redirectToLoginBtn = e => {
		this.setState({ redirect: true });
		return (<Redirect to={'/login'} />)
	}

	showNotification = (notification, notificationType) => {
	    this.setState({ notification, notificationType });
	    setTimeout(() => {
	      this.setState({ notification: null, notificationType: null });
	    }, 5000);
  	}	

	render() {
		const { firstName, lastName, email, birthday, password, notification, notificationType, agreementChecked } = this.state;
		const isSignInBtnActive = !!(firstName && lastName && email && password && agreementChecked);
		const isUserLoggedIn = localStorage.getItem('authorizedUser');

		if(this.state.redirect) {
			return (<Redirect to={'/home'} />)
		}

		if(isUserLoggedIn) {
			return (<Redirect to={'/home'} />)
		}

		return(
			<Fragment>
			{!!notification && <p className={notificationType}>{notification}</p>}
				<form className='ml'>
					<TextField 
						name='firstName'
						label='Name'
						value={firstName}
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<TextField 
						name='lastName'
						label='Surname'
						value={lastName}
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<TextField 
						name='email'
						label='Email'
						value={email}
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<TextField 
						name='birthday'
						label='Birthday'
						value={birthday}
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<TextField 
            name='password'
            label='Password'
            value={password}
            onChange={e => this.handleChangeInput(e)} 
            margin="normal"
            type='password'
          />
					<FormControlLabel
			          control={
			            <Checkbox
			              onChange={e => this.handleChange(e)}
			              checked={agreementChecked}
			              color="primary"
			            />
			          }
			          label="I accept the terms of the license agreement"
			    />
			    <div className='btn-group'>
			    	<Button variant='contained'
							label='Sign Up' 
							onClick={e => this.handleSubmit(e)} 
							color="primary"
							disabled = {!isSignInBtnActive}
							>
						Signup
					</Button>
					<Button variant='contained'
							label='Login' 
							onClick={e => this.redirectToLoginBtn(e)} 
							color="primary"
							className='login-redirect'
							>
						Login
					</Button>
			    </div>
				</form>	
			</Fragment>
		);
	}
}
