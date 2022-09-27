import { useContext } from 'react';
import UserContext from '../../context/UserContext';
import { toast } from 'react-toastify';
import { FiCopy } from 'react-icons/fi';

function Key() {
	const { user } = useContext(UserContext);

	const copyPublicKey = () => {
		navigator.clipboard.writeText(user.public_key);
		toast('Public Key Coppied!', { toastId: 'public_key' });
	};

	return (
		<div
			onClick={copyPublicKey}
			className='flex items-center gap-2 border-2 border-black/20 bg-white px-6 py-2 rounded-lg cursor-pointer hover:-translate-y-[1px] hover:scale-[1.05] transition-all'>
			<p>
				<span style={{ userSelect: 'none' }} className='text-dark-blue font-bold mr-3'>
					Your Public Key
				</span>
				{user.public_key}
			</p>
			<FiCopy />
		</div>
	);
}

export default Key;
