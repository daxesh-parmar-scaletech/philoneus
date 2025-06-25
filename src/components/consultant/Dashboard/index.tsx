import { Link } from 'react-router-dom';
import { Plus, MessageCircle, ExternalLink, User, HelpCircle, LogOut, ChevronDown } from 'lucide-react';
import logo from 'assets/x.png';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from 'hooks/useAuth';
import Events from './events';

export default function Dashboard() {
    const { logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

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
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            {/* Header */}
            <header className='bg-white shadow-sm border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-16'>
                        <div className='flex items-center space-x-3'>
                            <img src={logo} alt='logo' className='text-white p-1 size-10 bg-black  rounded-xl' />
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

            {/* Main Content */}
            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Create New Flow Section */}
                <div className='mb-12'>
                    <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden'>
                        <div className='absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32'></div>
                        <div className='relative z-10'>
                            <h2 className='text-2xl font-bold mb-2'>Create Your Next AI Event</h2>
                            <p className='text-blue-100 mb-6'>
                                Build intelligent business canvases that guide your clients to breakthrough insights.
                            </p>
                            <Link
                                to='/consultant/flow/new'
                                className='inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg'
                            >
                                <Plus className='w-5 h-5 mr-2' />
                                Create New Event
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Test User Flows */}
                <div className='mb-8'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-6'>Test User Experience</h3>
                    <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6'>
                        <div className='flex items-start space-x-3'>
                            <div className='w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <ExternalLink className='w-3 h-3 text-white' />
                            </div>
                            <div>
                                <h4 className='font-semibold text-yellow-800 mb-2'>Quick Access to User Flows</h4>
                                <p className='text-yellow-700 text-sm mb-4'>Test how your flows appear to users by accessing them directly:</p>
                                <div className='flex flex-wrap gap-3'>
                                    <Link
                                        to='/flow/ai-quick-scan'
                                        className='inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium'
                                    >
                                        <ExternalLink className='w-4 h-4 mr-2' />
                                        AI Quick Scan (User View)
                                    </Link>
                                    <Link
                                        to='/flow/ai-integration'
                                        className='inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium'
                                    >
                                        <ExternalLink className='w-4 h-4 mr-2' />
                                        AI Integration (User View)
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Flows */}
                <Events />

                {/* Review Requests */}
                <div>
                    <h3 className='text-2xl font-bold text-gray-900 mb-6'>Review Requests</h3>
                    <div className='bg-white rounded-xl shadow-sm border border-gray-200'>
                        <div className='p-6'>
                            <div className='flex items-center space-x-4 mb-4'>
                                <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center'>
                                    <MessageCircle className='w-5 h-5 text-orange-600' />
                                </div>
                                <div className='flex-1'>
                                    <h4 className='font-semibold text-gray-900'>New Review Request from Sarah Johnson</h4>
                                    <p className='text-sm text-gray-500'>AI Opportunity Quick Scan • 2 hours ago</p>
                                </div>
                                <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                                    Review Canvas
                                </button>
                            </div>
                            <div className='flex items-center space-x-4'>
                                <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
                                    <MessageCircle className='w-5 h-5 text-green-600' />
                                </div>
                                <div className='flex-1'>
                                    <h4 className='font-semibold text-gray-900'>Review Request from Michael Chen</h4>
                                    <p className='text-sm text-gray-500'>Ambidextrous AI Integration • 1 day ago</p>
                                </div>
                                <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                                    Review Canvas
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
