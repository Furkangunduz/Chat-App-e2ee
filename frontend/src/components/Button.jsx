import React from 'react';

function Button({ children }) {
	return (
		<button className=' px-2 py-2 bg-dark-blue text-white font-semibold border-2 border-black/20 rounded-lg hover:scale-[1.05] hover:bg-dark-blue/95 hover:-translate-y-1 transition-transform'>
			{children}
		</button>
	);
}

export default Button;
