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
		const { firstName, lastName, email, birthday, agreementChecked } = this.state;
		signUp({ firstName, lastName, email, birthday })
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

	showNotification = (notification, notificationType, time = 5000) => {
	    this.setState({ notification, notificationType });
	    setTimeout(() => {
	      this.setState({ notification: null, notificationType: null });
	    }, time);
  	}	

	render() {
		const { firstName, lastName, email, birthday, notification, notificationType, agreementChecked } = this.state;
		const isSignInBtnActive = !!(firstName && lastName && email && birthday && agreementChecked);
		
		if(this.state.redirect) {
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
			        <Button variant='contained'
							label='Sign Up' 
							onClick={e => this.handleSubmit(e)} 
							color="primary"
							disabled = {!isSignInBtnActive}
							>
						Sign In
					</Button>
				</form>	
			</Fragment>
		);
	}
}
