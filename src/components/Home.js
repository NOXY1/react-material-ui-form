import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import { logout } from '../services/userService';
import '../App.css';

class Home extends Component {
	state = {
		redirect: false,
	}

	componentDidMount = () =>  {
		if(localStorage.getItem('authorizedUser')) {
			console.log('userOk');
		} else {
			this.setState({redirect: true});
		}
	}

	logoutUser = () => {
		logout();
		this.setState({redirect: true});
	}

	render () {

		if(this.state.redirect) {
			return (<Redirect to={'/login'} />)
		}

		return (
			<Fragment>
				<h1 className='home'>Home</h1>
				<Button variant='contained'
						label='Logout' 
						onClick={this.logoutUser} 
						color="primary"
						>
						Logout
				</Button>	
			</Fragment>
		)
	}
}

export default Home;
