import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import './App.css';
import Form from "./Form";

class App extends Component {
  state = {
    fields: {}
  };

  onChange = newValue => {
    this.setState({
      fields: {
        ...this.state.fields,
        ...newValue
      }
    });
  };

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <Form onChange={fields => this.onChange(fields)} />
        </div>
      </MuiThemeProvider>  
    );
  }
}

export default App;
