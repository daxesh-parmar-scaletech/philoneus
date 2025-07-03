import { useState } from 'react';

interface CanvasSectionProps {
    title: string;
    content: string;
    onEdit: (content: string) => void;
    icon: React.ReactNode;
}

export function CanvasSection({ title, content, onEdit, icon }: CanvasSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(content);

    const handleSave = () => {
        onEdit(editedContent);
        setIsEditing(false);
    };

    return (
        <div className='bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow h-48 flex flex-col justify-between'>
            <div className='flex items-center space-x-3 mb-4'>
                {icon}
                <h3 className='text-lg font-semibold text-gray-800'>{title}</h3>
            </div>
            {isEditing ? (
                <textarea
                    value={editedContent}
                    onChange={(e) => setEditedContent(e.target.value)}
                    className='w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex-grow'
                    rows={3}
                />
            ) : (
                <p className='text-gray-600 flex-grow'>{content}</p>
            )}
            <button
                onClick={isEditing ? handleSave : () => setIsEditing(true)}
                className='mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'
            >
                {isEditing ? 'Save' : 'Edit'}
            </button>
        </div>
    );
}
