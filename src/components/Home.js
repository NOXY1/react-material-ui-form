import React, { Fragment, Component } from 'react';
import { Redirect } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import '../App.css';

class Home extends Component {

	constructor(props) {
		super(props);
		this.state = {
			redirect: false,
		}
	}

	componentWillMount = () =>  {
		if(localStorage.getItem('user')) {
			console.log('userOk');
		} else {
			this.setState({redirect: true});
		}
	}

	logout = () => {
		localStorage.setItem('user', '');
		localStorage.clear();
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
						onClick={this.logout} 
						color="primary"
						>
						Logout
				</Button>	
			</Fragment>
		)
	}
}

export default Home;
