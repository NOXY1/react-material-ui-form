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
                  // this.showNotification(result, 'notification success');
                  // this.setState({notification: result, notificationType: 'notification success' });
                  if(result) {
                    this.setState({redirect: true});
                  }
                })
                .catch(error => {
                  this.showNotification(error, 'notification error');
                  // this.setState({notification: error, notificationType: 'notification error' });
                });

    // setTimeout(this.hideNotification, 5000);

  }

  showNotification = (notification, notificationType, time = 5000) => {
    this.setState({notification: notification, notificationType: notificationType});
    setTimeout(() => {
      this.setState({notification: null, notificationType: null});
    }, time);
  }

  // hideNotification = () => {
  //   this.setState({notification: null, notificationType: null});
  // }

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
            value={this.state.login}
            onChange={e => this.handleChangeInput(e)}
            margin="normal"
          />
          <br />
          <TextField 
            name='password'
            label='Password'
            value={this.state.password}
            onChange={e => this.handleChangeInput(e)}
            margin="normal"
            type='password'
          />
          <br />
          <Button variant='contained'
              label='Submit' 
              onClick={e => this.handleSubmit(e)} 
              color="primary"
              disabled={!isLoginBtnActive}>
            Submit
          </Button>
        </form> 
      </Fragment>
    );
  }
}
