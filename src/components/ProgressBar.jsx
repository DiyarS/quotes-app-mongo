import React, { Component } from 'react';

class ProgressBar extends Component {
	constructor(props: { quotesCount: number, totalNumberOfQuotes: number }) {
		super(props);
		this.state = {
			quotesAdded: 0
		};
	}

	componentDidMount() {
		this.setState({
			quotesAdded: this.props.quotesCount
		});
	}

	componentWillReceiveProps(nextProps: { quotesCount: number }) {
		this.setState({
			quotesAdded: nextProps.quotesCount
		});
	}

	render() {
		let widthStyle = {
			width: this.state.quotesAdded / this.props.totalNumberOfQuotes * 100 + '%'
		};

		return (
			<div id="progress-bar-component">
				<span>Quotes Added</span>
				<div id="progress-bar-wrapper">
					<div id="progress-bar" style={widthStyle}>
						<span>
							{this.state.quotesAdded}/{this.props.totalNumberOfQuotes}
						</span>
					</div>
				</div>
			</div>
		);
	}
}

export default ProgressBar;
