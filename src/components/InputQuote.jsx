import React, { Component } from 'react';

class InputQuote extends Component {
	constructor(props: { onQuoteSubmit: Function }) {
		super(props);
		this.state = {
			quote: ''
		};

		this.submitQuote = this.submitQuote.bind(this);
	}

	onChange = e => {
		if (e.target.value !== '') {
			const state = this.state;
			state.quote = e.target.value;

			this.setState(state);
		}
	};

	submitQuote = () => {
		if (this.state.quote !== '') {
			this.props.onQuoteSubmit(this.state.quote);
			this.setState({
				quote: ''
			});
			Array.from(document.getElementsByTagName('textarea')).forEach(t => (t.value = ''));
		}
	};

	render() {
		return (
			<div id="input-quote-component">
				<span>Quote</span>
				<textarea onChange={this.onChange} />
				<button onClick={this.submitQuote}>Add Quote</button>
			</div>
		);
	}
}

export default InputQuote;
