import { useNavigate, Outlet } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
function PrivateRoute() {
	const { loggedIn, checkingStatus } = useAuthStatus();
	const navigate = useNavigate();

	if (checkingStatus) return;

	return loggedIn ? <Outlet /> : navigate('/login');
}

export default PrivateRoute;
