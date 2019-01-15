import React, { Fragment, Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { logIn } from '../services/userService';
import { Redirect } from 'react-router-dom';
import '../App.css';


export default class Form extends Component {
	state = {
		login: '',
		password: '',
		notification: '',
		notificationType: '',
		redirect: false
	}

	handleChangeInput = e => {
		this.props.onChange({[e.target.name]: e.target.value});
		this.setState({[e.target.name]: e.target.value});
	}

	handleSubmit = e => {
		e.preventDefault();
		const { login, password } = this.state;
		logIn({ login, password })
								.then(result => {
									this.setState({ notification: result, notificationType: 'notification success' });
									if(result) {
										this.setState({ redirect: true });
									}
								})
								.catch(error => {
									this.setState({notification: error, notificationType: 'notification error' });
								});

		this.showNotification = notification => {
			this.setState({ notification });

			setTimeout(() => {
				this.setState({ notification: null })
			}, 5000);
		}
	}

	

	render() {
		const { login, password } = this.state;
		const isLoginBtnActive = !!(login && password);

		if(this.state.redirect) {
			return (<Redirect to={'/home'} />)
		}

		return(
			<Fragment>
				<p className={ this.state.notificationType}>{this.state.notification }</p>
				<form className='ml'>
					<TextField 
						name='login'
						label='Login'
						value={ login }
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
					/>
					<br />
					<TextField 
						name='password'
						label='Password'
						value={ password }
						onChange={e => this.handleChangeInput(e)}
						margin="normal"
						type='password'
					/>
					<br />
					<Button variant='contained'
							label='Submit' 
							onClick={e => this.handleSubmit(e)} 
							color="primary"
							disabled={ !isLoginBtnActive }>
						Submit
					</Button>
				</form>	
			</Fragment>
		);
	}
}
