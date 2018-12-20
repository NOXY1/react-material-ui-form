import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Form extends React.Component {
	state = {
		login: '',
		password: ''
	};

	handleChangeInput = e => {
		this.props.onChange({[e.target.name]: e.target.value});
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		alert('Form submited');
	} 

	render() {
		return(
			<form>
				<TextField 
					name='login'
					hintText='Login'
					floatingLabelText='Login'
					value={this.state.login}
					floatingLabelFixed
					onChange={e => this.handleChangeInput(e)}
				/>
				<br />
				<TextField 
					name='password'
					hintText='Password'
					floatingLabelText='Password'
					value={this.state.password}
					onChange={e => this.handleChangeInput(e)}
					type='password'
					floatingLabelFixed
				/>
				<br />
				<RaisedButton label='Submit' onClick={e => this.handleSubmit(e)} primary />
			</form>
			
		);
	}
}