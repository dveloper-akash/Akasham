import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { app } from '../Firebase';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import google from '../assets/google.svg';
import { Link } from 'react-router-dom';
// import useAuthStore from '../stores/authStore';
const Signuppage = () => {
  // const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // 1. Create Firebase user
      const data=await createUserWithEmailAndPassword(
        auth,
        form.email,
        form.password
      );
      sendEmailVerification(data.user);
      navigate("/verify-email");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        toast.error(err.response?.data?.error || err.message);
      } else if (err instanceof Error) {
        toast.error(err.message);
      } else {
        toast.error("An unknown error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };
  const handleGoogleSignup = async () => {
    try {
      await signInWithPopup(auth, provider);
      
    } catch (err) {
      toast.error("Google signup failed");
    }
  };
  return (
    <div className='p-5  flex flex-col items-center h-screen'>
      <nav className='flex w-full gap-3'>
        <h1 className='font-bold tracking-tight text-4xl  '>akasham</h1>
      </nav>
      <div className="w-full mt-25  px-5 max-w-150   flex justify-center ">
        <form onSubmit={handleSubmit} className="flex  flex-col bg-black text-white  w-full  items-center  px-10 pt-9 rounded-3xl ">

          <h1 className='text-2xl  font-medium'>Create Your Account</h1>
          <button type='button' onClick={handleGoogleSignup} className='flex border rounded-full outline-none border-[#ffffff6b] py-2 gap-2 hover:border-white cursor-pointer w-full mt-8 mb-1 items-center justify-center'>
            <img src={google} className='w-7 h-auto' alt="google" />
            <h3 className='text-lg font-semibold'>Login with Google</h3>
          </button>
          <div className="flex items-center w-full gap-4 my-4">
            <hr className="flex-grow  border-t border-[#c3c3c342]" />
            <span className="text-[#f5f3f359] font-semibold">OR</span>
            <hr className="flex-grow  border-t border-[#c3c3c342]" />
          </div>

          <h3 className='tracking-wide text-lg  font-medium  px-2 w-full '>Email</h3>
          <input name='email' onChange={handleChange} type="email" className='mt-1  placeholder-[#5e5e5ec7] flex border rounded-full px-4 outline-none border-[#ffffff6b] py-2 w-full focus:border-white ' placeholder='Enter your email' required />
          <h3 className='tracking-wide mt-4 text-lg font-medium  px-2 w-full '>Password</h3>
          <input name='password' onChange={handleChange} type="password" className='mt-1 font-medium placeholder-[#5e5e5ec7] flex border rounded-full px-4 outline-none border-[#ffffff6b] py-2 w-full focus:border-white ' placeholder='Enter your password' required />
          <button type='submit' disabled={loading}
            className={`${loading ? "opacity-70" : ""
              } w-full  text-black bg-white font-bold flex border border-transparent hover:border-white hover:bg-transparent hover:text-white transition duration-200  rounded-full  py-2  cursor-pointer   mt-8 items-center justify-center  tracking-wide text-xl`}>{loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              ) : (
                "Create Account"
              )}</button>
              <h2 className='pt-4 text-sm font- pb-2'>already have an account? <Link to="/login" className='text-blue-400'>Login</Link></h2>
        </form>
      </div>
      <ToastContainer aria-label="Notification" />
    </div>

  )
}

export default Signuppage