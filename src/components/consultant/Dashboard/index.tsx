import { Link } from 'react-router-dom';
import { Plus, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

import Events from './events';
import ReviewRequests from './reviewRequests';
import Header from './header';

export default function Dashboard() {
    const { t } = useTranslation();

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
            {/* Header */}
            <Header />

            {/* Main Content */}
            <main className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {/* Create New Flow Section */}
                <div className='mb-12'>
                    <div className='bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-8 text-white relative overflow-hidden'>
                        <div className='absolute top-0 right-0 w-64 h-64 bg-white opacity-5 rounded-full -translate-y-32 translate-x-32'></div>
                        <div className='relative z-10'>
                            <h2 className='text-2xl font-bold mb-2'>{t('dashboard.createNewFlow')}</h2>
                            <p className='text-blue-100 mb-6'>{t('dashboard.createNewFlowDescription')}</p>
                            <Link
                                to='/consultant/flow/new'
                                className='inline-flex items-center px-6 py-3 bg-white text-blue-600 font-semibold rounded-xl hover:bg-blue-50 transition-all duration-200 transform hover:scale-105 shadow-lg'
                            >
                                <Plus className='w-5 h-5 mr-2' />
                                {t('dashboard.createNewFlowButton')}
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Quick Test User Flows */}
                <div className='mb-8'>
                    <h3 className='text-2xl font-bold text-gray-900 mb-6'>{t('dashboard.testUserExperience')}</h3>
                    <div className='bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-6'>
                        <div className='flex items-start space-x-3'>
                            <div className='w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5'>
                                <ExternalLink className='w-3 h-3 text-white' />
                            </div>
                            <div>
                                <h4 className='font-semibold text-yellow-800 mb-2'>{t('dashboard.quickAccessTitle')}</h4>
                                <p className='text-yellow-700 text-sm mb-4'>{t('dashboard.quickAccessDescription')}</p>
                                <div className='flex flex-wrap gap-3'>
                                    <Link
                                        to='/flow/ai-quick-scan'
                                        className='inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium'
                                    >
                                        <ExternalLink className='w-4 h-4 mr-2' />
                                        {t('dashboard.aiQuickScan')}
                                    </Link>
                                    <Link
                                        to='/flow/ai-integration'
                                        className='inline-flex items-center px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors text-sm font-medium'
                                    >
                                        <ExternalLink className='w-4 h-4 mr-2' />
                                        {t('dashboard.aiIntegration')}
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Active Flows */}
                <Events />

                {/* Review Requests */}
                <ReviewRequests />
            </main>
        </div>
    );
}
