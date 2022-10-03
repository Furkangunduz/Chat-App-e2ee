import React from 'react';

function Toast({ username = 'kral', accepted, declined }) {
	return (
		<div class='flex  justify-center absolute bottom-5 right-5'>
			<div
				class='bg-white shadow-lg mx-auto w-86 max-w-full text-sm pointer-events-auto bg-clip-padding rounded-lg block'
				id='static-example'
				role='alert'
				aria-live='assertive'
				aria-atomic='true'
				data-mdb-autohide='false'>
				<div class=' bg-white flex justify-center items-center py-2 px-3 bg-clip-padding border-b border-gray-200 rounded-t-lg'>
					<p class='font-bold text-gray-500'>
						Chat request from :{' '}
						<span className='text-dark-blue text-xl font-bold'>{username}</span>
					</p>
				</div>
				<div class='flex justify-center gap-6 p-3 bg-white rounded-b-lg break-words text-gray-700'>
					<button
						onClick={accepted}
						className='px-2 border-2 border-black/20 text-black/75 hover:scale-[1.1] hover:bg-white/40  '>
						Accept
					</button>
					<button
						onClick={declined}
						className='px-2 border-2 border-black/20  text-black/75 hover:scale-[1.1] hover:bg-white/40 '>
						Decline
					</button>
				</div>
			</div>
		</div>
	);
}

export default Toast;
