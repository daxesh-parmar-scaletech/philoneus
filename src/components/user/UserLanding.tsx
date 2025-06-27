import { useParams, useNavigate } from 'react-router-dom';
import { Play, User, Award, Clock } from 'lucide-react';
import { useFlow } from '../../contexts/FlowContext';
import { useEffect } from 'react';

export default function UserLanding() {
    const { shareId } = useParams();
    const navigate = useNavigate();
    const { currentFlow, startUserSession, fetchWorkshopDetails, detailLoading } = useFlow();

    useEffect(() => {
        if (shareId) {
            fetchWorkshopDetails(shareId);
        }
    }, [shareId, fetchWorkshopDetails]);

    if (detailLoading) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>Loading...</h1>
                    <p className='text-gray-600'>Please wait while we fetch the flow details.</p>
                </div>
            </div>
        );
    }

    if (!currentFlow) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>Flow not found</h1>
                    <p className='text-gray-600'>The flow you're looking for doesn't exist or isn't published.</p>
                </div>
            </div>
        );
    }

    const handleStartSession = () => {
        startUserSession(currentFlow.id);
        navigate(`/flow/${currentFlow.id}/questions`);
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                {/* Consultant Branding */}
                <div className='text-center mb-12'>
                    <div className='w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <span className='text-2xl font-bold text-white'>ML</span>
                    </div>
                    <div className='text-sm text-gray-600 mb-2'>Innovation & Future Affairs Expert</div>
                    <h1 className='text-2xl font-bold text-gray-900'>Dr. Maximilian Lude</h1>
                </div>

                {/* Flow Information */}
                <div className='bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden'>
                    {/* Header */}
                    <div className='bg-gradient-to-r from-blue-600 to-blue-700 px-8 py-12 text-white text-center'>
                        <h2 className='text-3xl font-bold mb-4'>{currentFlow.title}</h2>
                        <p className='text-xl text-blue-100 max-w-2xl mx-auto leading-relaxed'>{currentFlow.description}</p>
                    </div>

                    {/* Content */}
                    <div className='px-8 py-12'>
                        {/* Features */}
                        <div className='grid grid-cols-1 md:grid-cols-3 gap-8 mb-12'>
                            <div className='text-center'>
                                <div className='w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <Clock className='w-8 h-8 text-blue-600' />
                                </div>
                                <h3 className='font-semibold text-gray-900 mb-2'>Quick & Efficient</h3>
                                <p className='text-gray-600 text-sm'>Complete in just 10-15 minutes</p>
                            </div>
                            <div className='text-center'>
                                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <Award className='w-8 h-8 text-green-600' />
                                </div>
                                <h3 className='font-semibold text-gray-900 mb-2'>AI-Powered Insights</h3>
                                <p className='text-gray-600 text-sm'>Get intelligent recommendations</p>
                            </div>
                            <div className='text-center'>
                                <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <User className='w-8 h-8 text-purple-600' />
                                </div>
                                <h3 className='font-semibold text-gray-900 mb-2'>Expert Review</h3>
                                <p className='text-gray-600 text-sm'>Optional professional feedback</p>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className='bg-gray-50 rounded-xl p-6 mb-8'>
                            <div className='flex items-start space-x-4'>
                                <div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0'>
                                    <span className='text-white font-semibold'>ML</span>
                                </div>
                                <div>
                                    <h3 className='font-semibold text-gray-900 mb-2'>About Dr. Maximilian Lude</h3>
                                    <p className='text-gray-600 text-sm leading-relaxed'>
                                        Leading expert in innovation management and future affairs with over 15 years of experience helping
                                        organizations navigate digital transformation and AI integration. Trusted advisor to Fortune 500 companies and
                                        startups alike.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Start Button */}
                        <div className='text-center'>
                            <button
                                onClick={handleStartSession}
                                className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
                            >
                                <Play className='w-5 h-5 mr-3' />
                                Start Your Session
                            </button>
                            <p className='text-sm text-gray-500 mt-4'>No signup required • Takes 10-15 minutes • Instant results</p>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className='text-center mt-8'>
                    <p className='text-sm text-gray-500'>Join {currentFlow.completions}+ professionals who have already completed this assessment</p>
                </div>
            </div>
        </div>
    );
}
