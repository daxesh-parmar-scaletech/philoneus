import { Grid3X3, TrendingUp, Target, Layers } from 'lucide-react';

interface FlowSetupProps {
    flowData: any;
    onFlowDataChange: (updates: any) => void;
}

export default function FlowSetup({ flowData, onFlowDataChange }: FlowSetupProps) {
    const canvasTypes = [
        {
            id: 'business-model',
            name: 'Business Model Canvas',
            description: 'Comprehensive business model visualization with 9 key building blocks',
            icon: Grid3X3,
            popular: true,
        },
        {
            id: 'swot',
            name: 'SWOT Analysis',
            description: 'Strategic planning framework analyzing Strengths, Weaknesses, Opportunities, and Threats',
            icon: TrendingUp,
            popular: false,
        },
        {
            id: 'lean',
            name: 'Lean Canvas',
            description: 'Streamlined business model focused on key assumptions and customer validation',
            icon: Target,
            popular: true,
        },
        {
            id: 'custom',
            name: 'Custom Canvas',
            description: 'Create your own canvas structure tailored to specific needs',
            icon: Layers,
            popular: false,
        },
    ];

    const handleInputChange = (field: string, value: string) => {
        onFlowDataChange({ [field]: value });
    };

    const handleCanvasTypeSelect = (canvasType: string) => {
        onFlowDataChange({ canvasType });
    };

    return (
        <div className='p-8'>
            <div className='max-w-4xl'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>Flow Setup</h2>
                <p className='text-gray-600 mb-8'>Define the basic information and canvas type for your AI-powered Flow.</p>

                <div className='space-y-8'>
                    {/* Flow Information */}
                    <div className='space-y-6'>
                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Flow Title *</label>
                            <input
                                type='text'
                                value={flowData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder='e.g., AI Opportunity Quick Scan'
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                            />
                        </div>

                        <div>
                            <label className='block text-sm font-medium text-gray-700 mb-2'>Short Description *</label>
                            <textarea
                                value={flowData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder='Provide a brief description of what this flow helps users achieve...'
                                rows={3}
                                className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors'
                            />
                        </div>
                    </div>

                    {/* Canvas Type Selection */}
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Select Base Canvas</h3>
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                            {canvasTypes.map((canvas) => (
                                <div
                                    key={canvas.id}
                                    onClick={() => handleCanvasTypeSelect(canvas.id)}
                                    className={`relative p-6 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
                                        flowData.canvasType === canvas.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                                    }`}
                                >
                                    {canvas.popular && (
                                        <div className='absolute -top-2 -right-2 bg-gradient-to-r from-orange-400 to-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full'>
                                            Popular
                                        </div>
                                    )}
                                    <div className='flex items-start space-x-4'>
                                        <div
                                            className={`p-3 rounded-lg ${
                                                flowData.canvasType === canvas.id ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'
                                            }`}
                                        >
                                            <canvas.icon className='w-6 h-6' />
                                        </div>
                                        <div className='flex-1'>
                                            <h4 className='font-semibold text-gray-900 mb-1'>{canvas.name}</h4>
                                            <p className='text-sm text-gray-600'>{canvas.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Consultant Branding Preview */}
                    <div>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Consultant Branding Preview</h3>
                        <div className='bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl p-6'>
                            <div className='bg-white rounded-lg p-6 shadow-sm'>
                                <div className='flex items-center space-x-4 mb-4'>
                                    <div className='w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center'>
                                        <span className='text-white font-semibold'>ML</span>
                                    </div>
                                    <div>
                                        <h4 className='font-semibold text-gray-900'>Dr. Maximilian Lude</h4>
                                        <p className='text-sm text-gray-600'>Innovation & Future Affairs Expert</p>
                                    </div>
                                </div>
                                <h3 className='text-xl font-bold text-gray-900 mb-2'>{flowData.title || 'Your Flow Title'}</h3>
                                <p className='text-gray-600'>{flowData.description || 'Your flow description will appear here...'}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
