import { createContext, useContext, useState, ReactNode, useCallback, useMemo, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { API_CONFIG } from 'shared/constants/api';
import HttpService from 'shared/services/http.service';

export type FlowData = Omit<Flow, 'id' | 'shareId' | 'completions' | 'starts' | 'reviewRequests'>;
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
}

interface UserSession {
    flowId: string;
    answers: Record<string, any>;
    canvasData: Record<string, string>;
}

interface FlowContextType {
    userSession: UserSession | null;
    startUserSession: (flowId: string) => void;
    updateUserAnswers: (answers: Record<string, any>) => void;
    updateCanvasSection: (sectionId: string, content: string) => void;
    fetchWorkshopDetails: (id: string) => Promise<Flow | null>;
    detailLoading: boolean;
    currentFlow: Flow | null;
    role: string | undefined;
    setCanvasData: React.Dispatch<React.SetStateAction<CanvasDataType[]>>;
    canvasData: CanvasDataType[];
}

interface CanvasDataType {
    sectionId: string;
    content: string[];
}

const UserFlowContext = createContext<FlowContextType | null>(null);

export function UserFlowProvider({ children }: { children: ReactNode }) {
    const { shareId, userId } = useParams();

    const [userSession, setUserSession] = useState<UserSession | null>(null);
    const [detailLoading, setDetailLoading] = useState(true);
    const [currentFlow, setCurrentFlow] = useState<Flow | null>(null);
    const [canvasData, setCanvasData] = useState<CanvasDataType[]>([] as CanvasDataType[]);

    const isConsultant = userId === 'consultant';

    const startUserSession = useCallback(
        (flowId: string) => {
            setUserSession({
                flowId,
                answers: {},
                canvasData: {},
            });
        },
        [setUserSession]
    );

    const updateUserAnswers = useCallback(
        (answers: Record<string, any>) => {
            setUserSession((prev) =>
                prev
                    ? {
                          ...prev,
                          answers: { ...prev.answers, ...answers },
                      }
                    : null
            );
        },
        [setUserSession]
    );

    const updateCanvasSection = useCallback(
        (sectionId: string, content: string) => {
            setUserSession((prev) =>
                prev
                    ? {
                          ...prev,
                          canvasData: { ...prev.canvasData, [sectionId]: content },
                      }
                    : null
            );
        },
        [setUserSession]
    );

    const fetchWorkshopDetails = useCallback(
        async (id: string) => {
            setDetailLoading(true);
            try {
                const response = await HttpService.get(`${isConsultant ? API_CONFIG.workshops : API_CONFIG.userWorkshops}/${id}`);
                setCurrentFlow(response.data);
                return response.data;
            } catch (error) {
                console.error('Failed to fetch workshops:', error);
                return null;
            } finally {
                setDetailLoading(false);
            }
        },
        [setDetailLoading, setCurrentFlow, isConsultant]
    );

    useEffect(() => {
        if (shareId) {
            fetchWorkshopDetails(shareId);
        }
    }, [shareId, fetchWorkshopDetails]);

    const contextValue = useMemo(
        () => ({
            userSession,
            detailLoading,
            currentFlow,
            role: userId,
            fetchWorkshopDetails,
            startUserSession,
            updateUserAnswers,
            updateCanvasSection,
            canvasData,
            setCanvasData,
        }),
        [
            userSession,
            detailLoading,
            currentFlow,
            userId,
            canvasData,
            fetchWorkshopDetails,
            startUserSession,
            updateUserAnswers,
            updateCanvasSection,
            setCanvasData,
        ]
    );

    return <UserFlowContext.Provider value={contextValue}>{children}</UserFlowContext.Provider>;
}

export function useUserFlow() {
    const context = useContext(UserFlowContext);
    if (!context) {
        throw new Error('useFlow must be used within a FlowProvider');
    }
    return context;
}
