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
    this.setState({[e.target.name]: e.target.value});
  }

  handleSubmit = e => {
    e.preventDefault();
    const { login, password } = this.state;
    logIn({ login, password })
                .then(result => {
                  if(result) {
                    this.setState({ redirect: true });
                  }
                })
                .catch(error => {
                  this.showNotification(error, 'notification error');
                });
  }

  showNotification = (notification, notificationType) => {
    this.setState({ notification, notificationType });
    setTimeout(() => {
      this.setState({ notification: null, notificationType: null });
    }, 5000);
  }

  componentDidMount () {
    const isUserLoggedIn = localStorage.getItem('authorizedUser');

    if(isUserLoggedIn) {
      return (<Redirect to={'/home'} />)
    }
  }

  render() {
    const { login, password, notification, notificationType } = this.state;
    const isLoginBtnActive = !!(login && password);
    
    if(this.state.redirect) {
      return (<Redirect to={'/home'} />)
    }

    return(
      <Fragment>
        {!!notification && <p className={notificationType}>{notification}</p>}
        <form className='ml'>
          <TextField 
            name='login'
            label='Login'
            value={login}
            onChange={e => this.handleChangeInput(e)}
            margin="normal"
          />
          <TextField 
            name='password'
            label='Password'
            value={password}
            onChange={e => this.handleChangeInput(e)} 
            margin="normal"
            type='password'
          />
          <div className='btn-group'>
            <Button variant='contained'
              label='Submit' 
              onClick={e => this.handleSubmit(e)} 
              color="primary"
              disabled={!isLoginBtnActive}>
              LogIn
            </Button>
            <a href='/signup'>Don't have an account?</a>
          </div>
        </form> 
      </Fragment>
    );
  }
}
