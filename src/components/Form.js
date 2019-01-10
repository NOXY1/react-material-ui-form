import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { logIn } from '../services/userService';
import { Redirect } from 'react-router-dom';


export default class Form extends React.Component {
	state = {
		login: '',
		password: '',
		notification: '',
		notificationType: '',
		disabledLoginButton: true,
		redirect: false
	}

	handleChangeInput = e => {
		this.props.onChange({[e.target.name]: e.target.value});
		this.setState({[e.target.name]: e.target.value});
		this.setLoginButtonState();
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

	setLoginButtonState = () => {
		if(this.state.login && this.state.password) {
			this.setState({disabledLoginButton: false});
		} else {
			this.setState({disabledLoginButton: true});		
		}
	}

	render() {
		
		if(this.state.redirect) {
			return (<Redirect to={'/home'} />)
		}

		return(
			<Fragment>
				<p className={this.state.notificationType}>{this.state.notification}</p>
				<form>
					<TextField 
						name='login'
						label='Login'
						value={this.state.login}
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
						style={{marginLeft: 10}}
					/>
					<br />
					<TextField 
						name='password'
						label='Password'
						value={this.state.password}
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
						type='password'
						style={{marginLeft: 10}}
					/>
					<br />
					<Button variant='contained'
							label='Submit' 
							onClick={e => this.handleSubmit(e)} 
							color="primary"
							style={{margin: 10}}
							disabled={this.state.disabledLoginButton}>
						Submit
					</Button>
				</form>	
			</Fragment>
		);
	}
}
