import React from 'react';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';

export default class Form extends React.Component {
	state = {
		login: '',
		password: ''
	};

	change = event => {
		this.props.onChange({[event.target.name]: event.target.value});
		this.setState({
			[event.target.name]: event.target.value
		});
	};

	render() {
		return(
			<form>
				<TextField 
					name='login'
					hintText='Login'
					floatingfLabelText='Login'
					value={this.state.login}
					floatingLabelFixed
					onChange={(event) => this.change(event)}
				/>
				<br />
				<TextField 
					name='password'
					hintText='Password'
					floatingLabelText='Password'
					value={this.state.password}
					onChange={event => this.change(event)}
					type='password'
					floatingLabelText
				/>
				<br />
				<RaisedButton label='Submit' primary />
			</form>
			
		);
	}
}