import call from '../../images/call.png';
import more from '../../images/more.png';
import video from '../../images/video.png';

function FriendInfo({ userName }) {
	return (
		<div className='flex gap-2 justify-between mx-10 mt-4 border-b-2 pb-2'>
			<div className='bg-slate-100 px-4 pr-10 py-1 rounded-md'>
				<p className='font-bold'>{userName}n</p>
				<p className='text-green-500 font-semibold'>online</p>
			</div>
			<div className='flex gap-8 items-center'>
				<img
					src={call}
					className='w-[20px] h-[18px] hover:scale-[1.1] cursor-pointer'
					alt=''
				/>
				<img
					src={video}
					className='w-[20px] h-[16px] hover:scale-[1.1] cursor-pointer'
					alt=''
				/>
				<img src={more} className=' h-[18px] hover:scale-[1.1] cursor-pointer' alt='' />
			</div>
		</div>
	);
}

export default FriendInfo;