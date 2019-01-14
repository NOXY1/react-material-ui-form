import React, { Component, Fragment } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Routes from './routes';

import './App.css';


class App extends Component {
  
  render() {
    return (
      <MuiThemeProvider>
        <Fragment>
          <Routes />
        </Fragment>
      </MuiThemeProvider>  
    );
  }
}

export default App;
