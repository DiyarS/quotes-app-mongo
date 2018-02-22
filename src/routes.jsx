import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './app';
import Landing from './components/Landing';
import AddQuoteController from './components/AddQuoteController';
import 'styles/index.scss';

const Routes = () => (
	<Router>
		<div>
			<Route exact path="/" component={App} />
			<Route path="/add-quote" component={AddQuoteController} />
		</div>
	</Router>
);

export default Routes;
