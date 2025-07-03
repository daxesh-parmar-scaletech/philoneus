import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Brain, Download, MessageCircle } from 'lucide-react';
import { useUserFlow } from 'contexts/userFlowContext';
import { AIAssistant } from 'components/AIAssistant';
import SuggestionStore from 'contexts/useSuggestion';
import { Dashboard } from 'components/dashboard/Dashbaord';
import HttpService from 'shared/services/http.service';
import { API_CONFIG } from 'shared/constants/api';
type RawAnswers = {
    [questionId: string]: string | string[];
};
export default function CanvasPlayground() {
    const { shareId } = useParams();
    const navigate = useNavigate();
    const { currentFlow, detailLoading, userSession, role, setCanvasData } = useUserFlow();
    console.log(' currentFlow:', userSession?.answers);
    const [isLoading, setIsLoading] = useState(true);
    const [isOpen, setIsOpen] = useState(true);

    const flow = currentFlow;

    const transformAnswers = (input: RawAnswers) => {
        return {
            questionAnswers: Object.entries(input).map(([questionId, answer]) => ({
                questionId,
                answer: Array.isArray(answer) ? answer : [answer],
            })),
        };
    };

    const generateCanvas = useCallback(async () => {
        if (flow && userSession) {
            const result = transformAnswers(userSession.answers);
            console.log(result);
            try {
                const res = await HttpService.post(API_CONFIG.generateCanvas, { workshopEventId: userSession.flowId, ...result });
                setCanvasData(res.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error generating canvas:', error);
                setIsLoading(false);
            }
        }
    }, [flow, userSession, setCanvasData]);

    useEffect(() => {
        generateCanvas();
    }, [generateCanvas]);

    // const generateMockCanvasData = (canvasType: string) => {
    //     if (canvasType === 'business-model') {
    //         return {
    //             'customer-segments': 'Small to medium enterprises (50-500 employees) looking to implement AI solutions for operational efficiency.',
    //             'value-propositions': 'AI-powered automation that reduces manual work by 70% while maintaining quality and compliance standards.',
    //             channels: 'Direct sales, partner network, online platform, and industry conferences.',
    //             'customer-relationships': 'Dedicated account management, self-service platform, and community support.',
    //             'revenue-streams': 'Monthly SaaS subscriptions, implementation services, and premium support packages.',
    //             'key-resources': 'AI technology stack, data scientists, customer success team, and strategic partnerships.',
    //             'key-activities': 'AI model development, customer onboarding, continuous optimization, and market education.',
    //             'key-partners': 'Cloud providers (AWS, Azure), system integrators, and industry consultants.',
    //             'cost-structure': 'R&D (40%), Sales & Marketing (30%), Operations (20%), General & Admin (10%)',
    //         };
    //     }
    //     return {};
    // };

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
        navigate(`/${role}/${shareId}/complete`);
    };

    if ((!flow && !detailLoading) || !userSession) {
        navigate(`/${role}/${shareId}`);
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
        <SuggestionStore>
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

                {/* Main Content Area */}
                <div className='flex flex-1 pt-16'>
                    {/* Side Navigation */}
                    {/* <Navbar /> */}

                    {/* Main Content */}
                    <main className='w-full overflow-auto bg-gray-50 transition-all duration-300'>
                        {/* Canvas Content */}
                        {/* h-[calc(100vh-64px)] min-h-[800px] overflow-auto min-w-[1200px] mx-auto max-w-[1900px] pr-[calc(var(--ai-width,0px)+2rem)] */}
                        <div
                            className={`max-w-[1900px] h-full transition-all duration-300 ${
                                isOpen ? 'w-[calc(100%-350px)] 2xl:w-[calc(100%-450px)]' : 'w-[calc(100%-50px)]'
                            }`}
                        >
                            <Dashboard />
                        </div>
                    </main>
                </div>

                {/* AI Assistant */}
                <AIAssistant setIsOpen={setIsOpen} isOpen={isOpen} />
            </div>
        </SuggestionStore>
    );
}
