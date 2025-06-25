import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, Brain, Save, Eye } from 'lucide-react';

import FlowSetup from './FlowSetup';
import QuestionBuilder from './QuestionBuilder';
import CanvasConfig from './CanvasConfig';
import SharePublish from './SharePublish';
import { useFlow, FlowData } from 'contexts/FlowContext';

export default function FlowBuilder() {
    const { id } = useParams();
    const { createFlow, updateFlow, flows } = useFlow();
    const [currentStep, setCurrentStep] = useState(1);
    const [flowData, setFlowData] = useState<FlowData>({
        title: '',
        description: '',
        canvasType: 'business-model',
        questions: [],
        canvasSections: [],
        isPublished: false,
        allowReviews: true,
    });
    const [successMsg, setSuccessMsg] = useState<string | null>(null);
    const navigate = useNavigate();
    // If editing, load the flow data
    useEffect(() => {
        if (id) {
            const existing = flows.find((f) => f.id === id);
            if (existing) {
                setFlowData({
                    title: existing.title,
                    description: existing.description,
                    canvasType: existing.canvasType,
                    questions: existing.questions,
                    canvasSections: existing.canvasSections,
                    isPublished: existing.isPublished,
                    allowReviews: existing.allowReviews,
                });
            }
        }
    }, [id, flows]);

    const steps = [
        { number: 1, title: 'Setup', component: FlowSetup },
        { number: 2, title: 'Questions', component: QuestionBuilder },
        { number: 3, title: 'Canvas', component: CanvasConfig },
        { number: 4, title: 'Share & Publish', component: SharePublish },
    ];

    const CurrentStepComponent = steps[currentStep - 1].component;

    const handleNext = () => {
        if (currentStep < steps.length) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handleBack = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleFlowDataChange = (updates: Partial<FlowData>) => {
        setFlowData((prev) => ({ ...prev, ...updates }));
    };

    const handleSave = () => {
        if (id) {
            updateFlow(id, flowData);
            setSuccessMsg('Event updated successfully!');
        } else {
            console.log('Creating new event with data:', flowData);

            createFlow(flowData);
            setSuccessMsg('Event created successfully!');
        }
        navigate('/consultant');
        setTimeout(() => setSuccessMsg(null), 2000);
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <header className='bg-white shadow-sm border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                    <div className='flex justify-between items-center h-16'>
                        <div className='flex items-center space-x-4'>
                            <Link to='/consultant' className='p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors'>
                                <ArrowLeft className='w-5 h-5' />
                            </Link>
                            <div className='flex items-center space-x-3'>
                                <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                                    <Brain className='w-4 h-4 text-white' />
                                </div>
                                <div>
                                    <h1 className='text-lg font-semibold text-gray-900'>
                                        {id ? 'Edit Event' : 'Create New Event'} - Step {currentStep}: {steps[currentStep - 1].title}
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <button
                                className='px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2'
                                onClick={handleSave}
                            >
                                <Save className='w-4 h-4' />
                                <span>{id ? 'Update Event' : 'Save Draft'}</span>
                            </button>
                            {currentStep === steps.length && (
                                <button className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2'>
                                    <Eye className='w-4 h-4' />
                                    <span>Preview</span>
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                {successMsg && (
                    <div className='mb-4 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg text-center font-semibold'>
                        {successMsg}
                    </div>
                )}
                <div className='flex gap-8'>
                    {/* Sidebar Navigation */}
                    <div className='w-64 flex-shrink-0'>
                        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-4'>
                            <h3 className='font-semibold text-gray-900 mb-4'>Event Builder Steps</h3>
                            <nav className='space-y-2'>
                                {steps.map((step) => (
                                    <button
                                        key={step.number}
                                        onClick={() => setCurrentStep(step.number)}
                                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                                            currentStep === step.number
                                                ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                : currentStep > step.number
                                                ? 'text-green-600 hover:bg-green-50'
                                                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                        }`}
                                    >
                                        <div
                                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-medium ${
                                                currentStep === step.number
                                                    ? 'bg-blue-600 text-white'
                                                    : currentStep > step.number
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-gray-200 text-gray-600'
                                            }`}
                                        >
                                            {step.number}
                                        </div>
                                        <span className='font-medium'>{step.title}</span>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className='flex-1'>
                        <div className='bg-white rounded-xl shadow-sm border border-gray-200 min-h-[600px]'>
                            <CurrentStepComponent flowData={flowData} onFlowDataChange={handleFlowDataChange} />
                        </div>

                        {/* Navigation */}
                        <div className='flex justify-between items-center mt-6'>
                            <button
                                onClick={handleBack}
                                disabled={currentStep === 1}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                                    currentStep === 1
                                        ? 'text-gray-400 cursor-not-allowed'
                                        : 'text-gray-600 hover:text-gray-800 border border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <ArrowLeft className='w-4 h-4' />
                                <span>Back</span>
                            </button>

                            <div className='flex items-center space-x-2'>
                                {steps.map((step) => (
                                    <div
                                        key={step.number}
                                        className={`w-2 h-2 rounded-full transition-colors ${
                                            currentStep >= step.number ? 'bg-blue-600' : 'bg-gray-300'
                                        }`}
                                    />
                                ))}
                            </div>

                            <button
                                onClick={handleNext}
                                disabled={currentStep === steps.length}
                                className={`px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                                    currentStep === steps.length ? 'text-gray-400 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'
                                }`}
                            >
                                <span>Next</span>
                                <ArrowRight className='w-4 h-4' />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
