import { TypingAnimation } from 'shared/components/TypingAnimation';

export function Spinner({ isTypingAnimation = false }: { isTypingAnimation?: boolean }) {
    return (
        <div className='flex flex-col items-center justify-center w-full h-full px-4 text-center'>
            {isTypingAnimation && (
                <p className='text-base text-gray-700 dark:text-gray-200 max-w-md mb-6 animate-fade-in'>
                    Thanks for sharing! Based on your responses, we'll now generate your personalized Business Model Canvas.
                </p>
            )}
            <div className='relative flex items-center justify-center w-16 h-16'>
                {/* Outer Glowing Ring - Faster Spin */}
                <div className='absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 border-b-purple-500 animate-spin shadow-xl blur-sm'></div>

                {/* Inner Core - Pulsing */}
                <div className='w-7 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-pulse'></div>
            </div>
            {isTypingAnimation && <TypingAnimation className='mx-auto text-center text-lg mt-7' />}
        </div>
    );
}
