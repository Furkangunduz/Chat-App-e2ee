import { createContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const userStorage = JSON.parse(localStorage.getItem('user'));
	const navigate = useNavigate();
	const [userInfo, setUserInfo] = useState({
		user: userStorage || null,
		isError: false,
		isSucces: false,
		isLoading: false,
		message: '',
	});

	const register = (userCredential) => {
		axios.post(process.env.REACT_APP_API_URL + '/users', userCredential)
			.then((res) => {
				let user = res?.data || undefined;
				if (user != undefined) {
					setUserInfo((prev) => ({ ...prev, user: user }));
					localStorage.setItem('user', JSON.stringify(user));
					navigate('/');
				}
			})
			.catch((err) => {
				console.log(err?.response?.data?.message);
				console.log(err?.response?.data?.stack);
			});
	};

	const login = async (loginCredential) => {
		axios.post(process.env.REACT_APP_API_URL + '/users/login', loginCredential)
			.then((res) => {
				console.log(res?.data);
				let user = res?.data || undefined;
				if (user != undefined) {
					setUserInfo((prev) => ({ ...prev, user: user }));
					localStorage.setItem('user', JSON.stringify(user));
					navigate('/');
				}
			})
			.catch((err) => {
				console.log(err?.response?.data?.message);
				console.log(err?.response?.data?.stack);
			});
	};

	return (
		<UserContext.Provider
			value={{
				user: userInfo['user'],
				setUserInfo,
				register,
				login,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserContext;
