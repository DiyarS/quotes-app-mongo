import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Header from './components/Header';
import Landing from './components/Landing';
import AddQuoteController from './components/AddQuoteController';

const App = () => (
	<BrowserRouter>
		<div className="app">
			<Header />
			<Route exact path="/" component={Landing} />
			<Route path="/add-quote" component={AddQuoteController} />
		</div>
	</BrowserRouter>
);

export default App;
