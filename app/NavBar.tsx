'use client'
import React from 'react';
import Link from 'next/link';
import { GoIssueClosed } from 'react-icons/go'
import { usePathname } from 'next/navigation';
import classnames from 'classnames';

export const NavBar: React.FC = () => {
	const currentPath = usePathname();
	const links = [
		{ label: 'Dashboard', href: '/' },
		{ label: 'Issues', href: '/issues' }
	]
	return (
		<nav className='flex space-x-6 border-b text-2xl mb-5 px-5 items-center h-14'>
			<Link href={'/'}><GoIssueClosed className="text-blue-400 text-3xl" /></Link>
			<ul className='flex space-x-6'>
				{links.map((link, index) => (
					<li key={index}>
						<Link className={classnames({
							'text-zinc-900': currentPath === link.href,
							'text-zinc-500': true,
							'hover:text-zinc-800 transition-colors': true
						})} href={link.href}>{link.label}</Link>
					</li>

				))}
			</ul>
		</nav>
	);
};
