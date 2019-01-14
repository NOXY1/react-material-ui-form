import React, { Fragment, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { logIn } from '../services/userService';
import { Redirect } from 'react-router-dom';
import '../App.css';


export default class SignUp extends Component {
	state = {
		firstName: '',
		lastName: '',
		email: '',
		birthday: '',
		redirect: false,
	}

	handleChangeInput = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		const { login, password } = this.state;
		logIn({ login, password })
								.then(result => {
									this.setState({notification: result, notificationType: 'notification success' });
									if(result) {
										this.setState({redirect: true});
									}
								})
								.catch(error => {
									this.setState({notification: error, notificationType: 'notification error' });
								});
		setTimeout(this.hideNotification, 5000);
	}

	hideNotification = () => {
		this.setState({notification: null, notificationType: null});
	}

	render() {
		const { firstName, lastName, email, birthday } = this.state;
		const isSignInBtnActive = !!(firstName && lastName && email && birthday);
		
		if(this.state.redirect) {
			return (<Redirect to={'/home'} />)
		}

		return(
			<Fragment>
				<form className='ml'>
					<TextField 
						name='firstName'
						label='Name'
						value={this.state.firstName}
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<br />
					<TextField 
						name='lastName'
						label='Surname'
						value={this.state.lastName}
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<br />
					<TextField 
						name='email'
						label='Email'
						value={this.state.email}
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<br />
					<TextField 
						name='birthday'
						label='Birthday'
						value={this.state.birthday}
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<br />
					<FormControlLabel
			          control={
			            <Checkbox
			              checked={this.state.checkedB}
			              value="checkedB"
			              color="primary"
			            />
			          }
			          label="I accept the terms of the license agreement"
			        />
			        <br />
			        <Button variant='contained'
							label='Sign Up' 
							onClick={e => this.handleSubmit(e)} 
							color="primary"
							disabled={!isSignInBtnActive}>
						Sign In
					</Button>
				</form>	
			</Fragment>
		);
	}
}
