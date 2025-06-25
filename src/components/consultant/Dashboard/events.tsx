import { Link } from 'react-router-dom';
import { Edit3, Eye, Share2 } from 'lucide-react';
import { useFlow } from 'contexts/FlowContext';

export default function Events() {
    const { flows } = useFlow();

    return (
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
    );
}
