import React from 'react';
import { FiSend } from 'react-icons/fi';

function MeesageInput() {
	return (
		<div className='w-full absolute bottom-0 flex justify-center items-center gap-6 mb-4 pt-4 border-t-2 border-black/10'>
			<input type='text' className='w-[70%] px-4 py-2  bg-input-bg   rounded-lg ' />
			<FiSend className=' w-6 h-6 hover:scale-[1.2] cursor-pointer ' />
		</div>
	);
}

export default MeesageInput;
