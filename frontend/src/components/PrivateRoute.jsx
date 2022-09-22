import { useNavigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';

function PrivateRoute() {
	const { loggedIn, checkingStatus } = useAuthStatus();
	const navigate = useNavigate();

	if (checkingStatus) return <h2>loading...</h2>;

	return loggedIn ? <Outlet /> : navigate('/login');
}

export default PrivateRoute;
