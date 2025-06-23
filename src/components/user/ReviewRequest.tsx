import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { CheckCircle, MessageCircle, Download, Globe, User } from 'lucide-react';
import { useFlow } from '../../contexts/FlowContext';

export default function ReviewRequest() {
  const { shareId } = useParams();
  const { getFlowByShareId } = useFlow();
  const [message, setMessage] = useState('');
  const [reviewRequested, setReviewRequested] = useState(false);

  const flow = shareId ? getFlowByShareId(shareId) : null;

  if (!flow) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Flow not found</h1>
          <p className="text-gray-600">The flow you're looking for doesn't exist.</p>
        </div>
      </div>
    );
  }

  const handleRequestReview = () => {
    // Simulate review request
    setReviewRequested(true);
  };

  const handleDownload = () => {
    // Simulate PDF download
    const element = document.createElement('a');
    const file = new Blob(['Canvas data would be exported here'], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${flow.title}.pdf`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Completion Celebration */}
        <div className="text-center mb-12">
          <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Canvas Complete!</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Congratulations! You've successfully created your AI-powered business canvas.
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 to-green-600 px-8 py-6 text-white">
            <h2 className="text-2xl font-bold mb-2">What's Next?</h2>
            <p className="text-green-100">Choose how you'd like to proceed with your completed canvas.</p>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Download Section */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Download Your Canvas</h3>
                  <button
                    onClick={handleDownload}
                    className="w-full px-6 py-4 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    <Download className="w-5 h-5" />
                    <span className="font-semibold">Download PDF Canvas</span>
                  </button>
                  <p className="text-sm text-gray-500 mt-2 text-center">
                    Get a professional PDF version of your completed canvas
                  </p>
                </div>

                {/* Additional Actions */}
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center space-x-2">
                    <Globe className="w-4 h-4" />
                    <span>Visit Dr. Lude's Website</span>
                  </button>
                  <button className="w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Share Your Success
                  </button>
                </div>
              </div>

              {/* Review Request Section */}
              <div className="space-y-6">
                {flow.allowReviews && !reviewRequested && (
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Get Expert Feedback</h3>
                    <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-1">Dr. Maximilian Lude</h4>
                          <p className="text-sm text-gray-600">
                            Want personalized insights from an innovation expert? Request a professional review of your canvas.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Add a personal message (optional)
                          </label>
                          <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tell Dr. Lude about your specific challenges or questions..."
                            rows={3}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                          />
                        </div>

                        <button
                          onClick={handleRequestReview}
                          className="w-full px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 transition-all font-semibold flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                        >
                          <MessageCircle className="w-5 h-5" />
                          <span>Request Expert Review</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {reviewRequested && (
                  <div className="bg-green-50 rounded-xl p-6 border border-green-200">
                    <div className="flex items-center space-x-3 mb-4">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <h4 className="font-semibold text-green-900">Review Request Sent!</h4>
                    </div>
                    <p className="text-sm text-green-800 mb-4">
                      Dr. Maximilian Lude has been notified of your review request. You can expect to hear back within 2-3 business days.
                    </p>
                    <div className="bg-white rounded-lg p-4 border border-green-200">
                      <p className="text-sm text-gray-600">
                        <strong>What happens next?</strong><br />
                        • Dr. Lude will review your canvas and insights<br />
                        • You'll receive personalized feedback via email<br />
                        • Optional follow-up consultation available
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Thank You Message */}
            <div className="mt-12 text-center p-6 bg-gray-50 rounded-xl">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Thank You!</h3>
              <p className="text-gray-600">
                Thank you for using Delta X. We hope this AI-powered canvas helps drive your business forward.
              </p>
              <p className="text-sm text-gray-500 mt-2">
                Created with ❤️ by Dr. Maximilian Lude and the Delta X team
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}