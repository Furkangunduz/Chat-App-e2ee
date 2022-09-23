import call from '../images/call.png';
import more from '../images/more.png';
import video from '../images/video.png';
import { FiSend } from 'react-icons/fi';
function Home() {
	return (
		<div className='bg-bg flex w-full justify absolute'>
			<div className='flex flex-col gap-10 min-w-[450px] h-screen pt-10 pl-10'>
				<input
					type='text'
					placeholder='Search'
					className='px-10 py-4 rounded-lg focus:outline-dark-blue drop-shadow-md'
				/>
				<div className=' bg-white rounded-lg px-4 py-6  max-h-[510px] overflow-hidden drop-shadow-md mb-4'>
					<h3 className='text-dark-blue font-bold text-2xl ml-4'>Friends</h3>
					<div className='flex flex-col h-full gap-6 bg-white pt-6 overflow-auto  '>
						{[1, 2, 3, 4, 5, 6, 7, 8, 9].map((element, index) => (
							<div key={index}>
								<p className='border-b-2 pb-4'>kraldragon</p>
							</div>
						))}
					</div>
				</div>
			</div>
			<div className='relative min-w-[550px] max-h-[600px] bg-white w-[50%] mx-10 ml-40 my-10 pr-5 rounded-lg drop-shadow-lg overflow-hidden'>
				<div className='flex gap-2 justify-between mx-10 mt-4 border-b-2 pb-2'>
					<div>
						<p>Kral Dragon</p>
						<p className='text-green-500'>online</p>
					</div>
					<div className='flex gap-8 items-center'>
						<img
							src={call}
							className='w-5 h-5 hover:scale-[1.1] cursor-pointer'
							alt=''
						/>
						<img
							src={video}
							className='w-5 h-5 hover:scale-[1.1] cursor-pointer'
							alt=''
						/>
						<img
							src={more}
							className=' h-5 hover:scale-[1.1] cursor-pointer'
							alt=''
						/>
					</div>
				</div>
				<div className='min-h-[70%] w-[90%] ml-10 pt-10'>
					{[
						{ text: 'Hello world', sender: 'friend' },
						{ text: 'Hello world', sender: 'me' },
						{ text: 'Hello world', sender: 'friend' },
						{ text: 'Hello world', sender: 'friend' },
						{ text: 'Hello world', sender: 'friend' },
						{ text: 'Hello world', sender: 'me' },
						{ text: 'Hello world', sender: 'me' },
						{ text: 'Hello world', sender: 'me' },
					].map((element, indx) => {
						let { text, sender } = element;
						return (
							<div
								className={`flex ${
									sender == 'me' ? 'justify-end' : 'justify-start'
								} w-full m-1`}>
								<p
									className={`${
										sender == 'me'
											? 'bg-dark-blue'
											: 'bg-friend-text-bg'
									} text-white text-center px-2 py-2`}>
									{text}
								</p>
							</div>
						);
					})}
				</div>

				<div className='w-full absolute bottom-0 flex justify-center items-center gap-6 mb-4'>
					<input
						type='text'
						className='w-[70%] px-4 py-2  bg-input-bg   rounded-lg '
					/>
					<FiSend className=' w-6 h-6 hover:scale-[1.2] cursor-pointer ' />
				</div>
			</div>
		</div>
	);
}

export default Home;
