import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const changeLanguage = (lng: string) => {
        i18n.changeLanguage(lng);
    };

    const currentLang = i18n.language;
    const isGerman = currentLang.startsWith('de');

    return (
        <div className='relative inline-block text-left'>
            <button
                className='flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors'
                onClick={() => {
                    const newLang = isGerman ? 'en' : 'de';
                    changeLanguage(newLang);
                }}
                title={isGerman ? 'Switch to English' : 'Zu Deutsch wechseln'}
            >
                <Globe className='w-4 h-4' />
                <span>{isGerman ? 'DE' : 'EN'}</span>
            </button>
        </div>
    );
}
