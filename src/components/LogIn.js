import React, { Component, Fragment } from 'react';
import Form from './Form';


class LogIn extends Component {
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
			<Fragment>
				<Form onChange={fields => this.onChange(fields)} />
			</Fragment>	
		);
	};
};

export default LogIn;
