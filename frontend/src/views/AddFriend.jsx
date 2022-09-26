import React from 'react';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

function Add_Friend() {
	return (
		<div className='grid place-content-center w-full h-screen overflow-hidden  bg-bg'>
			<div className='h-[30vh] w-[60vw] border-2 border-black/20 rounded-xl bg-white'>
				<div className='w-full h-full pt-10'>
					<div className='flex justify-center items-start gap-6 '>
						<label htmlFor='public_key'>
							<h1 className='font-semibold text-xl mt-1'>Public Key :</h1>
						</label>
						<input
							type='text'
							id='public_key'
							className='w-[50%] px-4 py-2 bg-input-bg rounded-lg '
							placeholder='Paste Here Your Friends Public Key'
						/>
						<Button>ADD</Button>
					</div>
					{false && (
						<div className='flex justify-center items-center'>
							<Spinner />
							<h1 className='font-semibold mb-[-100px]'>
								Waiting for Friend Reply
							</h1>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default Add_Friend;
