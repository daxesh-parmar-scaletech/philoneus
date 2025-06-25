import React, { useState } from 'react';
import { Plus, GripVertical, Copy, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { QuestionTYpe } from 'contexts/FlowContext';

interface Question {
    id: string;
    text: string;
    type: QuestionTYpe;
    options?: string[];
    required: boolean;
    expanded?: boolean;
}

interface QuestionBuilderProps {
    flowData: any;
    onFlowDataChange: (updates: any) => void;
}

export default function QuestionBuilder({ flowData, onFlowDataChange }: QuestionBuilderProps) {
    const [questions, setQuestions] = useState<Question[]>(flowData.questions || []);

    const questionTypes = [
        { value: 'text', label: 'Text Input' },
        { value: 'multiple-choice', label: 'Multiple Choice' },
        { value: 'single-select', label: 'Single Select' },
        { value: 'rating', label: 'Rating Scale' },
        { value: 'number', label: 'Number' },
    ];

    const addQuestion = () => {
        const newQuestion: Question = {
            id: `q${questions.length + 1}`,
            text: '',
            type: 'text',
            required: true,
            expanded: true,
        };
        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        onFlowDataChange({ questions: updatedQuestions });
    };

    const updateQuestion = (id: string, updates: Partial<Question>) => {
        const updatedQuestions = questions.map((q) => (q.id === id ? { ...q, ...updates } : q));
        setQuestions(updatedQuestions);
        onFlowDataChange({ questions: updatedQuestions });
    };

    const deleteQuestion = (id: string) => {
        const updatedQuestions = questions.filter((q) => q.id !== id);
        setQuestions(updatedQuestions);
        onFlowDataChange({ questions: updatedQuestions });
    };

    const duplicateQuestion = (question: Question) => {
        const newQuestion = {
            ...question,
            id: `q${Date.now()}`,
            text: `${question.text} (Copy)`,
            expanded: true,
        };
        const updatedQuestions = [...questions, newQuestion];
        setQuestions(updatedQuestions);
        onFlowDataChange({ questions: updatedQuestions });
    };

    const toggleExpanded = (id: string) => {
        setQuestions(questions.map((q) => (q.id === id ? { ...q, expanded: !q.expanded } : q)));
    };

    const addOption = (questionId: string) => {
        const question = questions.find((q) => q.id === questionId);
        if (question && (question.type === 'multiple-choice' || question.type === 'single-select')) {
            const newOptions = [...(question.options || []), ''];
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const updateOption = (questionId: string, optionIndex: number, value: string) => {
        const question = questions.find((q) => q.id === questionId);
        if (question && question.options) {
            const newOptions = [...question.options];
            newOptions[optionIndex] = value;
            updateQuestion(questionId, { options: newOptions });
        }
    };

    const removeOption = (questionId: string, optionIndex: number) => {
        const question = questions.find((q) => q.id === questionId);
        if (question && question.options) {
            const newOptions = question.options.filter((_, index) => index !== optionIndex);
            updateQuestion(questionId, { options: newOptions });
        }
    };

    return (
        <div className='p-8'>
            <div className='max-w-4xl'>
                <div className='flex items-center justify-between mb-8'>
                    <div>
                        <h2 className='text-2xl font-bold text-gray-900 mb-2'>Define Questions</h2>
                        <p className='text-gray-600'>Create the questions that will guide your users through the canvas building process.</p>
                    </div>
                    <button
                        onClick={addQuestion}
                        className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2'
                    >
                        <Plus className='w-4 h-4' />
                        <span>Add Question</span>
                    </button>
                </div>

                {questions.length === 0 ? (
                    <div className='text-center py-12'>
                        <div className='w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4'>
                            <Plus className='w-8 h-8 text-gray-400' />
                        </div>
                        <h3 className='text-lg font-medium text-gray-900 mb-2'>No questions yet</h3>
                        <p className='text-gray-500 mb-4'>Start building your flow by adding your first question.</p>
                        <button onClick={addQuestion} className='px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                            Add Your First Question
                        </button>
                    </div>
                ) : (
                    <div className='space-y-4'>
                        {questions.map((question, index) => (
                            <div key={question.id} className='bg-white border border-gray-200 rounded-lg'>
                                <div className='flex items-center justify-between p-4 border-b border-gray-100'>
                                    <div className='flex items-center space-x-3'>
                                        <GripVertical className='w-5 h-5 text-gray-400 cursor-grab' />
                                        <span className='text-sm font-medium text-gray-500'>Question {index + 1}</span>
                                        <button onClick={() => toggleExpanded(question.id)} className='p-1 text-gray-400 hover:text-gray-600'>
                                            {question.expanded ? <ChevronDown className='w-4 h-4' /> : <ChevronRight className='w-4 h-4' />}
                                        </button>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <button
                                            onClick={() => duplicateQuestion(question)}
                                            className='p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors'
                                        >
                                            <Copy className='w-4 h-4' />
                                        </button>
                                        <button
                                            onClick={() => deleteQuestion(question.id)}
                                            className='p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors'
                                        >
                                            <Trash2 className='w-4 h-4' />
                                        </button>
                                    </div>
                                </div>

                                {question.expanded && (
                                    <div className='p-6 space-y-4'>
                                        <div>
                                            <label className='block text-sm font-medium text-gray-700 mb-2'>Question Text *</label>
                                            <input
                                                type='text'
                                                value={question.text}
                                                onChange={(e) => updateQuestion(question.id, { text: e.target.value })}
                                                placeholder='Enter your question...'
                                                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                            />
                                        </div>

                                        <div className='grid grid-cols-2 gap-4'>
                                            <div>
                                                <label className='block text-sm font-medium text-gray-700 mb-2'>Question Type</label>
                                                <select
                                                    value={question.type}
                                                    onChange={(e) => updateQuestion(question.id, { type: e.target.value as any })}
                                                    className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                >
                                                    {questionTypes.map((type) => (
                                                        <option key={type.value} value={type.value}>
                                                            {type.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div className='flex items-end'>
                                                <label className='flex items-center space-x-2'>
                                                    <input
                                                        type='checkbox'
                                                        checked={question.required}
                                                        onChange={(e) => updateQuestion(question.id, { required: e.target.checked })}
                                                        className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                                                    />
                                                    <span className='text-sm font-medium text-gray-700'>Required</span>
                                                </label>
                                            </div>
                                        </div>

                                        {(question.type === 'multiple-choice' || question.type === 'single-select') && (
                                            <div>
                                                <div className='flex items-center justify-between mb-3'>
                                                    <label className='block text-sm font-medium text-gray-700'>Options</label>
                                                    <button
                                                        onClick={() => addOption(question.id)}
                                                        className='text-sm text-blue-600 hover:text-blue-700 font-medium'
                                                    >
                                                        + Add Option
                                                    </button>
                                                </div>
                                                <div className='space-y-2'>
                                                    {(question.options || []).map((option, optionIndex) => (
                                                        <div key={optionIndex} className='flex items-center space-x-2'>
                                                            <input
                                                                type='text'
                                                                value={option}
                                                                onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                                                                placeholder={`Option ${optionIndex + 1}`}
                                                                className='flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                                            />
                                                            <button
                                                                onClick={() => removeOption(question.id, optionIndex)}
                                                                className='p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors'
                                                            >
                                                                <Trash2 className='w-4 h-4' />
                                                            </button>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
