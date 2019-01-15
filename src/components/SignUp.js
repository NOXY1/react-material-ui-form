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
		redirect: false,
	}

	handleChangeInput = e => {
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		const { firstName, lastName, email, birthday } = this.state;
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
	    this.setState({ notification: notification, notificationType: notificationType });
	    setTimeout(() => {
	      this.setState({ notification: null, notificationType: null });
	    }, time);
  	}	

	render() {
		const { firstName, lastName, email, birthday, notification, notificationType } = this.state;
		const isSignInBtnActive = !!(firstName && lastName && email && birthday);
		
		if(this.state.redirect) {
			return (<Redirect to={ '/home' } />)
		}

		return(
			<Fragment>
			{!!notification && <p className={ notificationType }>{ notification }</p>}
				<form className='ml'>
					<TextField 
						name='firstName'
						label='Name'
						value={ firstName }
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<br />
					<TextField 
						name='lastName'
						label='Surname'
						value={ lastName }
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<br />
					<TextField 
						name='email'
						label='Email'
						value={ email }
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<br />
					<TextField 
						name='birthday'
						label='Birthday'
						value={ birthday }
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<br />
					<FormControlLabel
			          control={
			            <Checkbox
			              checked={ this.state.checkedB }
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
							disabled = { !isSignInBtnActive }
							>
						Sign In
					</Button>
				</form>	
			</Fragment>
		);
	}
}
