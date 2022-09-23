import { useNavigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { useEffect } from 'react';
function PrivateRoute() {
	const { loggedIn, checkingStatus } = useAuthStatus();
	const navigate = useNavigate();

	useEffect(() => {
		if (!loggedIn && !checkingStatus) navigate('/register');
	}, [loggedIn]);

	if (checkingStatus) return <h2>loading...</h2>;
	if (loggedIn) return <Outlet />;
}

export default PrivateRoute;
