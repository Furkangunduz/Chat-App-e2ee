import { useContext, useState } from 'react';
import { NavLink } from 'react-router-dom';

import UserContext from '../context/UserContext';
import SocketContext from '../context/SocketContext';

function Login() {
	const { login } = useContext(UserContext);
	const { socket } = useContext(SocketContext);

	const [loginCredential, setLoginCredential] = useState({
		email: '',
		password: '',
	});
	const { email, password } = loginCredential;

	const onChange = (e) => {
		setLoginCredential((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		login(loginCredential, socket);
	};
	return (
		<div className='w-full h-screen grid place-content-center bg-bg'>
			<div className=' rounded-md px-8 py-6 bg-white'>
				<section>
					<h1 className='font-serif font-bold text-dark-blue text-center text-[40px] drop-shadow-2xl mb-8'>
						Login
					</h1>
				</section>
				<section>
					<form className='flex flex-col gap-6' onSubmit={onSubmit}>
						<div className='flex flex-col '>
							<label
								className='mb-2 ml-2 text-black/50 font-bold'
								htmlFor='email'>
								Email
							</label>
							<input
								className='w-[400px] border-2 border-black/10 py-2 pl-2 rounded-lg focus:outline-dark-blue/50 '
								autoComplete='off'
								type='email'
								id='email'
								name='email'
								value={email}
								onChange={onChange}
								placeholder='Enter your email'
								required
							/>
						</div>
						<div className='flex flex-col'>
							<label
								className='mb-2 ml-2 text-black/50 font-bold'
								htmlFor='password'>
								Password
							</label>
							<input
								className='w-[400px] border-2 border-black/10 py-2 pl-2 rounded-lg focus:outline-dark-blue/50 '
								autoComplete='off'
								type='password'
								id='password'
								name='password'
								value={password}
								onChange={onChange}
								placeholder='Enter password'
								required
							/>
						</div>
						<p className='text-right'>
							Don't you have an account?{' '}
							<NavLink
								className='text-dark-blue hover:text-dark-blue/50'
								to='/register'>
								Register.
							</NavLink>
						</p>
						<div className='w-full grid place-content-center mt-2'>
							<button
								type='submit'
								className='px-4 py-[4px] bg-dark-blue text-white text-[40px] font-semibold drop-shadow-2xl rounded-sm hover:bg-dark-blue/70 hover:-translate-y-1 transition-all'>
								Login
							</button>
						</div>
					</form>
				</section>
			</div>
		</div>
	);
}

export default Login;
