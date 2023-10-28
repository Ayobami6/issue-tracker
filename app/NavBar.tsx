import React from 'react';
import Link from 'next/link';

export const NavBar = () => {
	return (
		<nav>
			<Link href={'/'}>Home</Link>
			<ul>
				<li>
					<Link href={'/'}>Dashboard</Link>
				</li>
				<li></li>
			</ul>
		</nav>
	);
};
