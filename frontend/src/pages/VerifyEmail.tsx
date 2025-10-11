import { useEffect, useState } from "react";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";
import api from "../utils/api";

const VerifyEmailPage = () => {
  const needsOnboarding = useAuthStore((state) => state.setNeedsOnboarding);
  const setIsLoggedIn = useAuthStore((state) => state.setIsLoggedIn);
  const [resent, setResent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(0); // ⏱️ seconds
  const auth = getAuth();
  const navigate = useNavigate();

  // Auto-check for email verification
  useEffect(() => {
    const interval = setInterval(async () => {
      const user = auth.currentUser;
      if (user) {
        await user.reload();
        if (user.emailVerified) {
          const token = await user.getIdToken(); // refresh token
                await api.post('/api/auth/user', {}, {
                    headers: { Authorization: `Bearer ${token}` },
                });
          setIsLoggedIn(true);
          needsOnboarding(true);
          clearInterval(interval);
          navigate("/onboarding");
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // ⏱️ Cooldown countdown
  useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  const handleResend = async () => {
    setLoading(true);
    const user = auth.currentUser;
    if (user && cooldown === 0) {
      try {
        await sendEmailVerification(user);
        setResent(true);
        setCooldown(60); // ⏱️ Start 60 sec cooldown
      } catch (err) {
        console.error("Failed to send verification email:", err);
      }
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white px-4">
      <div className="max-w-md w-full bg-white shadow-md rounded-lg p-6 text-center">
        <h1 className="text-2xl font-bold text-green-600 mb-4">Verify Your Email</h1>
        <p className="text-gray-700">
          We’ve sent a verification link to your email address. Please check your inbox.
        </p>

        {resent && (
          <p className="text-green-600 mt-2 text-sm">Verification email resent.</p>
        )}

        <div className="flex flex-col mt-6 gap-3">
          <button
            onClick={handleResend}
            disabled={loading || cooldown > 0}
            className={`${
              loading || cooldown > 0
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-green-600 hover:bg-green-700"
            } text-white font-semibold py-2 rounded-lg`}
          >
            {loading
              ? "Resending..."
              : cooldown > 0
              ? `Resend in ${cooldown}s`
              : "Resend Verification Email"}
          </button>

          <button
            onClick={() => navigate("/login")}
            className="text-blue-600 hover:underline text-sm"
          >
            Go to Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
