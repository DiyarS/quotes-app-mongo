import React, { Component } from 'react';

const Landing = () => (
	<div id="landing" className="page">
		<div className="landing-quote-wrapper">
			<div className="img-wrapper">
				<img src={require('../../src/img/gandhi.jpg')} />
			</div>
			<div className="text-wrapper">
				<p className="landing-quote-text">“Be the change that you wish to see in the world.” </p>
				<span className="quote-author">― Mahatma Gandhi</span>
			</div>
		</div>

		<div className="landing-quote-wrapper">
			<div className="text-wrapper">
				<p className="landing-quote-text">
					“Friendship ... is born at the moment when one man says to another "What! You too? I thought that no
					one but myself . . .”{' '}
				</p>
				<span className="quote-author">― C.S. Lewis, The Four Loves</span>
			</div>
			<div className="img-wrapper">
				<img src={require('../../src/img/lewis.jpg')} />
			</div>
		</div>

		<div className="landing-quote-wrapper">
			<div className="img-wrapper">
				<img src={require('../../src/img/camus.jpg')} />
			</div>
			<div className="text-wrapper">
				<p className="landing-quote-text">
					“Don’t walk in front of me… I may not follow. Don’t walk behind me… I may not lead. Walk beside me…
					just be my friend”{' '}
				</p>
				<span className="quote-author">― Albert Camus</span>
			</div>
		</div>
	</div>
);

export default Landing;
