import { Link } from 'react-router-dom';
import { Plus, MessageCircle, Share2, Edit3, Eye, Brain, ExternalLink, User, HelpCircle } from 'lucide-react';
import { useFlow } from '../../contexts/FlowContext';
import x from '../../assets/x.png';

export default function ConsultantDashboard() {
    const { flows } = useFlow();

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            {/* Header */}
            <header className='bg-white shadow-sm border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-16'>
                        <div className='flex items-center space-x-3'>
                            <img src={x} alt='x' className='text-white p-1 size-10 bg-black  rounded-xl' />
                            <div>
                                <h1 className='text-xl font-bold text-gray-900'>Delta X</h1>
                                <p className='text-sm text-gray-500'>AI Canvas Platform</p>
                            </div>
                        </div>
                        <nav className='flex items-center space-x-8'>
                            <span className='text-blue-600 font-medium border-b-2 border-blue-600 pb-1'>My Flows</span>
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
                        <div className='flex items-center space-x-3'>
                            <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center'>
                                <span className='text-sm font-medium text-blue-700'>ML</span>
                            </div>
                            <span className='text-sm font-medium text-gray-700'>Dr. Maximilian Lude</span>
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
                            <h2 className='text-2xl font-bold mb-2'>Create Your Next AI Flow</h2>
                            <p className='text-blue-100 mb-6'>
                                Build intelligent business canvases that guide your clients to breakthrough insights.
                            </p>
                            <Link
                                to='/consultant/flow/new'
                                className='inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg'
                            >
                                <Plus className='w-5 h-5 mr-2' />
                                Create New Flow
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
                <div className='mb-8'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-6'>My Active Flows</h3>
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                        {flows
                            .filter((flow) => flow.isPublished)
                            .map((flow) => (
                                <div
                                    key={flow.id}
                                    className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 hover:-translate-y-1'
                                >
                                    <div className='flex items-start justify-between mb-4'>
                                        <h4 className='text-lg font-semibold text-gray-900 line-clamp-2'>{flow.title}</h4>
                                        <div className='flex items-center space-x-1'>
                                            <Link
                                                to={`/consultant/flow/${flow.id}/edit`}
                                                className='p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                                                title='Edit Flow'
                                            >
                                                <Edit3 className='w-4 h-4' />
                                            </Link>
                                            <Link
                                                to={`/flow/${flow.shareId}`}
                                                className='p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors'
                                                title='View as User'
                                            >
                                                <Eye className='w-4 h-4' />
                                            </Link>
                                            <button
                                                className='p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors'
                                                title='Share Flow'
                                            >
                                                <Share2 className='w-4 h-4' />
                                            </button>
                                        </div>
                                    </div>
                                    <p className='text-gray-600 text-sm mb-4 line-clamp-2'>{flow.description}</p>

                                    {/* Stats */}
                                    <div className='grid grid-cols-3 gap-4 mb-4'>
                                        <div className='text-center'>
                                            <div className='text-lg font-bold text-blue-600'>{flow.starts}</div>
                                            <div className='text-xs text-gray-500'>Starts</div>
                                        </div>
                                        <div className='text-center'>
                                            <div className='text-lg font-bold text-green-600'>{flow.completions}</div>
                                            <div className='text-xs text-gray-500'>Completions</div>
                                        </div>
                                        <div className='text-center'>
                                            <div className='text-lg font-bold text-orange-600'>{flow.reviewRequests}</div>
                                            <div className='text-xs text-gray-500'>Reviews</div>
                                        </div>
                                    </div>

                                    {/* Actions */}
                                    <div className='flex space-x-2'>
                                        <Link
                                            to={`/consultant/flow/${flow.id}/edit`}
                                            className='flex-1 px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors text-center'
                                        >
                                            Edit Flow
                                        </Link>
                                        <Link
                                            to={`/flow/${flow.shareId}`}
                                            className='flex-1 px-3 py-2 text-sm font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors text-center'
                                        >
                                            Test Flow
                                        </Link>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

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
