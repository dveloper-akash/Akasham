import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../stores/authStore';

const ProtectedRoute: React.FC = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
    const needsOnboarding = useAuthStore((state) => state.needsOnboarding);

    if (!isLoggedIn) return <Navigate to="/login" replace/>;
    if (needsOnboarding) return <Navigate to="/onboarding" replace />;
    console.log("outlet rendered");
    
    return <Outlet />;
};

export default ProtectedRoute;
