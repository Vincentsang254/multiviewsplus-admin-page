/** @format */

import React from "react";

const Loader = () => {
	return (
		<div className='flex items-center justify-center min-h-screen'>
			<div className='flex flex-col items-center'>
				<div className='animate-spin rounded-full border-t-4 border-blue-800 h-12 w-12 mb-2'>
					<span className='sr-only'>Loading...</span>
				</div>
				<div className='text-gray-700'>Loading...</div>
			</div>
		</div>
	);
};

export default Loader;
