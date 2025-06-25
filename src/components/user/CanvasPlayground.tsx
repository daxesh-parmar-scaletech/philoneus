import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Brain, Download, MessageCircle, Save, Sparkles } from 'lucide-react';
import { useFlow } from '../../contexts/FlowContext';

export default function CanvasPlayground() {
    const { shareId } = useParams();
    const navigate = useNavigate();
    const { getFlowByShareId, userSession, updateCanvasSection } = useFlow();
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSection, setSelectedSection] = useState<string | null>(null);
    const [aiSuggestion, setAiSuggestion] = useState<string>('');
    const [canvasData, setCanvasData] = useState<Record<string, string>>({});

    const flow = shareId ? getFlowByShareId(shareId) : null;

    useEffect(() => {
        // Simulate AI generation
        if (flow && userSession) {
            const timer = setTimeout(() => {
                // Pre-populate canvas with AI-generated content
                const mockCanvasData = generateMockCanvasData(flow.canvasType);
                console.log(' mockCanvasData:', flow.canvasType);
                setCanvasData(mockCanvasData);
                setIsLoading(false);
            }, 3000);

            return () => clearTimeout(timer);
        }
    }, [flow, userSession]);

    const generateMockCanvasData = (canvasType: string) => {
        if (canvasType === 'business-model') {
            return {
                'customer-segments': 'Small to medium enterprises (50-500 employees) looking to implement AI solutions for operational efficiency.',
                'value-propositions': 'AI-powered automation that reduces manual work by 70% while maintaining quality and compliance standards.',
                channels: 'Direct sales, partner network, online platform, and industry conferences.',
                'customer-relationships': 'Dedicated account management, self-service platform, and community support.',
                'revenue-streams': 'Monthly SaaS subscriptions, implementation services, and premium support packages.',
                'key-resources': 'AI technology stack, data scientists, customer success team, and strategic partnerships.',
                'key-activities': 'AI model development, customer onboarding, continuous optimization, and market education.',
                'key-partners': 'Cloud providers (AWS, Azure), system integrators, and industry consultants.',
                'cost-structure': 'R&D (40%), Sales & Marketing (30%), Operations (20%), General & Admin (10%)',
            };
        }
        return {};
    };

    const handleSectionEdit = (sectionId: string, content: string) => {
        setCanvasData((prev) => ({ ...prev, [sectionId]: content }));
        updateCanvasSection(sectionId, content);

        // Generate AI suggestion
        generateAISuggestion(sectionId, content);
    };

    const generateAISuggestion = (sectionId: string, content: string) => {
        const suggestions = {
            'customer-segments': 'Consider segmenting by industry vertical or company size for more targeted value propositions.',
            'value-propositions': 'Quantify your value with specific metrics. What exact outcomes can customers expect?',
            channels: 'Think about digital-first channels that can scale efficiently as you grow.',
            'revenue-streams': 'Consider usage-based pricing models that align costs with customer value realization.',
        };

        setAiSuggestion(
            suggestions[sectionId as keyof typeof suggestions] ||
                'Great start! Consider adding more specific details to make this section more compelling.'
        );
    };

    const handleDownload = () => {
        // Simulate PDF download
        const element = document.createElement('a');
        const file = new Blob(['Canvas data would be exported here'], { type: 'text/plain' });
        element.href = URL.createObjectURL(file);
        element.download = `${flow?.title || 'canvas'}.pdf`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    const handleRequestReview = () => {
        navigate(`/flow/${shareId}/complete`);
    };

    if (!flow || !userSession) {
        navigate(`/flow/${shareId}`);
        return null;
    }

    if (isLoading) {
        return (
            <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center'>
                <div className='text-center'>
                    <div className='w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse'>
                        <Brain className='w-8 h-8 text-white' />
                    </div>
                    <h2 className='text-2xl font-bold text-gray-900 mb-2'>AI is analyzing your insights...</h2>
                    <p className='text-gray-600 mb-4'>Generating your personalized canvas...</p>
                    <div className='flex items-center justify-center space-x-2'>
                        <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce' style={{ animationDelay: '0ms' }}></div>
                        <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce' style={{ animationDelay: '150ms' }}></div>
                        <div className='w-2 h-2 bg-blue-600 rounded-full animate-bounce' style={{ animationDelay: '300ms' }}></div>
                    </div>
                    <p className='text-sm text-gray-500 mt-4'>Powered by Dr. Maximilian Lude's expertise</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50'>
            {/* Header */}
            <div className='bg-white shadow-sm border-b border-gray-200'>
                <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4'>
                    <div className='flex items-center justify-between'>
                        <div className='flex items-center space-x-3'>
                            <div className='w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center'>
                                <Brain className='w-4 h-4 text-white' />
                            </div>
                            <h1 className='text-lg font-semibold text-gray-900'>{flow.title}</h1>
                        </div>
                        <div className='flex items-center space-x-3'>
                            <button
                                onClick={handleDownload}
                                className='px-4 py-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2'
                            >
                                <Download className='w-4 h-4' />
                                <span>Download</span>
                            </button>
                            <button
                                onClick={handleRequestReview}
                                className='px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2'
                            >
                                <MessageCircle className='w-4 h-4' />
                                <span>Request Review</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                    {/* Canvas */}
                    <div className='lg:col-span-3'>
                        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6'>
                            <div className='flex items-center justify-between mb-6'>
                                <h2 className='text-xl font-bold text-gray-900'>Your AI-Generated Canvas</h2>
                                <div className='flex items-center space-x-2 text-sm text-green-600'>
                                    <Sparkles className='w-4 h-4' />
                                    <span>AI Generated</span>
                                </div>
                            </div>

                            {/* Business Model Canvas Layout */}
                            {flow.canvasType === 'business-model' && (
                                <div className='grid grid-cols-3 gap-4 min-h-[600px]'>
                                    {/* Row 1 */}
                                    <CanvasSection
                                        id='key-partners'
                                        title='Key Partners'
                                        content={canvasData['key-partners']}
                                        isSelected={selectedSection === 'key-partners'}
                                        onSelect={setSelectedSection}
                                        onEdit={handleSectionEdit}
                                    />
                                    <CanvasSection
                                        id='key-activities'
                                        title='Key Activities'
                                        content={canvasData['key-activities']}
                                        isSelected={selectedSection === 'key-activities'}
                                        onSelect={setSelectedSection}
                                        onEdit={handleSectionEdit}
                                    />
                                    <CanvasSection
                                        id='value-propositions'
                                        title='Value Propositions'
                                        content={canvasData['value-propositions']}
                                        isSelected={selectedSection === 'value-propositions'}
                                        onSelect={setSelectedSection}
                                        onEdit={handleSectionEdit}
                                    />

                                    {/* Row 2 */}
                                    <CanvasSection
                                        id='key-resources'
                                        title='Key Resources'
                                        content={canvasData['key-resources']}
                                        isSelected={selectedSection === 'key-resources'}
                                        onSelect={setSelectedSection}
                                        onEdit={handleSectionEdit}
                                    />
                                    <div className='space-y-4'>
                                        <CanvasSection
                                            id='customer-relationships'
                                            title='Customer Relationships'
                                            content={canvasData['customer-relationships']}
                                            isSelected={selectedSection === 'customer-relationships'}
                                            onSelect={setSelectedSection}
                                            onEdit={handleSectionEdit}
                                            className='h-auto'
                                        />
                                        <CanvasSection
                                            id='channels'
                                            title='Channels'
                                            content={canvasData['channels']}
                                            isSelected={selectedSection === 'channels'}
                                            onSelect={setSelectedSection}
                                            onEdit={handleSectionEdit}
                                            className='h-auto'
                                        />
                                    </div>
                                    <CanvasSection
                                        id='customer-segments'
                                        title='Customer Segments'
                                        content={canvasData['customer-segments']}
                                        isSelected={selectedSection === 'customer-segments'}
                                        onSelect={setSelectedSection}
                                        onEdit={handleSectionEdit}
                                    />

                                    {/* Row 3 */}
                                    <CanvasSection
                                        id='cost-structure'
                                        title='Cost Structure'
                                        content={canvasData['cost-structure']}
                                        isSelected={selectedSection === 'cost-structure'}
                                        onSelect={setSelectedSection}
                                        onEdit={handleSectionEdit}
                                    />
                                    <div className='col-span-2'>
                                        <CanvasSection
                                            id='revenue-streams'
                                            title='Revenue Streams'
                                            content={canvasData['revenue-streams']}
                                            isSelected={selectedSection === 'revenue-streams'}
                                            onSelect={setSelectedSection}
                                            onEdit={handleSectionEdit}
                                            className='h-full'
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* AI Feedback Panel */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8'>
                            <div className='flex items-center space-x-2 mb-4'>
                                <Brain className='w-5 h-5 text-blue-600' />
                                <h3 className='font-semibold text-gray-900'>AI Assistant</h3>
                            </div>

                            {selectedSection ? (
                                <div className='space-y-4'>
                                    <div>
                                        <h4 className='font-medium text-gray-900 mb-2'>
                                            {selectedSection
                                                .split('-')
                                                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                                                .join(' ')}
                                        </h4>
                                        {aiSuggestion && (
                                            <div className='bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4'>
                                                <p className='text-sm text-blue-800'>{aiSuggestion}</p>
                                            </div>
                                        )}
                                    </div>

                                    <div>
                                        <label className='block text-sm font-medium text-gray-700 mb-2'>Ask AI for help</label>
                                        <textarea
                                            placeholder='Ask a specific question about this section...'
                                            rows={3}
                                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm'
                                        />
                                        <button className='mt-2 w-full px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm'>
                                            Get AI Help
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className='text-center py-6'>
                                    <Brain className='w-12 h-12 text-gray-300 mx-auto mb-3' />
                                    <p className='text-sm text-gray-500'>Click on any canvas section to get AI-powered suggestions and feedback.</p>
                                </div>
                            )}

                            <div className='mt-6 pt-6 border-t border-gray-200'>
                                <button
                                    onClick={() => setCanvasData({})}
                                    className='w-full px-3 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-sm flex items-center justify-center space-x-2'
                                >
                                    <Save className='w-4 h-4' />
                                    <span>Auto-saved</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

interface CanvasSectionProps {
    id: string;
    title: string;
    content: string;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onEdit: (id: string, content: string) => void;
    className?: string;
}

function CanvasSection({ id, title, content, isSelected, onSelect, onEdit, className = '' }: CanvasSectionProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [localContent, setLocalContent] = useState(content);

    const handleClick = () => {
        onSelect(id);
        setIsEditing(true);
    };

    const handleSave = () => {
        onEdit(id, localContent);
        setIsEditing(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Escape') {
            setIsEditing(false);
            setLocalContent(content);
        } else if (e.key === 'Enter' && e.metaKey) {
            handleSave();
        }
    };

    return (
        <div
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all min-h-[120px] ${
                isSelected ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
            } ${className}`}
            onClick={handleClick}
        >
            <h4 className='font-medium text-sm text-gray-900 mb-2'>{title}</h4>
            {isEditing ? (
                <textarea
                    value={localContent}
                    onChange={(e) => setLocalContent(e.target.value)}
                    onBlur={handleSave}
                    onKeyDown={handleKeyDown}
                    className='w-full h-20 text-xs text-gray-700 border-none resize-none focus:outline-none bg-transparent'
                    autoFocus
                />
            ) : (
                <p className='text-xs text-gray-700 leading-relaxed'>{content || 'Click to add content...'}</p>
            )}
        </div>
    );
}
