import { X } from 'lucide-react';
import { SuggestionData, useSuggestionContext } from 'contexts/useSuggestion';
import MarkdownList from 'shared/Marker';

export default function RefMsg() {
    const { refData, setRefData } = useSuggestionContext();

    return (
        <div className='animate-fade-in-up bg-blue-100 border-t border-blue-300 p-3'>
            <div className='flex justify-between items-center mb-2'>
                <div className='flex-1'>
                    <h4 className='font-bold text-primary mb-1'>Referencing to:</h4>
                    <div className='flex items-center justify-between'>
                        <h4 className='font-bold text-blue-600 capitalize'>{refData.title}:</h4>
                    </div>
                    <MarkdownList content={refData.items} />
                    {/* <ul className='list-disc list-inside text-sm mt-1 pl-1'>
                        {refData.items.map((item: string, idx: number) => (
                            <li key={idx} className='py-0.5'>
                                {item}
                            </li>
                        ))}
                    </ul> */}
                </div>
                <button
                    onClick={() => setRefData({} as SuggestionData)}
                    className='text-blue-500 hover:text-blue-700 transition-colors'
                    aria-label='Dismiss'
                >
                    <X size={16} />
                </button>
            </div>
        </div>
    );
}
