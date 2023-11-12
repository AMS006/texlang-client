import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import FullScreenLoader from '../Loader/FullScreen';

const AdminRoute = () => {
    const { user, loading } = useSelector((state) => state.user);

    if (loading) {
        return <FullScreenLoader />;
    }

    if (!user) {
        return <Navigate to="/" />;
    }
    if (user.role === 'admin')
        return <Outlet />

    return <Navigate />;
}

export default AdminRoute
