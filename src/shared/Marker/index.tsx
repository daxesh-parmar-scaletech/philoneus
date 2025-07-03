import ReactMarkdown from 'react-markdown';

const MarkdownList = ({ content, className }: { content: string[]; className?: string }) => {
    return (
        <div className={`h-full text-gray-600 markdown text-sm list-disc list-inside scroll-on-hover space-y-2 mr-[-5px] ${className || ''}`}>
            <ReactMarkdown>{content.join('\n')}</ReactMarkdown>
            {/* {content.map((point, index) => {
                return (
                    // <li className='break-words' key={index}>
                    <ReactMarkdown key={index}>{point}</ReactMarkdown>
                    // </li>
                );
            })} */}
        </div>
    );
};

export default MarkdownList;
