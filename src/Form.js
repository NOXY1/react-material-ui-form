import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Form extends React.Component {
	state = {
		login: '',
		password: ''
	};

	handleChangeInput = event => {
		this.props.onChange({[event.target.name]: event.target.value});
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handleSubmit = (event) => {
		event.preventDefault();
		alert('Form submited');
	} 

	render() {
		return(
			<form>
				<TextField 
					name='login'
					hintText='Login'
					floatingfLabelText='Login'
					value={this.state.login}
					floatingLabelFixed
					onChange={event => this.handleChangeInput(event)}
				/>
				<br />
				<TextField 
					name='password'
					hintText='Password'
					floatingfLabelText='Password'
					value={this.state.password}
					onChange={event => this.handleChangeInput(event)}
					type='password'
					floatingLabelFixed
				/>
				<br />
				<RaisedButton label='Submit' onClick={this.handleSubmit.bind(this)} primary />
			</form>
			
		);
	}
}