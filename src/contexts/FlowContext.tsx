import React, { createContext, useContext, useState, ReactNode } from 'react';

interface Question {
  id: string;
  text: string;
  type: 'text' | 'multiple-choice' | 'single-select' | 'rating' | 'number';
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

interface Flow {
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
  flows: Flow[];
  currentFlow: Flow | null;
  userSession: UserSession | null;
  createFlow: (flow: Omit<Flow, 'id' | 'shareId' | 'completions' | 'starts' | 'reviewRequests'>) => void;
  updateFlow: (id: string, updates: Partial<Flow>) => void;
  getFlowByShareId: (shareId: string) => Flow | null;
  startUserSession: (flowId: string) => void;
  updateUserAnswers: (answers: Record<string, any>) => void;
  updateCanvasSection: (sectionId: string, content: string) => void;
}

const FlowContext = createContext<FlowContextType | null>(null);

const mockFlows: Flow[] = [
  {
    id: '1',
    title: 'AI Opportunity Quick Scan',
    description: 'Identify and prioritize AI applications for your business in just 10 minutes.',
    canvasType: 'business-model',
    questions: [
      {
        id: 'q1',
        text: 'What are your top 3 most repetitive tasks in your business?',
        type: 'text',
        required: true
      },
      {
        id: 'q2',
        text: 'Which customer segments do you serve?',
        type: 'multiple-choice',
        options: ['B2B Enterprise', 'B2B SME', 'B2C Mass Market', 'B2C Niche'],
        required: true
      },
      {
        id: 'q3',
        text: 'What is your current annual revenue range?',
        type: 'single-select',
        options: ['<$1M', '$1M-$10M', '$10M-$100M', '>$100M'],
        required: false
      }
    ],
    canvasSections: [],
    isPublished: true,
    shareId: 'ai-quick-scan',
    allowReviews: true,
    completions: 120,
    starts: 150,
    reviewRequests: 15
  },
  {
    id: '2',
    title: 'Ambidextrous AI Integration',
    description: 'Strategic framework for balancing innovation and operational efficiency through AI.',
    canvasType: 'swot',
    questions: [],
    canvasSections: [],
    isPublished: true,
    shareId: 'ai-integration',
    allowReviews: true,
    completions: 85,
    starts: 95,
    reviewRequests: 8
  }
];

export function FlowProvider({ children }: { children: ReactNode }) {
  const [flows, setFlows] = useState<Flow[]>(mockFlows);
  const [currentFlow, setCurrentFlow] = useState<Flow | null>(null);
  const [userSession, setUserSession] = useState<UserSession | null>(null);

  const createFlow = (flowData: Omit<Flow, 'id' | 'shareId' | 'completions' | 'starts' | 'reviewRequests'>) => {
    const newFlow: Flow = {
      ...flowData,
      id: Math.random().toString(36).substr(2, 9),
      shareId: flowData.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      completions: 0,
      starts: 0,
      reviewRequests: 0
    };
    setFlows(prev => [...prev, newFlow]);
    setCurrentFlow(newFlow);
  };

  const updateFlow = (id: string, updates: Partial<Flow>) => {
    setFlows(prev => prev.map(flow => 
      flow.id === id ? { ...flow, ...updates } : flow
    ));
    if (currentFlow?.id === id) {
      setCurrentFlow(prev => prev ? { ...prev, ...updates } : null);
    }
  };

  const getFlowByShareId = (shareId: string) => {
    return flows.find(flow => flow.shareId === shareId) || null;
  };

  const startUserSession = (flowId: string) => {
    setUserSession({
      flowId,
      answers: {},
      canvasData: {}
    });
  };

  const updateUserAnswers = (answers: Record<string, any>) => {
    setUserSession(prev => prev ? {
      ...prev,
      answers: { ...prev.answers, ...answers }
    } : null);
  };

  const updateCanvasSection = (sectionId: string, content: string) => {
    setUserSession(prev => prev ? {
      ...prev,
      canvasData: { ...prev.canvasData, [sectionId]: content }
    } : null);
  };

  return (
    <FlowContext.Provider value={{
      flows,
      currentFlow,
      userSession,
      createFlow,
      updateFlow,
      getFlowByShareId,
      startUserSession,
      updateUserAnswers,
      updateCanvasSection
    }}>
      {children}
    </FlowContext.Provider>
  );
}

export function useFlow() {
  const context = useContext(FlowContext);
  if (!context) {
    throw new Error('useFlow must be used within a FlowProvider');
  }
  return context;
}