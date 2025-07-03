import { useEffect, useState } from 'react';

interface TypingAnimationProps {
    className?: string;
}

const loadingMessages = ['Analyzing your request', 'Generating the output', 'Almost there', 'Finalizing the response'];

export function TypingAnimation({ className = '' }: TypingAnimationProps) {
    const [loadingMessageIndex, setLoadingMessageIndex] = useState(0);

    useEffect(() => {
        // Cycle through loading messages every 2 seconds
        const interval = setInterval(() => {
            setLoadingMessageIndex((prev) => (prev + 1) % loadingMessages.length);
        }, 5000);
        return () => clearInterval(interval); // Cleanup interval on unmount or when loading stops
    }, []);

    return (
        <p className={`${className} dark:text-gray-400`}>
            {loadingMessages[loadingMessageIndex]}
            <span className='typing-dots'>
                <span>.</span>
                <span>.</span>
                <span>.</span>
            </span>
        </p>
    );
}
