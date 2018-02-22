import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
	<header>
		<Link to="/">
			<i className="fas fa-home" />
		</Link>
		<Link to="/add-quote">
			<i className="fas fa-plus" />
		</Link>
	</header>
);

export default Header;
