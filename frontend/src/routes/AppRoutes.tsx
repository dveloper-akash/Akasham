import { Routes, Route } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import SignupPage from '../pages/SignupPage';
import LoginPage from '../pages/LoginPage';
import EditorHomePage from '../pages/EditorHomePage';
import CreatePost from '../pages/CreatePost';
import Inbox from '../pages/Inbox';
import Profile from '../pages/Profile';
import OrderPage from '../pages/OrderPage';
import OrderDetails from '../pages/OrderDetails';
import Onboarding from '../pages/Onboarding';
import VerifyEmailPage from '../pages/VerifyEmail';
import Settings from '../pages/Settings';
import ProtectedRoute from './protectedRoute';
import useAuthStore from '../stores/authStore';

const AppRoutes = () => {
    const { isLoggedIn, needsOnboarding } = useAuthStore();

    

    if (!isLoggedIn) {
        console.log("Not logged in, showing public routes");
        return (
            <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/verify-email" element={<VerifyEmailPage />} />
            </Routes>
        );
    }

    if (needsOnboarding) {
        console.log("Needs onboarding, redirecting to onboarding page");
        return (
            <Routes>
                <Route path="/onboarding" element={<Onboarding />} />
            </Routes>
        );
    }
    console.log("Logged in, showing editor routes");
    return (
        <Routes>
            <Route element={<ProtectedRoute />}>
                <Route path="/editor/home" element={<EditorHomePage />} />
                <Route path="/editor/create-post" element={<CreatePost />} />
                <Route path="/editor/inbox" element={<Inbox />} />
                <Route path="/editor/profile" element={<Profile />} />
                <Route path="/editor/orders" element={<OrderPage />} />
                <Route path="/editor/orderdetails" element={<OrderDetails />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="*" element={<EditorHomePage />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;
