import React, { Component } from 'react';
import axios from 'axios';

class Quotes extends Component {
	constructor(props: { allQuotes: String[], onQuoteDelete: Function }) {
		super(props);
	}

	removeQuote = e => {
		let id = e.target.parentElement.id;
		if (id === '') id = e.target.id;
		this.props.onQuoteDelete(id);
	};

	render() {
		let quotes = [];
		this.props.allQuotes.forEach(q => {
			quotes.push(
				<div className="quote-wrapper" key={q._id}>
					<div className="quote">{q.text}</div>
					<button type="button" className="close" id={q._id} aria-label="Close" onClick={this.removeQuote}>
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
			);
		});

		return <div id="saved-quotes-component">{quotes}</div>;
	}
}

export default Quotes;
