import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from './components/Home';
import NotFound from './components/NotFound';
import Login from './components/LogIn';

const Routes = () => (
	<BrowserRouter>
		<Switch>
			<Route exact path='/' component={Login} />
			<Route path='/home' component={Home} />
			<Route path='*' component={NotFound} />
		</Switch>
	</BrowserRouter>
);

export default Routes;
