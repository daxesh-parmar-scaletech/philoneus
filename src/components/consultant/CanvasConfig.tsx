import React from 'react';
import { Settings, Lightbulb, MessageSquare } from 'lucide-react';

interface CanvasConfigProps {
  flowData: any;
  onFlowDataChange: (updates: any) => void;
}

export default function CanvasConfig({ flowData, onFlowDataChange }: CanvasConfigProps) {
  const getCanvasTemplate = () => {
    switch (flowData.canvasType) {
      case 'business-model':
        return {
          title: 'Business Model Canvas',
          sections: [
            { id: 'key-partners', title: 'Key Partners', description: 'Who are your key partners and suppliers?' },
            { id: 'key-activities', title: 'Key Activities', description: 'What key activities does your value proposition require?' },
            { id: 'key-resources', title: 'Key Resources', description: 'What key resources does your value proposition require?' },
            { id: 'value-propositions', title: 'Value Propositions', description: 'What value do you deliver to the customer?' },
            { id: 'customer-relationships', title: 'Customer Relationships', description: 'What type of relationship does each customer segment expect?' },
            { id: 'channels', title: 'Channels', description: 'Through which channels do your customer segments want to be reached?' },
            { id: 'customer-segments', title: 'Customer Segments', description: 'For whom are you creating value?' },
            { id: 'cost-structure', title: 'Cost Structure', description: 'What are the most important costs inherent in your business model?' },
            { id: 'revenue-streams', title: 'Revenue Streams', description: 'For what value are your customers really willing to pay?' }
          ]
        };
      case 'swot':
        return {
          title: 'SWOT Analysis',
          sections: [
            { id: 'strengths', title: 'Strengths', description: 'What advantages does your organization have?' },
            { id: 'weaknesses', title: 'Weaknesses', description: 'What could your organization improve?' },
            { id: 'opportunities', title: 'Opportunities', description: 'What opportunities can your organization pursue?' },
            { id: 'threats', title: 'Threats', description: 'What external factors could harm your organization?' }
          ]
        };
      case 'lean':
        return {
          title: 'Lean Canvas',
          sections: [
            { id: 'problem', title: 'Problem', description: 'What problems are you solving?' },
            { id: 'solution', title: 'Solution', description: 'How do you solve these problems?' },
            { id: 'key-metrics', title: 'Key Metrics', description: 'What are your key performance indicators?' },
            { id: 'unique-value-proposition', title: 'Unique Value Proposition', description: 'What makes you different and worth buying?' },
            { id: 'unfair-advantage', title: 'Unfair Advantage', description: 'What can\'t be easily copied or bought?' },
            { id: 'channels', title: 'Channels', description: 'How do you reach your customers?' },
            { id: 'customer-segments', title: 'Customer Segments', description: 'Who are your target customers?' },
            { id: 'cost-structure', title: 'Cost Structure', description: 'What are your main costs?' },
            { id: 'revenue-streams', title: 'Revenue Streams', description: 'How do you make money?' }
          ]
        };
      default:
        return { title: 'Custom Canvas', sections: [] };
    }
  };

  const canvasTemplate = getCanvasTemplate();
  const [selectedSection, setSelectedSection] = React.useState<string | null>(null);

  const handleSectionConfig = (sectionId: string, field: string, value: string) => {
    const canvasSections = flowData.canvasSections || [];
    const existingSection = canvasSections.find((s: any) => s.id === sectionId);
    
    if (existingSection) {
      const updatedSections = canvasSections.map((s: any) => 
        s.id === sectionId ? { ...s, [field]: value } : s
      );
      onFlowDataChange({ canvasSections: updatedSections });
    } else {
      const newSection = {
        id: sectionId,
        title: canvasTemplate.sections.find(s => s.id === sectionId)?.title || '',
        questions: [],
        aiInstructions: field === 'aiInstructions' ? value : '',
        feedbackRules: field === 'feedbackRules' ? value : ''
      };
      onFlowDataChange({ canvasSections: [...canvasSections, newSection] });
    }
  };

  const getSectionConfig = (sectionId: string, field: string) => {
    const section = flowData.canvasSections?.find((s: any) => s.id === sectionId);
    return section?.[field] || '';
  };

  return (
    <div className="p-8">
      <div className="max-w-6xl">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Configure Canvas</h2>
        <p className="text-gray-600 mb-8">Map your questions to canvas sections and configure AI instructions for each area.</p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Canvas Visualization */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">{canvasTemplate.title}</h3>
              
              {flowData.canvasType === 'business-model' && (
                <div className="grid grid-cols-3 gap-3 min-h-[400px]">
                  {/* Row 1 */}
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSection === 'key-partners' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSection('key-partners')}
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Key Partners</h4>
                    <p className="text-xs text-gray-500">Partners & suppliers</p>
                  </div>
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSection === 'key-activities' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSection('key-activities')}
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Key Activities</h4>
                    <p className="text-xs text-gray-500">Most important activities</p>
                  </div>
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSection === 'value-propositions' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSection('value-propositions')}
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Value Propositions</h4>
                    <p className="text-xs text-gray-500">Value you deliver</p>
                  </div>
                  
                  {/* Row 2 */}
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSection === 'key-resources' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSection('key-resources')}
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Key Resources</h4>
                    <p className="text-xs text-gray-500">Most important assets</p>
                  </div>
                  <div className="flex flex-col gap-3">
                    <div 
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all flex-1 ${
                        selectedSection === 'customer-relationships' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedSection('customer-relationships')}
                    >
                      <h4 className="font-medium text-xs text-gray-900 mb-1">Customer Relationships</h4>
                      <p className="text-xs text-gray-500">Relationship types</p>
                    </div>
                    <div 
                      className={`p-3 border-2 rounded-lg cursor-pointer transition-all flex-1 ${
                        selectedSection === 'channels' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedSection('channels')}
                    >
                      <h4 className="font-medium text-xs text-gray-900 mb-1">Channels</h4>
                      <p className="text-xs text-gray-500">How you reach customers</p>
                    </div>
                  </div>
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSection === 'customer-segments' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSection('customer-segments')}
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Customer Segments</h4>
                    <p className="text-xs text-gray-500">Target customers</p>
                  </div>
                  
                  {/* Row 3 */}
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSection === 'cost-structure' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSection('cost-structure')}
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Cost Structure</h4>
                    <p className="text-xs text-gray-500">Most important costs</p>
                  </div>
                  <div className="col-span-2">
                    <div 
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all h-full ${
                        selectedSection === 'revenue-streams' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedSection('revenue-streams')}
                    >
                      <h4 className="font-medium text-sm text-gray-900 mb-1">Revenue Streams</h4>
                      <p className="text-xs text-gray-500">How you make money</p>
                    </div>
                  </div>
                </div>
              )}

              {flowData.canvasType === 'swot' && (
                <div className="grid grid-cols-2 gap-4">
                  {canvasTemplate.sections.map((section) => (
                    <div
                      key={section.id}
                      className={`p-6 border-2 rounded-lg cursor-pointer transition-all min-h-[150px] ${
                        selectedSection === section.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                      }`}
                      onClick={() => setSelectedSection(section.id)}
                    >
                      <h4 className="font-semibold text-gray-900 mb-2">{section.title}</h4>
                      <p className="text-sm text-gray-600">{section.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {flowData.canvasType === 'lean' && (
                <div className="grid grid-cols-3 gap-3 min-h-[400px]">
                  {/* Lean Canvas Layout */}
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSection === 'problem' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSection('problem')}
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Problem</h4>
                    <p className="text-xs text-gray-500">Top 3 problems</p>
                  </div>
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSection === 'solution' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSection('solution')}
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Solution</h4>
                    <p className="text-xs text-gray-500">Top 3 features</p>
                  </div>
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedSection === 'unique-value-proposition' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setSelectedSection('unique-value-proposition')}
                  >
                    <h4 className="font-medium text-sm text-gray-900 mb-1">Unique Value Proposition</h4>
                    <p className="text-xs text-gray-500">Single, clear message</p>
                  </div>
                  {/* Add more lean canvas sections as needed */}
                </div>
              )}
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-8">
              {selectedSection ? (
                <div>
                  <div className="flex items-center space-x-2 mb-4">
                    <Settings className="w-5 h-5 text-blue-600" />
                    <h3 className="font-semibold text-gray-900">Configure Section</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">
                        {canvasTemplate.sections.find(s => s.id === selectedSection)?.title}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4">
                        {canvasTemplate.sections.find(s => s.id === selectedSection)?.description}
                      </p>
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <Lightbulb className="w-4 h-4 text-yellow-500" />
                        <span>AI Drafting Instructions</span>
                      </label>
                      <textarea
                        value={getSectionConfig(selectedSection, 'aiInstructions')}
                        onChange={(e) => handleSectionConfig(selectedSection, 'aiInstructions', e.target.value)}
                        placeholder="Provide specific instructions for how AI should draft content for this section..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>

                    <div>
                      <label className="flex items-center space-x-2 text-sm font-medium text-gray-700 mb-2">
                        <MessageSquare className="w-4 h-4 text-green-500" />
                        <span>AI Feedback Rules</span>
                      </label>
                      <textarea
                        value={getSectionConfig(selectedSection, 'feedbackRules')}
                        onChange={(e) => handleSectionConfig(selectedSection, 'feedbackRules', e.target.value)}
                        placeholder="Guidelines for AI feedback when users edit this section..."
                        rows={4}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-8">
                  <Settings className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                  <h3 className="font-medium text-gray-900 mb-2">Select a Canvas Section</h3>
                  <p className="text-sm text-gray-500">Click on any section in the canvas to configure its AI instructions and feedback rules.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}