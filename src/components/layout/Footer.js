/** @format */

import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
	const currentYear = new Date().getFullYear();

	return (
		<footer className='bg-gray-800 text-white py-4 mt-auto'>
			<div className='container mx-auto flex flex-col md:flex-row justify-between items-center'>
				<div className='flex flex-col items-center md:items-start'>
					<Link to='/' className='text-2xl font-bold hover:text-blue-400'>
						Monsters
					</Link>
					<p className='mt-2 text-sm'>
						© {currentYear} Monsters. All rights reserved.
					</p>
				</div>
				<div className='flex flex-col md:flex-row mt-4 md:mt-0 gap-4'>
					<Link to='/contact' className='text-sm hover:text-blue-400'>
						Contact us
					</Link>
					<Link to='/about-us' className='text-sm hover:text-blue-400'>
						About us
					</Link>
					<Link to='/terms' className='text-sm hover:text-blue-400'>
						Terms of Service
					</Link>
					<Link to='/privacy' className='text-sm hover:text-blue-400'>
						Privacy Policy
					</Link>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
