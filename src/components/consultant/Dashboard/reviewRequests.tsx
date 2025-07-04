import { MessageCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function ReviewRequests() {
    const { t } = useTranslation();

    return (
        <div>
            <h3 className='text-2xl font-bold text-gray-900 mb-6'>{t('dashboard.reviewRequests')}</h3>
            <div className='bg-white rounded-xl shadow-sm border border-gray-200'>
                <div className='p-6'>
                    <div className='flex items-center space-x-4 mb-4'>
                        <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center'>
                            <MessageCircle className='w-5 h-5 text-orange-600' />
                        </div>
                        <div className='flex-1'>
                            <h4 className='font-semibold text-gray-900'>{t('dashboard.newReviewRequest')}</h4>
                            <p className='text-sm text-gray-500'>AI Opportunity Quick Scan • 2 hours ago</p>
                        </div>
                        <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                            {t('dashboard.reviewCanvas')}
                        </button>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <div className='w-10 h-10 bg-green-100 rounded-full flex items-center justify-center'>
                            <MessageCircle className='w-5 h-5 text-green-600' />
                        </div>
                        <div className='flex-1'>
                            <h4 className='font-semibold text-gray-900'>{t('dashboard.reviewRequestFrom')}</h4>
                            <p className='text-sm text-gray-500'>Ambidextrous AI Integration • 1 day ago</p>
                        </div>
                        <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                            {t('dashboard.reviewCanvas')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
