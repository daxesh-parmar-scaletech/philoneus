import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { User, HelpCircle, LogOut, ChevronDown } from 'lucide-react';

import { useAuth } from 'contexts/AuthContext';
import logo from 'assets/x.png';

export default function Header() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const { logout } = useAuth();

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <header className='bg-white shadow-sm border-b border-gray-200'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center h-16'>
                    <div className='flex items-center space-x-3'>
                        <img src={logo} alt='logo' className='text-white p-1 size-10 bg-black rounded-xl' />
                        <div>
                            <h1 className='text-xl font-bold text-gray-900'>Delta X</h1>
                            <p className='text-sm text-gray-500'>AI Canvas Platform</p>
                        </div>
                    </div>
                    <nav className='flex items-center space-x-8'>
                        <span className='text-blue-600 font-medium border-b-2 border-blue-600 pb-1'>My Events</span>
                        <Link
                            to='/consultant/profile'
                            className='text-gray-500 hover:text-gray-700 cursor-pointer transition-colors flex items-center space-x-1'
                        >
                            <User className='w-4 h-4' />
                            <span>Profile</span>
                        </Link>
                        <Link
                            to='/consultant/help'
                            className='text-gray-500 hover:text-gray-700 cursor-pointer transition-colors flex items-center space-x-1'
                        >
                            <HelpCircle className='w-4 h-4' />
                            <span>Help</span>
                        </Link>
                    </nav>
                    <div className='relative' ref={dropdownRef}>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className='flex items-center space-x-3 focus:outline-none'>
                            <div className='size-8 bg-blue-100 rounded-full flex items-center justify-center'>
                                <span className='text-sm font-medium text-blue-700'>ML</span>
                            </div>
                            <span className='text-sm font-medium text-gray-700'>Dr. Maximilian Lude</span>
                            <ChevronDown className='w-4 h-4' />
                        </button>

                        {isDropdownOpen && (
                            <div className='absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-200 z-50'>
                                <div className='px-4 py-3 border-b'>
                                    <p className='text-sm font-semibold text-gray-800'>Dr. Maximilian Lude</p>
                                    <p className='text-xs text-gray-500'>Consultant</p>
                                </div>
                                <Link
                                    to='/consultant/profile'
                                    className='w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100'
                                    onClick={() => setIsDropdownOpen(false)}
                                >
                                    <User className='w-4 h-4 mr-2' />
                                    Profile
                                </Link>
                                <div className='border-t my-1'></div>
                                <button
                                    onClick={() => {
                                        logout();
                                        setIsDropdownOpen(false);
                                    }}
                                    className='w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50'
                                >
                                    <LogOut className='w-4 h-4 mr-2' />
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
}
