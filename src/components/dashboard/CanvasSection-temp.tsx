import React, { useEffect, useRef, useState } from 'react';
import { Edit2, SparklesIcon } from 'lucide-react';
import Tooltip from 'shared/tooltip';
import MarkdownList from 'shared/Marker';
import { useSuggestionContext } from 'contexts/useSuggestion';

interface CanvasSectionProps {
    title: string;
    content: string[] | never[];
    icon: React.ReactNode;
    className?: string;
    onEdit: (newContent: string[]) => void;
    isLongHeight?: boolean;
    highlight?: boolean;
}

export function CanvasSection({ className = '', icon, title, content, onEdit, isLongHeight = false, highlight }: CanvasSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editContent, setEditContent] = useState(content.join('\n'));
    const { setRefData } = useSuggestionContext();
    const textAreaRef = useRef<HTMLTextAreaElement>(null);
    useEffect(() => {
        setEditContent(content.join('\n'));
    }, [content]);
    // const handleSave = () => {
    //     onEdit(editContent);
    //     setIsEditing(false);
    // };
    const handleSave = () => {
        // Convert the string back to an array of bullet points
        const updatedContent = editContent.split('\n').filter((line) => line.trim() !== '');
        onEdit(updatedContent); // Pass the updated content back to the parent
        setIsEditing(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setEditContent(e.target.value);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const isCtrlOrCmd = isMac ? e.metaKey : e.ctrlKey;

        if (e.key === 'Enter') {
            e.preventDefault();
            const textarea = e.target as HTMLTextAreaElement;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;
            const before = editContent.substring(0, start);
            const after = editContent.substring(end);
            const newValue = `${before}\n- ${after}`;
            setEditContent(newValue);
            requestAnimationFrame(() => {
                if (textAreaRef.current) {
                    textAreaRef.current.selectionStart = textAreaRef.current.selectionEnd = start + 3;
                }
            });
        }

        // Bold (Ctrl + B or Cmd + B)
        if (isCtrlOrCmd && e.key.toLowerCase() === 'b') {
            e.preventDefault();
            const textarea = e.target as HTMLTextAreaElement;
            const start = textarea.selectionStart;
            const end = textarea.selectionEnd;

            const selectedText = editContent.slice(start, end);
            const before = editContent.slice(0, start);
            const after = editContent.slice(end);

            // Toggle bold if already bold
            const isBolded = selectedText.startsWith('**') && selectedText.endsWith('**');
            const newText = isBolded
                ? selectedText.slice(2, -2) // remove bold
                : `**${selectedText || 'bold text'}**`; // add bold

            setEditContent(before + newText + after);

            requestAnimationFrame(() => {
                const newPos = start + (isBolded ? 0 : 2);
                const newEnd = newPos + (selectedText || 'bold text').length;
                if (textAreaRef.current) {
                    textAreaRef.current.selectionStart = newPos;
                    textAreaRef.current.selectionEnd = newEnd;
                }
            });
        }
    };

    const onCancel = () => {
        setEditContent(content.join('\n'));
        setIsEditing(!isEditing);
    };

    const onRef = () => {
        setRefData({ title: title, items: content });
    };

    return (
        <div
            className={`bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 h-full border border-gray-100  ${
                highlight ? 'animate-magic z-10' : ''
            } ${className}`}
        >
            <div className='flex justify-between items-center mb-2'>
                <div className='flex items-center space-x-2'>
                    <div className='rounded-lg'>{icon}</div>
                    <h3 className='text-[15px] font-semibold text-gray-800'>{title}</h3>
                </div>
                <div className='flex'>
                    <Tooltip content='Get more insights from AI'>
                        <button onClick={onRef} className='p-2 rounded-full text-blue-600 transition-colors duration-200 relative group'>
                            <SparklesIcon
                                size={17}
                                className='text-blue-400 transition-transform duration-500 group-hover:scale-150 group-hover:rotate-12'
                            />
                        </button>
                    </Tooltip>
                    <button
                        onClick={onCancel}
                        className={`p-2 rounded-full hover:bg-gray-100 hover:text-blue-600 transition-colors duration-200 ${
                            isEditing ? 'text-blue-600' : 'text-gray-500'
                        }`}
                    >
                        <Edit2 size={12} />
                    </button>
                </div>
            </div>
            <div className={`${isLongHeight ? 'h-[450px]' : 'h-[185px]'}`}>
                {isEditing ? (
                    <>
                        <textarea
                            ref={textAreaRef}
                            value={editContent}
                            onChange={handleChange}
                            onKeyDown={handleKeyDown}
                            // value={editContent
                            //     .split('\n')
                            //     .map((line) => (line.trim() ? `${line}` : ''))
                            //     .join('\n')}
                            // onChange={handleChange}
                            className='w-full h-[calc(100%-40px)] text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-2 leading-6 whitespace-pre-wrap resize-none'
                            placeholder='Enter each bullet point on a new line...'
                        />
                        <button
                            onClick={handleSave}
                            className='px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200'
                        >
                            Save
                        </button>
                        <button
                            onClick={onCancel}
                            className='px-4 py-2 ml-2 bg-red-400 text-white rounded-lg text-sm hover:bg-red-500 transition-colors duration-200'
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <MarkdownList content={content} />
                    // <div className='markdown text-sm h-full text-gray-600 list-disc list-inside space-y-2 scroll-on-hover'>
                    //     {content.map((point, index) => {
                    //         return (
                    //             // <li className='break-words' key={index}>
                    //             <ReactMarkdown key={index}>{point}</ReactMarkdown>
                    //             // </li>
                    //         );
                    //     })}
                    // </div>
                )}
            </div>
        </div>
    );
}

// {isEditing ? (
//     <>
//         <textarea
//             value={editContent}
//             onChange={handleChange}
//             className='w-full h-[calc(100%-40px)] text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 p-3 leading-6 font-mono resize-none'
//             placeholder='Write using markdown. Use **bold**, *italic*, - for bullets.'
//         />
//         <div className='mt-2 flex space-x-2'>
//             <button
//                 onClick={handleSave}
//                 className='px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors duration-200'
//             >
//                 Save
//             </button>
//             <button
//                 onClick={onCancel}
//                 className='px-4 py-2 bg-gray-300 text-white rounded-lg text-sm hover:bg-gray-400 transition-colors duration-200'
//             >
//                 Cancel
//             </button>
//         </div>
//     </>
// ) : (
//     <div className='prose prose-sm max-w-none text-gray-700 h-full overflow-y-auto scroll-on-hover'>
//         <ReactMarkdown>{content.join('\n')}</ReactMarkdown>
//     </div>
// )}
