import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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
				style={{margin: 10}}>
					Submit
				</Button>
			</form>
			
		);
	}
}