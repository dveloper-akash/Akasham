import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './Firebase';
import useAuthStore from './stores/authStore';
import api from './utils/api';
import { useNavigate } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

const App = () => {
    const navigate = useNavigate();
    // const emailSentRef = useRef(false);
    const { setUser, setLoading, setNeedsOnboarding, logout, isLoading, setIsLoggedIn,setRole } = useAuthStore();

    useEffect(() => {
        setLoading(true);

        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (!user) {
                logout();
                setLoading(false);
                navigate('/');
                return;
            }

            if (!user.emailVerified) {
                setLoading(false);
                navigate('/verify-email');
                return;
            }

            try {
                const token = await user.getIdToken();

                // Try to get user from backend
                const response = await api.get('/api/user/me', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                console.log("User fetched from backend:", response.data);
                setIsLoggedIn(true);
                if (response.data.needsOnboarding) {
                    setNeedsOnboarding(true);
                    navigate('/onboarding');
                } else {
                    setUser(response.data);
                    setRole(response.data.role);
                    setNeedsOnboarding(false);
                    const publicPaths = ['/', '/login', '/signup', '/verify-email'];
                    if (publicPaths.includes(location.pathname)) {
                        navigate('/editor/home');
                    }
                }
            } catch (error: any) {
                if (error.response?.status === 404) {
                    console.warn('User not found, creating user in backend');
                    // User not found → create user
                    const token = await user.getIdToken(); // refresh token
                    await api.post('/api/auth/user', {}, {
                        headers: { Authorization: `Bearer ${token}` },
                    });

                    // Retry fetching the newly created user
                    try {
                        const res = await api.get('/api/user/me', {
                            headers: { Authorization: `Bearer ${token}` },
                        });
                        setIsLoggedIn(true);
                        if (res.data.needsOnboarding) {
                            setNeedsOnboarding(true);
                            navigate('/onboarding');
                        } else {
                            setUser(res.data);
                            setNeedsOnboarding(false);
                            navigate('/editor/home');
                        }
                    } catch (fetchError) {
                        console.error('Retry failed:', fetchError);
                        logout();
                    }
                } else {
                    console.error('Failed to fetch user:', error);
                    logout();
                }
            } finally {
                setLoading(false);
            }
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        console.log("Loading...");

        return (
            <div className="h-screen flex items-center justify-center bg-white transition-opacity duration-500">
                <div className="w-10 h-10 border-[2px] border-black border-t-transparent rounded-full animate-spin"></div>
            </div>
        );
    }

    return <div className="font-poppins">
        <AppRoutes />
    </div>;
};

export default App;
