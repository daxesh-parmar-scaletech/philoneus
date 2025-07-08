import { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';
import { API_CONFIG } from 'shared/constants/api';
import HttpService from 'shared/services/http.service';

export type FlowData = Omit<Flow, 'id' | 'shareId' | 'completions' | 'starts' | 'reviewRequests' | 'submissionCounts'>;
export type QuestionTYpe = 'text' | 'multiple-choice' | 'single-choice' | 'rating' | 'number';

interface Question {
    id: string;
    text: string;
    type: QuestionTYpe;
    options?: string[];
    required: boolean;
}

interface CanvasSection {
    id: string;
    title: string;
    questions: string[];
    aiInstructions: string;
    feedbackRules: string;
    content?: string;
}

export interface Flow {
    id: string;
    title: string;
    description: string;
    canvasType: 'business-model' | 'swot' | 'lean' | 'custom';
    questions: Question[];
    canvasSections: CanvasSection[];
    isPublished: boolean;
    shareId: string;
    allowReviews: boolean;
    completions: number;
    starts: number;
    reviewRequests: number;
    submissionCounts: {
        completed: number;
        reviewed: number;
        started: number;
    };
}

interface UserSession {
    flowId: string;
    answers: Record<string, any>;
    canvasData: Record<string, string>;
}

interface FlowContextType {
    flows: Flow[];
    userSession: UserSession | null;
    loading: boolean;
    createFlow: (flow: Flow) => void;
    updateFlow: (id: string, updates: Partial<Flow>) => void;
    getFlowByShareId: (shareId: string) => Flow | null;
    startUserSession: (flowId: string) => void;
    updateUserAnswers: (answers: Record<string, any>) => void;
    updateCanvasSection: (sectionId: string, content: string) => void;
    fetchWorkshops: () => void;
    fetchWorkshopDetails: (id: string) => Promise<Flow | null>;
    detailLoading: boolean;
    currentFlow: Flow | null;
}

const FlowContext = createContext<FlowContextType | null>(null);

const mockFlows: Flow[] = [];

export function FlowProvider({ children }: { children: ReactNode }) {
    const [flows, setFlows] = useState<Flow[]>(mockFlows);
    console.log(' flows:', flows);
    const [userSession, setUserSession] = useState<UserSession | null>(null);
    const [loading, setLoading] = useState(false);
    const [detailLoading, setDetailLoading] = useState(false);
    const [currentFlow, setCurrentFlow] = useState<Flow | null>(null);

    const createFlow = useCallback(
        (flowData: Flow) => {
            setFlows((prev) => [...prev, { ...flowData }]);
        },
        [setFlows]
    );

    const updateFlow = useCallback(
        (id: string, updates: Partial<Flow>) => {
            setFlows((prev) => prev.map((flow) => (flow.id === id ? { ...flow, ...updates } : flow)));
        },
        [setFlows]
    );

    const getFlowByShareId = useCallback(
        (shareId: string) => {
            return flows.find((flow) => flow.shareId === shareId) || null;
        },
        [flows]
    );

    const startUserSession = useCallback((flowId: string) => {
        setUserSession({
            flowId,
            answers: {},
            canvasData: {},
        });
    }, []);

    const updateUserAnswers = useCallback((answers: Record<string, any>) => {
        setUserSession((prev) =>
            prev
                ? {
                      ...prev,
                      answers: { ...prev.answers, ...answers },
                  }
                : null
        );
    }, []);

    const updateCanvasSection = useCallback((sectionId: string, content: string) => {
        setUserSession((prev) =>
            prev
                ? {
                      ...prev,
                      canvasData: { ...prev.canvasData, [sectionId]: content },
                  }
                : null
        );
    }, []);

    const fetchWorkshops = useCallback(async () => {
        setLoading(true);
        try {
            const response = await HttpService.get(API_CONFIG.workshops);
            setFlows(response.data);
        } catch (error) {
            console.error('Failed to fetch workshops:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchWorkshopDetails = useCallback(async (id: string) => {
        setDetailLoading(true);
        try {
            const response = await HttpService.get(`${API_CONFIG.workshops}/${id}`);
            setCurrentFlow(response.data);
            return response.data;
        } catch (error) {
            console.error('Failed to fetch workshops:', error);
            return null;
        } finally {
            setDetailLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchWorkshops();
    }, [fetchWorkshops]);

    const contextValue = useMemo(
        () => ({
            flows,
            userSession,
            loading,
            detailLoading,
            currentFlow,
            fetchWorkshopDetails,
            createFlow,
            updateFlow,
            getFlowByShareId,
            startUserSession,
            updateUserAnswers,
            updateCanvasSection,
            fetchWorkshops,
        }),
        [
            flows,
            userSession,
            loading,
            detailLoading,
            currentFlow,
            fetchWorkshopDetails,
            createFlow,
            updateFlow,
            getFlowByShareId,
            startUserSession,
            updateUserAnswers,
            updateCanvasSection,
            fetchWorkshops,
        ]
    );

    return <FlowContext.Provider value={contextValue}>{children}</FlowContext.Provider>;
}

export function useFlow() {
    const context = useContext(FlowContext);
    if (!context) {
        throw new Error('useFlow must be used within a FlowProvider');
    }
    return context;
}
