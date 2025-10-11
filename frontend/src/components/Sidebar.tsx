import { X } from 'lucide-react'; // optional icon // replace with your user image path
import { Link } from 'react-router-dom';
import { auth } from '../Firebase';
import useAuthStore from '../stores/authStore';
interface SidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

const Sidebar = ({ isOpen, onClose }: SidebarProps) => {
    const user = useAuthStore((state) => state.user);
    return (
        <>
            {/* Overlay */}
            <div
                className={`fixed inset-0 bg-black  z-40 transition-opacity duration-300 ${isOpen ? 'opacity-40 visible' : 'opacity-0 invisible'
                    }`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <aside
                className={`fixed top-0 right-0 h-full w-full sm:w-96 bg-white shadow-md z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'
                    }`}
            >
                <div className='flex flex-col shadow-lg p-4 border-b gap-4 border-[#0000001c]'>
                    <div className="flex justify-between items-center  ">
                        <div className="flex items-center space-x-3">
                            <div className="">
                                <img
                                    src={user?.avatarUrl}
                                    alt="profile"
                                    className="h-13 w-13 rounded-full object-cover"
                                />
                            </div>
                            <div className='flex  flex-col '>
                                <h1 className='font-semibold text-3xl'>{user?.displayName}</h1>
                                <h3 className='text-sm text-[#404040f6] -mt-2'>{user?.email}</h3>
                            </div>
                        </div>
                        <button onClick={onClose} className='mr-1 cursor-pointer sm:mr-0'>
                            <X className="w-10 h-10 text-[#4e4e4e]" />
                        </button>
                    </div>
                    <div className=' w-full flex justify-center'>
                        <button className='w-full rounded-xl p-2 text-white hover:bg-green-700 text-lg font-semibold bg-green-800'>Switch Role</button>
                    </div>
                </div>

                <nav className=' flex flex-col tracking-tight cursor-pointer  text-2xl font-medium text-center items-center w-full' >
                    <Link to="/" className=' p-4 border-b hover:bg-[#cfe7fb67] border-[#2828283b] w-full'>Home</Link>
                    <Link to="/editor/orders" className=' p-4 border-b hover:bg-[#cfe7fb67] border-[#2828283b] w-full'>Orders</Link>
                    <Link to="/settings" className=' p-4 border-b hover:bg-[#cfe7fb67] border-[#2828283b] w-full'>Settings</Link>
                    <button
                        onClick={() => {
                            const confirmed = window.confirm("Are you sure you want to logout?");
                            if (confirmed) {
                                auth.signOut();
                                useAuthStore.getState().logout();
                            }
                        }}
                        className='hover:bg-red-50 p-4 text-red-600 border-b border-[#2828283b] w-full'>
                        Logout
                    </button>

                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
