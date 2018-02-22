import React from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import ProgressBar from './ProgressBar';
import InputQuote from './InputQuote';
import Quotes from './Quotes';
import 'normalize.css';
import 'styles/index.scss';

class AddQuoteController extends React.Component {
	constructor() {
		super();
		this.state = {
			quotesCount: 0,
			newQuote: '',
			savedQuotes: [],
			awaitingQueue: []
		};
		this.totalNumberOfQuotes = 10;
		this.onQuoteSubmit = this.onQuoteSubmit.bind(this);
		this.fetchData = this.fetchData.bind(this);
	}

	componentDidMount() {
		this.fetchData();
	}

	fetchData = () => {
		axios.defaults.withCredentials = true;
		axios
			.get('http://localhost:3000/quotes')
			.then(response => {
				this.setState({
					quotesCount: response.data.quotes.length,
					savedQuotes: response.data.quotes
				});
			})
			.catch(error => {
				this.createNotification('error');
			});
	};

	onQuoteSubmit = quoteStr => {
		if (this.state.quotesCount + 1 <= this.totalNumberOfQuotes) {
			axios
				.post('http://localhost:3000/quotes', {
					text: quoteStr
				})
				.then(response => {
					this.fetchData();
					this.createNotification('success');
				})
				.catch(error => {
					this.createNotification('error');
				});
		} else {
			//add new quote to the queue of waiting quotes
			this.createNotification('warning');
			const state = this.state;
			let awaitingQueue = this.state.awaitingQueue;
			awaitingQueue.push(quoteStr);
			state.awaitingQueue = awaitingQueue;
			this.setState(state);
		}
	};

	deleteQuote = id => {
		const state = this.state;
		axios
			.delete('http://localhost:3000/quotes/' + id)
			.then(response => {
				this.createNotification('info');
				this.addAwaitingQuote();
			})
			.catch(error => {
				this.createNotification('error');
			});
	};

	addAwaitingQuote = () => {
		if (this.state.awaitingQueue.length !== 0) {
			const quote = this.state.awaitingQueue.splice(0, 1); //choose the longest waiting quote

			const state = this.state;
			state.quotesCount = this.state.quotesCount - 1; //handle quotesCount to pass condition of onQuoteSubmit
			this.setState(state);
			this.onQuoteSubmit(quote);
		} else {
			this.fetchData();
		}
	};

	createNotification = type => {
		switch (type) {
			case 'info':
				toast.info('Quote removed');
				break;
			case 'success':
				toast.success('Quote added successfully', {
					position: toast.POSITION.TOP_RIGHT
				});
				break;
			case 'warning':
				toast.warning('Unfortunately you cannot add more than 10 quotes', {
					position: toast.POSITION.TOP_RIGHT
				});
				break;
			case 'error':
				toast.error('Server error! Try again', {
					position: toast.POSITION.TOP_RIGHT
				});
				break;
		}
	};

	render() {
		return (
			<div className="App page">
				<div>
					<ProgressBar quotesCount={this.state.quotesCount} totalNumberOfQuotes={this.totalNumberOfQuotes} />
					<InputQuote onQuoteSubmit={this.onQuoteSubmit} />
					<Quotes
						allQuotes={this.state.savedQuotes}
						addQuote={this.state.newQuote}
						onQuoteDelete={this.deleteQuote}
					/>
					<ToastContainer />
				</div>
			</div>
		);
	}
}

export default AddQuoteController;
