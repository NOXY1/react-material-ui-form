import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/LogIn';
import SignUp from './components/SignUp';
import Welcome from './components/Welcome';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Welcome} />
			<Route path='/login' component={Login} />
			<Route path='/home' component={Home} />
			<Route path='/signup' component={SignUp} />
			<Route path='*' component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
