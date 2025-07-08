import { useNavigate } from 'react-router-dom';
import { Play, User, Award, Clock } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { useUserFlow } from 'contexts/userFlowContext';
import HttpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';

export default function UserLanding() {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { currentFlow, startUserSession, detailLoading, role, isConsultant } = useUserFlow();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    if (detailLoading) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>{t('common.loading')}</h1>
                    <p className='text-gray-600'>{t('user.loadingFlowDetails')}</p>
                </div>
            </div>
        );
    }

    if (!currentFlow) {
        return (
            <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
                <div className='text-center'>
                    <h1 className='text-2xl font-bold text-gray-900 mb-2'>{t('flow.flowNotFound')}</h1>
                    <p className='text-gray-600'>{t('flow.flowNotFoundDescription')}</p>
                </div>
            </div>
        );
    }

    const handleStartSession = async () => {
        if (isConsultant) {
            startUserSession(currentFlow.id);
            navigate(`/${role}/${currentFlow.id}/questions`);
        }
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError(t('Email is required and must be valid'));
            return;
        }
        try {
            const response = await HttpService.post(`${role === 'consultant' ? API_CONFIG.workshops : API_CONFIG.userSubmissions}`, {
                workshopEventId: currentFlow.id,
                email: email,
            });
            if (response) {
                startUserSession(currentFlow.id);
                navigate(`/${role}/${currentFlow.id}/questions`);
            }
        } catch (error) {
            console.error('Failed to fetch workshop details:', error);
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50'>
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                {/* Consultant Branding */}
                <div className='text-center mb-12'>
                    <div className='w-20 h-20 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4'>
                        <span className='text-2xl font-bold text-white'>ML</span>
                    </div>
                    <div className='text-sm text-gray-600 mb-2'>{t('user.consultantTitle')}</div>
                    <h1 className='text-2xl font-bold text-gray-900'>{t('user.consultantName')}</h1>
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
                                <h3 className='font-semibold text-gray-900 mb-2'>{t('user.quickEfficient')}</h3>
                                <p className='text-gray-600 text-sm'>{t('user.quickEfficientDescription')}</p>
                            </div>
                            <div className='text-center'>
                                <div className='w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <Award className='w-8 h-8 text-green-600' />
                                </div>
                                <h3 className='font-semibold text-gray-900 mb-2'>{t('user.aiPoweredInsights')}</h3>
                                <p className='text-gray-600 text-sm'>{t('user.aiPoweredInsightsDescription')}</p>
                            </div>
                            <div className='text-center'>
                                <div className='w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                                    <User className='w-8 h-8 text-purple-600' />
                                </div>
                                <h3 className='font-semibold text-gray-900 mb-2'>{t('user.expertReview')}</h3>
                                <p className='text-gray-600 text-sm'>{t('user.expertReviewDescription')}</p>
                            </div>
                        </div>

                        {/* Bio Section */}
                        <div className='bg-gray-50 rounded-xl p-6 mb-8'>
                            <div className='flex items-start space-x-4'>
                                <div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0'>
                                    <span className='text-white font-semibold'>ML</span>
                                </div>
                                <div>
                                    <h3 className='font-semibold text-gray-900 mb-2'>{t('user.aboutConsultant')}</h3>
                                    <p className='text-gray-600 text-sm leading-relaxed'>{t('user.consultantBio')}</p>
                                </div>
                            </div>
                        </div>

                        {/* Email Input */}
                        {!isConsultant && (
                            <div className='text-center mb-4'>
                                <input
                                    type='email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder={t('Enter your email to start the session')}
                                    className='w-full max-w-md px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600'
                                />
                                {error && <p className='text-red-500 text-sm mt-1'>{error}</p>}
                            </div>
                        )}

                        {/* Start Button */}
                        <div className='text-center'>
                            <button
                                onClick={handleStartSession}
                                className='inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl'
                            >
                                <Play className='w-5 h-5 mr-3' />
                                {t('user.startSession')}
                            </button>
                            <p className='text-sm text-gray-500 mt-4'>{t('user.sessionInfo')}</p>
                        </div>
                    </div>
                </div>

                {/* Trust Indicators */}
                <div className='text-center mt-8'>
                    <p className='text-sm text-gray-500'>{t('user.trustIndicator', { count: currentFlow.completions })}</p>
                </div>
            </div>
        </div>
    );
}
