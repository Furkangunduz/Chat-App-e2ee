import React from 'react';
import FriendListItem from './FriendListItem';

function FriendList() {
	return (
		<div className='flex flex-col gap-10 min-w-[450px] h-screen pt-10 pl-10'>
			<input
				type='text'
				placeholder='Search'
				className='px-10 py-4 rounded-lg focus:outline-dark-blue drop-shadow-md'
			/>
			<div className=' bg-white rounded-lg px-4 py-6  max-h-[510px] overflow-hidden drop-shadow-md mb-4'>
				<h3 className='text-dark-blue font-bold text-2xl ml-4'>Friends</h3>
				<div className='flex flex-col h-full gap-6 bg-white pt-6 overflow-auto  '>
					{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((_, index) => (
						<FriendListItem key={index} />
					))}
				</div>
			</div>
		</div>
	);
}

export default FriendList;
