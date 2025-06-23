import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Brain } from 'lucide-react';
import { useFlow } from '../../contexts/FlowContext';

export default function QuestionFlow() {
    const { shareId } = useParams();
    const navigate = useNavigate();
    const { getFlowByShareId, updateUserAnswers } = useFlow();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});

    const flow = shareId ? getFlowByShareId(shareId) : null;

    if (!flow) {
        navigate(`/flow/${shareId}`);
        return null;
    }

    const questions = flow.questions || [];
    const question = questions[currentQuestion];
    const isLastQuestion = currentQuestion === questions.length - 1;
    const canProceed = !question?.required || answers[question.id];

    const handleAnswerChange = (questionId: string, value: any) => {
        setAnswers((prev) => ({ ...prev, [questionId]: value }));
    };

    const handleNext = () => {
        if (isLastQuestion) {
            updateUserAnswers(answers);
            navigate(`/flow/${shareId}/canvas`);
        } else {
            setCurrentQuestion(currentQuestion + 1);
        }
    };

    const handleBack = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        } else {
            navigate(`/flow/${shareId}`);
        }
    };

    const renderQuestionInput = () => {
        if (!question) return null;

        switch (question.type) {
            case 'text':
                return (
                    <textarea
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder='Type your answer here...'
                        rows={4}
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none'
                    />
                );

            case 'multiple-choice':
                return (
                    <div className='space-y-3'>
                        {question.options?.map((option, index) => (
                            <label
                                key={index}
                                className='flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer'
                            >
                                <input
                                    type='checkbox'
                                    checked={(answers[question.id] || []).includes(option)}
                                    onChange={(e) => {
                                        const currentAnswers = answers[question.id] || [];
                                        const newAnswers = e.target.checked
                                            ? [...currentAnswers, option]
                                            : currentAnswers.filter((a: string) => a !== option);
                                        handleAnswerChange(question.id, newAnswers);
                                    }}
                                    className='w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500'
                                />
                                <span className='text-gray-900'>{option}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'single-select':
                return (
                    <div className='space-y-3'>
                        {question.options?.map((option, index) => (
                            <label
                                key={index}
                                className='flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer'
                            >
                                <input
                                    type='radio'
                                    name={question.id}
                                    value={option}
                                    checked={answers[question.id] === option}
                                    onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                                    className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                                />
                                <span className='text-gray-900'>{option}</span>
                            </label>
                        ))}
                    </div>
                );

            case 'rating':
                return (
                    <div className='flex items-center justify-center space-x-4'>
                        {[1, 2, 3, 4, 5].map((rating) => (
                            <button
                                key={rating}
                                onClick={() => handleAnswerChange(question.id, rating)}
                                className={`w-12 h-12 rounded-full font-semibold transition-all ${
                                    answers[question.id] === rating ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                                }`}
                            >
                                {rating}
                            </button>
                        ))}
                    </div>
                );

            case 'number':
                return (
                    <input
                        type='number'
                        value={answers[question.id] || ''}
                        onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                        placeholder='Enter a number...'
                        className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                    />
                );

            default:
                return null;
        }
    };

    return (
        <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50'>
            {/* Header */}
            <div className='bg-white shadow-sm border-b border-gray-200'>
                <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                                <Brain className='w-4 h-4 text-white' />
                            </div>
                            <h1 className='text-lg font-semibold text-gray-900'>{flow.title}</h1>
                        </div>
                        <div className='text-sm text-gray-500'>
                            Question {currentQuestion + 1} of {questions.length}
                        </div>
                    </div>
                </div>
            </div>

            {/* Progress Bar */}
            <div className='bg-white border-b border-gray-200'>
                <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='h-2 bg-gray-200 rounded-full'>
                        <div
                            className='h-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full transition-all duration-300'
                            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                        />
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='bg-white rounded-2xl shadow-xl border border-gray-200 p-8'>
                    {question && (
                        <>
                            <div className='text-center mb-8'>
                                <h2 className='text-2xl font-bold text-gray-900 mb-4'>{question.text}</h2>
                                {question.required && <p className='text-sm text-gray-500'>* This question is required</p>}
                            </div>

                            <div className='max-w-2xl mx-auto mb-8'>{renderQuestionInput()}</div>

                            {/* Navigation */}
                            <div className='flex items-center justify-between max-w-2xl mx-auto'>
                                <button
                                    onClick={handleBack}
                                    className='px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2'
                                >
                                    <ArrowLeft className='w-4 h-4' />
                                    <span>Back</span>
                                </button>

                                <div className='flex space-x-2'>
                                    {questions.map((_, index) => (
                                        <div
                                            key={index}
                                            className={`w-2 h-2 rounded-full transition-colors ${
                                                index <= currentQuestion ? 'bg-blue-600' : 'bg-gray-300'
                                            }`}
                                        />
                                    ))}
                                </div>

                                <button
                                    onClick={handleNext}
                                    disabled={!canProceed}
                                    className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                                        canProceed ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    <span>{isLastQuestion ? 'Generate Canvas' : 'Next'}</span>
                                    {!isLastQuestion && <ArrowRight className='w-4 h-4' />}
                                    {isLastQuestion && <Brain className='w-4 h-4' />}
                                </button>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
