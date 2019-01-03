import React, { Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { logIn } from './services/userService';


export default class Form extends React.Component {
	state = {
		login: '',
		password: '',
		notification: '',
		notificationType: ''
	};

	handleChangeInput = e => {
		this.props.onChange({[e.target.name]: e.target.value});
		this.setState({[e.target.name]: e.target.value});
	};

	handleSubmit = e => {
		e.preventDefault();
		const { login, password } = this.state;
		logIn({ login, password })
								.then(result => {
									this.setState({notification: result, notificationType: 'notification success' });
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
							disabled={!this.state.login || !this.state.password}>
						Submit
					</Button>
				</form>	
			</Fragment>
			
			
		);
	}
}
