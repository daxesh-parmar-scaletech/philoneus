import { useState, useEffect, Dispatch, SetStateAction, useMemo, useCallback } from 'react';
import { MessageCircle, Send, Bot, Sparkles } from 'lucide-react';

import HttpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
import RefMsg from './components/refMsg';
import MarkdownList from 'shared/Marker';
import { TypingAnimation } from 'shared/components/TypingAnimation';
import { SuggestionData, useSuggestionContext } from 'contexts/useSuggestion';

interface AIAssistantProps {
    setIsOpen: Dispatch<SetStateAction<boolean>>;
    isOpen: boolean;
}

interface ChatMessage {
    sender?: 'user' | 'server';
    content: string | { [key: string]: string[] } | SuggestionData;
    type?: 'text' | 'suggestion' | 'ref';
}

export function AIAssistant({ setIsOpen, isOpen }: AIAssistantProps) {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState<ChatMessage[]>([
        {
            sender: 'server',
            content: `Based on your answers, we've generated your personalized Business Model Canvas. Feel free to ask if you'd like help refining it or exploring any part further!`,
            type: 'text',
        },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [typingMessage, setTypingMessage] = useState(''); // For server message animation
    const [isTyping, setIsTyping] = useState(false); // Typing status
    const { setSuggestionData, refData, setRefData } = useSuggestionContext();

    const isRefData = useMemo(() => refData && typeof refData === 'object' && 'title' in refData && 'items' in refData, [refData]);

    useEffect(() => {
        if (isRefData && !isOpen) {
            setIsOpen(true);
        }
    }, [isOpen, isRefData, setIsOpen]);

    useEffect(() => {
        // Scroll to the bottom of the chat when new messages are added
        const chatContainer = document.getElementById('chat-container');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, [chatHistory, isOpen, typingMessage]);

    useEffect(() => {
        if (chatHistory.length === 0) return;

        const lastMessage = chatHistory[chatHistory.length - 1];

        if (lastMessage.sender === 'server' && typeof lastMessage.content === 'string') {
            setTypingMessage('');
            setIsTyping(true);

            let charIndex = -1;
            const interval = setInterval(() => {
                charIndex++;
                if (charIndex < lastMessage.content.length) {
                    setTypingMessage((prev) => prev + lastMessage.content[charIndex]);
                } else {
                    clearInterval(interval);
                    setIsTyping(false);
                }
            }, 15); // Adjust speed if needed

            return () => clearInterval(interval);
        }
    }, [chatHistory]);

    const handleSendMessage = async () => {
        if (!message.trim() || isLoading) return;
        if (isRefData) {
            pushMessage({ sender: 'user', content: { title: refData.title, items: [...refData.items], msg: message }, type: 'ref' });
            setRefData({} as SuggestionData);
        } else {
            // Add user's message to chat history
            pushMessage({ sender: 'user', content: message });
        }
        setMessage('');
        setIsLoading(true);

        try {
            const sectionId = refData.title;
            const response = await HttpService.post(`${API_CONFIG.chat}/0686d465-142a-4341-be99-ab6f3ffafa35`, {
                question: message,
                sectionId: sectionId || '',
            });
            const data = response.data;
            // Handle the response based on its structure
            if (data.message) {
                // If the response has a `message` field (string)
                pushMessage({ content: data.message });
            } else {
                // Check if any key in the response contains an array of strings
                const arrayKey = Object.keys(data).find((key) => Array.isArray(data[key]));
                if (arrayKey) {
                    const content = {
                        title: arrayKey,
                        items: (data[arrayKey] || []).map((line: string) => (line.trim().startsWith('-') ? line : `- ${line.trim()}`)),
                    };
                    pushMessage({ content, type: 'suggestion' });
                } else {
                    // Fallback for unexpected response structure
                    pushMessage({ content: 'Unexpected response format.' });
                }
            }
        } catch (error) {
            console.error('Error sending message:', error);
            pushMessage({ content: 'An error occurred. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    const pushMessage = useCallback(({ sender = 'server', type = 'text', content }: ChatMessage) => {
        setChatHistory((prev) => [...prev, { sender, type, content }]);
    }, []);

    const renderMessageContent = (msg: ChatMessage, index: number) => {
        if (msg.sender === 'server' && isTyping && index === chatHistory.length - 1) {
            return <pre className='text-sm whitespace-pre-wrap break-words'>{typingMessage}</pre>;
        }
        if (msg.type === 'text') {
            return <pre className='text-sm whitespace-pre-wrap break-words'>{msg.content as string}</pre>;
        } else if (msg.type === 'suggestion') {
            const { title, items } = msg.content as SuggestionData;
            return (
                <div>
                    <div className='flex items-center justify-between mb-1'>
                        <h4 className={`font-bold text-blue-600 capitalize`}>{title}:</h4>
                        <button
                            onClick={() => {
                                setSuggestionData({ title: title, items: items });
                                pushMessage({ sender: 'server', content: 'Suggestion applied successfully!!' });
                            }}
                            className='flex ml-2 px-2 py-1 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded transition-colors'
                        >
                            <Sparkles size={18} className='mr-1' /> Apply
                        </button>
                    </div>
                    <MarkdownList content={items} />
                    {/* <ul className='list-disc list-inside text-sm'>
                        {items.map((item: string, idx: number) => (
                            <li key={idx}>{item}</li>
                        ))}
                    </ul> */}
                </div>
            );
        } else if (msg.type === 'ref') {
            const { title, items, msg: message } = msg.content as SuggestionData;
            return (
                <>
                    <div className='bg-blue-500 p-3'>
                        <div className='flex items-center justify-between'>
                            <h4 className={`font-bold text-white capitalize`}>{title}:</h4>
                        </div>
                        <MarkdownList className='text-white' content={items} />

                        {/* <ul className='list-disc list-inside text-xs'>
                            {items.map((item: string, idx: number) => (
                                <li key={idx}>{item}</li>
                            ))}
                        </ul> */}
                    </div>
                    <div>{message}</div>
                </>
            );
        } else {
            return <p className='text-sm'>Unexpected response format.</p>;
        }
    };

    return (
        <div
            // onMouseEnter={(e) => {
            //     const target = e.target as HTMLElement;
            //     if (
            //         target.closest('button') || // ignore if hovering a button
            //         isOpen
            //     )
            //         return;
            //     setIsOpen(true);
            // }}
            // onMouseLeave={() => {
            //     if (!isOpen) return;
            //     setIsOpen(false);
            // }}
            className={`fixed z-40 right-0 top-0 h-full bg-white shadow-lg transition-all duration-300 ${
                isOpen ? 'w-[350px] 2xl:w-[450px]' : 'w-12'
            }`}
        >
            <button
                onClick={() => {
                    setRefData({} as SuggestionData);
                    setIsOpen(!isOpen);
                }}
                className='absolute left-0 bottom-0 transform -translate-y-1/2 -translate-x-full bg-gradient-to-r from-blue-500 to-purple-600 p-2 rounded-l-lg shadow-lg'
            >
                <Bot className={`transform transition-transform text-white`} />
            </button>

            {isOpen && (
                <div className='h-full flex flex-col shadow-2xl'>
                    <div className='p-5 border-b  shadow-xl text-white bg-blue-500'>
                        <div className='flex items-center '>
                            <MessageCircle className='text-white w-5 h-5' />
                            <h3 className='ml-2 font-semibold '>Strategy Expert (AI-Powered)</h3>
                        </div>
                    </div>

                    <div id='chat-container' className='flex-1 p-4 overflow-auto [&::-webkit-scrollbar]:hidden bg-blue-50'>
                        {chatHistory.map((msg, index) => (
                            <div key={index} className={`mb-4 flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.sender === 'server' && (
                                    <div className='w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-2'>
                                        <Bot size={16} />
                                    </div>
                                )}
                                <div
                                    className={`inline-block p-3 rounded-lg max-w-[75%] shadow-md ${
                                        msg.sender === 'user' ? 'bg-blue-600 text-white' : 'bg-white text-gray-700'
                                    }`}
                                >
                                    {renderMessageContent(msg, index)}
                                </div>
                            </div>
                        ))}
                        {isLoading && (
                            <div className='mb-4 flex justify-start'>
                                <div className='w-8 h-8 flex items-center justify-center bg-blue-500 text-white rounded-full mr-2'>
                                    <Bot size={16} />
                                </div>
                                <div className='inline-block p-3 rounded-lg bg-white text-gray-700 shadow-md'>
                                    <TypingAnimation className='text-sm text-gray-700' />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Reference message Bar */}
                    {isRefData && <RefMsg />}

                    <div className='p-4 border-t bg-blue-200'>
                        <div className='flex items-center'>
                            <input
                                type='text'
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter') handleSendMessage();
                                }}
                                placeholder='Type your message...'
                                className='flex-1 px-3 py-2 border text-sm border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500'
                                disabled={isLoading}
                            />
                            <button
                                onClick={handleSendMessage}
                                className='px-4 py-[13px] bg-blue-600 text-white rounded-r-md hover:bg-blue-700 disabled:bg-blue-300'
                                disabled={isLoading}
                            >
                                <Send size={18} />
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
