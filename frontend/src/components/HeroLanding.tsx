import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import editorAnim from '../assets/editor-animation.json'; // Lottie file

const HeroLanding = () => {
  return (
    <section className="w-full  flex flex-col md:flex-row items-center justify-center px-15 py-10 bg-white text-gray-900">
      {/* Text Left */}
      <div className="flex-1 mb-10 md:mb-0 ">
        <h1 className="text-4xl md:text-6xl font-bold leading-snug mb-3">
          Your Story<br /> Deserves the Perfect Editor
        </h1>
        <p className="text-gray-600 text-lg md:text-2xl font-poor-story mb-6">
          Post your project. Connect with real editors. Get it done beautifully.
        </p>
        <Link
          to="/signup"
          className="inline-block bg-black text-white text-xl font-bold px-6 py-3 rounded-full hover:bg-transparent hover:text-black hover:border-black border transition"
        >
          Get Started
        </Link>
      </div>

      {/* Animation Right */}
      <div className="flex-1 max-w-md">
        <Lottie animationData={editorAnim} loop={true} />
      </div>
    </section>
  );
};

export default HeroLanding;
