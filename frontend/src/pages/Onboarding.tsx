import { useEffect, useState } from 'react';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import clientIcon from '../assets/client.png';
import editorIcon from '../assets/editor.png';
import ProfileUploader from '../components/ProfileUploader';
import Lottie from 'lottie-react';
import plane from '../assets/plane.json';
import { useNavigate } from 'react-router-dom';
import { getAuth } from 'firebase/auth';
import { generateUsername, saveToDb } from '../utils/user';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { uploadToCloudinary } from '../utils/uploadToCloudinary';
import useAuthStore from '../stores/authStore';
import api from '../utils/api';
const Onboarding = () => {
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    // const needsOnboarding = useAuthStore((state) => state.needsOnboarding)
    const setUser = useAuthStore((state) => state.setUser)
    const setNeedsOnboarding = useAuthStore((state) => state.setNeedsOnboarding)
    const navigate = useNavigate()
    console.log("onboarding page rendered");
    
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/login') // ⛔ Block access if not logged in
        }
    }, [])
    const [step, setStep] = useState(1);
    const [role, setRole] = useState<'CLIENT' | 'EDITOR' | null>(null);
    const [form1, setForm1] = useState({ name: '', country: 'India', state: '', phone: '', profileImage: '', });
    const isForm1Valid = form1.name && form1.state && form1.profileImage;
    const [profileFile, setProfileFile] = useState<File | null>(null);

    const nextStep = () => {
        if (step === 1 && role) setStep(2);
        if (step === 2 && isForm1Valid) setStep(3);
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
    };
    const auth = getAuth();
    const onboardingHandler = async () => {
        try {
            const user = auth.currentUser;
            if (!user) throw new Error("User not logged in");

            const token = await user.getIdToken();

            // 1️⃣ Generate Username
            const username = await generateUsername(form1.name, token);
            console.log("generated Username");


            // 2️⃣ Upload to Cloudinary
            if (!profileFile) {
                throw new Error("Profile image file is missing.");
            }
            const avatarUrl = await uploadToCloudinary(profileFile, token, username);

            // 3️⃣ Save user data to backend
            if (!role) {
                throw new Error("Role not defined.");
            }
            await saveToDb({
                role: role, displayName: form1.name,
                country: form1.country,
                state: form1.state,
                phone: form1.phone,
                avatarUrl: avatarUrl,
                username: username
            },
                token);
            console.log("saved to db");

            const res = await api.get('/api/user/me', {
                        headers: { Authorization: `Bearer ${token}` },
                    });
            setUser(res.data);
            setRole(res.data.role );
            setNeedsOnboarding(false);
            console.log("User onboarded successfully");
        } catch (error: any) {
            console.log("Error during onboarding:", error);
            toast.error(error.message || "Something went wrong during onboarding.");
        }
    };

    return (
        <div className="h-screen   flex w-full flex-col items-center py-50 p-6">
            {/* Progress Bar */}
            <div className="w-full  h-2 bg-gray-200  overflow-hidden fixed top-0 left-1/2 -translate-x-1/2 z-50">
                <div
                    className="h-full bg-blue-500 transition-all duration-500"
                    style={{
                        width: step === 1 ? '33.33%' : step === 2 ? '66.66%' : '100%',
                    }}
                ></div>
            </div>

            <div >
                {step > 1 && (
                    <button onClick={prevStep} className="fixed top-6 left-6 bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-full">
                        <ArrowLeft size={30} />
                    </button>
                )}
                {step < 3 && (
                    <button
                        onClick={nextStep}
                        disabled={(step === 1 && !role) || (step === 2 && !isForm1Valid)}
                        className="top-6 right-6 fixed bg-blue-100 hover:bg-blue-200 text-blue-800 p-3 rounded-full"
                    >
                        <ArrowRight size={30} />
                    </button>
                )}



            </div>
            <div className="w-full gap-2 items-center flex flex-col ">
                {/* Navigation Buttons */}


                {/* Step 1: Role Selection */}
                {step === 1 && (
                    <>
                        <h1 className="text-3xl md:text-5xl font-semibold text-center tracking-tight text-blue-600">How will you use akasham?</h1>
                        <div className="flex flex-col mt-6 sm:mt-10 w-full gap-5 items-center">
                            <button
                                onClick={() => setRole('CLIENT')}
                                className={`w-3/4 max-w-100 flex items-center justify-center gap-3 p-3 rounded-xl border-2 transition-all ${role === 'CLIENT'
                                    ? 'border-green-500 bg-green-100'
                                    : 'border-green-500 hover:bg-green-100'
                                    }`}
                            >
                                <img src={clientIcon} alt="Client" className="w-9 h-9" />
                                <span className="text-xl font-semibold">I’m Client</span>
                            </button>
                            <button
                                onClick={() => setRole('EDITOR')}
                                className={`w-3/4 max-w-100 justify-center flex items-center gap-3 p-3 rounded-xl border-2 transition-all ${role === 'EDITOR'
                                    ? 'border-orange-500 bg-orange-100'
                                    : 'border-orange-500 hover:bg-orange-100'
                                    }`}
                            >
                                <img src={editorIcon} alt="Editor" className="w-9 h-9" />
                                <span className="text-xl font-semibold">I’m Editor</span>
                            </button>
                        </div>
                        <p className="text-xs sm:text-sm fixed bottom-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-gray-500 text-center ">
                            <span className="text-red-500">*</span> You can switch your role later — this just helps us personalize your initial setup.
                        </p>

                    </>
                )}

                {/* Step 2: Personal Info */}
                {step === 2 && (
                    <>
                        <h1 className="text-3xl md:text-5xl font-semibold text-center text-blue-600 tracking-tight -mt-20">Let’s get to know you better</h1>

                        <div className="flex flex-col w-full max-w-130 px-2 gap-5 mt-3 sm:mt-6  ">
                            <ProfileUploader
                                image={form1.profileImage}
                                setImage={(img) => setForm1((prev) => ({ ...prev, profileImage: img }))}
                                setFile={(file) => setProfileFile(file)}

                            />
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1 block">Display Name</label>
                                <input
                                    type="text"
                                    value={form1.name}
                                    onChange={(e) => setForm1({ ...form1, name: e.target.value })}
                                    className="w-full px-4 py-2 font-medium rounded-lg border border-green-400  focus:outline-none focus:ring-2 focus:ring-green-500"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1 block">Country</label>
                                <input
                                    type="text"
                                    value="India"
                                    disabled
                                    className="w-full px-4 font-medium py-2 rounded-lg  bg-[#77777723]   text-gray-700 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1 block">State</label>
                                <select
                                    value={form1.state}
                                    onChange={(e) => setForm1({ ...form1, state: e.target.value })}
                                    className="w-full px-4 py-2 pl-3 font-medium appearance-none rounded-lg border border-yellow-400 focus:outline-none focus:ring-2 focus:ring-yellow-500"
                                >
                                    <option value="">Select State</option>
                                    <option value="Andhra Pradesh">Andhra Pradesh</option>
                                    <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                                    <option value="Assam">Assam</option>
                                    <option value="Bihar">Bihar</option>
                                    <option value="Chhattisgarh">Chhattisgarh</option>
                                    <option value="Goa">Goa</option>
                                    <option value="Gujarat">Gujarat</option>
                                    <option value="Haryana">Haryana</option>
                                    <option value="Himachal Pradesh">Himachal Pradesh</option>
                                    <option value="Jharkhand">Jharkhand</option>
                                    <option value="Karnataka">Karnataka</option>
                                    <option value="Kerala">Kerala</option>
                                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                                    <option value="Maharashtra">Maharashtra</option>
                                    <option value="Manipur">Manipur</option>
                                    <option value="Meghalaya">Meghalaya</option>
                                    <option value="Mizoram">Mizoram</option>
                                    <option value="Nagaland">Nagaland</option>
                                    <option value="Odisha">Odisha</option>
                                    <option value="Punjab">Punjab</option>
                                    <option value="Rajasthan">Rajasthan</option>
                                    <option value="Sikkim">Sikkim</option>
                                    <option value="Tamil Nadu">Tamil Nadu</option>
                                    <option value="Telangana">Telangana</option>
                                    <option value="Tripura">Tripura</option>
                                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                                    <option value="Uttarakhand">Uttarakhand</option>
                                    <option value="West Bengal">West Bengal</option>

                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-semibold text-gray-700 mb-1 block">
                                    Phone Number <span className="text-gray-400 text-xs">(Optional)</span>
                                </label>
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-md font-semibold text-gray-700">
                                        🇮🇳 +91
                                    </div>
                                    <input
                                        type="text"
                                        value={form1.phone}
                                        onChange={(e) => setForm1({ ...form1, phone: e.target.value })}
                                        placeholder="Enter phone number"
                                        className="flex-1 px-3 py-2 border border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 rounded-md bg-white"
                                    />
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {/* Step 3: Thank You / Welcome */}
                {step === 3 && (
                    <div className="  flex flex-col mt-18 items-center justify-center gap-3 w-full  text-center px-4">
                        <Lottie animationData={plane} loop={true} className='h-90  absolute top-5'></Lottie>
                        <h1 className="text-4xl relative md:text-5xl tracking-tight font-bold text-blue-600 ">
                            Welcome to akasham!
                        </h1>

                        <p className="text-gray-500 font-poor-story text-2xl max-w-xl">
                            Thank you for choosing <span className="font-semibold">akasham</span> to start your creative journey.

                        </p>



                        <button
                            onClick={onboardingHandler}
                            className=" bg-black text-white font-semibold px-6 py-3 mt-5 rounded-full text-lg transition"
                        >
                            Go to Home
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default Onboarding;
