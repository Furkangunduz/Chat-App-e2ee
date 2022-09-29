import { useState } from 'react';
import Spinner from '../components/Spinner';
import Button from '../components/Button';

function StartChat({ socket }) {
	const [friendPublicKey, setFriendPublicKey] = useState('');
	const startChat = () => {
		socket.emit('start-chat-request', friendPublicKey);
	};

	return (
		<div className='grid place-content-center w-full h-screen overflow-hidden  bg-bg'>
			<div className='h-[30vh] w-[60vw]  border-2 border-black/20 rounded-xl bg-white'>
				<div className='w-full h-full flex items-center justify-center'>
					<div className='w-full flex justify-center items-center gap-6 '>
						<label htmlFor='public_key'>
							<h1 className='font-semibold text-xl mt-1'>Public Key</h1>
						</label>
						<input
							type='text'
							id='public_key'
							className='w-[50%] px-4 py-2 bg-input-bg rounded-lg '
							value={friendPublicKey}
							onChange={(e) => {
								setFriendPublicKey(e.target.value);
							}}
							placeholder='Paste Here Your Friends Public Key'
						/>
						<div
							onClick={() => {
								startChat(friendPublicKey);
							}}>
							<Button>START</Button>
						</div>
					</div>
					{false && (
						<div className='flex justify-center items-center '>
							<Spinner />
							<h1 className='absolute font-semibold text-3xl top-20 left-[40%]'>
								Waiting for Friend Reply
							</h1>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default StartChat;
