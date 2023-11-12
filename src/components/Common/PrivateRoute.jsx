import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import FullScreenLoader from '../Loader/FullScreen';

const PrivateRoute = () => {
    const { user, loading } = useSelector((state) => state.user);

    if (loading) {
        return <FullScreenLoader />;
    }

    if (!user) {
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default PrivateRoute
