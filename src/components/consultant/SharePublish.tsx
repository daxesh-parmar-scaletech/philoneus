// import React, { useState } from 'react';
// import { Link2, QrCode, Code, Eye, Globe, Download } from 'lucide-react';

interface SharePublishProps {
    flowData: any;
    onFlowDataChange: (updates: any) => void;
}

export default function SharePublish({ flowData, onFlowDataChange }: SharePublishProps) {
    // const [showQR, setShowQR] = useState(false);
    // const [showEmbed, setShowEmbed] = useState(false);

    // const shareUrl = `${window.location.origin}/flow/${flowData.title?.toLowerCase().replace(/[^a-z0-9]/g, '-') || 'untitled-flow'}`;
    // const embedCode = `<iframe src="${shareUrl}" width="100%" height="600" frameborder="0"></iframe>`;

    // const copyToClipboard = (text: string) => {
    //     navigator.clipboard.writeText(text);
    //     // You could add a toast notification here
    // };

    const handlePublishToggle = () => {
        onFlowDataChange({ isPublished: !flowData.isPublished });
    };

    const handleReviewToggle = () => {
        onFlowDataChange({ allowReviews: !flowData.allowReviews });
    };

    return (
        <div className='p-8'>
            <div className='max-w-4xl'>
                <h2 className='text-2xl font-bold text-gray-900 mb-2'>Share & Publish</h2>
                <p className='text-gray-600 mb-8'>Configure sharing options and publish your flow to make it available to users.</p>

                <div className='space-y-8'>
                    {/* Publish Status */}
                    <div className='bg-white border border-gray-200 rounded-xl p-6'>
                        <div className='flex items-center justify-between mb-4'>
                            <h3 className='text-lg font-semibold text-gray-900'>Flow Status</h3>
                            <div className='flex items-center space-x-3'>
                                <span className={`text-sm font-medium ${flowData.isPublished ? 'text-green-600' : 'text-gray-500'}`}>
                                    {flowData.isPublished ? 'Published' : 'Draft'}
                                </span>
                                <button
                                    onClick={handlePublishToggle}
                                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                        flowData.isPublished ? 'bg-green-500' : 'bg-gray-300'
                                    }`}
                                >
                                    <span
                                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                            flowData.isPublished ? 'translate-x-6' : 'translate-x-1'
                                        }`}
                                    />
                                </button>
                            </div>
                        </div>
                        <p className='text-sm text-gray-600'>
                            {flowData.isPublished
                                ? 'Your flow is live and accessible to users via the sharing options below.'
                                : 'Your flow is currently in draft mode. Enable publishing to make it accessible to users.'}
                        </p>
                    </div>

                    {/* Share Options */}
                    {/* {flowData.isPublished && (
                        <div className='bg-white border border-gray-200 rounded-xl p-6'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-6'>Share Options</h3>

                            <div className='space-y-6'>
                                <div>
                                    <div className='flex items-center space-x-2 mb-3'>
                                        <Link2 className='w-5 h-5 text-blue-600' />
                                        <h4 className='font-medium text-gray-900'>Shareable Link</h4>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <div className='flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm text-gray-700'>
                                            {shareUrl}
                                        </div>
                                        <button
                                            onClick={() => copyToClipboard(shareUrl)}
                                            className='px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'
                                        >
                                            Copy
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <div className='flex items-center justify-between mb-3'>
                                        <div className='flex items-center space-x-2'>
                                            <QrCode className='w-5 h-5 text-green-600' />
                                            <h4 className='font-medium text-gray-900'>QR Code</h4>
                                        </div>
                                        <button onClick={() => setShowQR(!showQR)} className='text-sm text-blue-600 hover:text-blue-700 font-medium'>
                                            {showQR ? 'Hide' : 'Show'} QR Code
                                        </button>
                                    </div>
                                    {showQR && (
                                        <div className='flex items-center justify-between p-4 bg-gray-50 rounded-lg'>
                                            <div className='w-32 h-32 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center'>
                                                <QrCode className='w-16 h-16 text-gray-400' />
                                                <span className='sr-only'>QR Code placeholder</span>
                                            </div>
                                            <div className='flex-1 ml-6'>
                                                <p className='text-sm text-gray-600 mb-3'>
                                                    Users can scan this QR code to quickly access your flow on mobile devices.
                                                </p>
                                                <button className='px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors flex items-center space-x-2'>
                                                    <Download className='w-4 h-4' />
                                                    <span>Download QR Code</span>
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                <div>
                                    <div className='flex items-center justify-between mb-3'>
                                        <div className='flex items-center space-x-2'>
                                            <Code className='w-5 h-5 text-purple-600' />
                                            <h4 className='font-medium text-gray-900'>Embed Code</h4>
                                        </div>
                                        <button
                                            onClick={() => setShowEmbed(!showEmbed)}
                                            className='text-sm text-blue-600 hover:text-blue-700 font-medium'
                                        >
                                            {showEmbed ? 'Hide' : 'Show'} Embed Code
                                        </button>
                                    </div>
                                    {showEmbed && (
                                        <div>
                                            <div className='flex items-center space-x-2'>
                                                <textarea
                                                    value={embedCode}
                                                    readOnly
                                                    rows={3}
                                                    className='flex-1 px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg font-mono text-sm text-gray-700 resize-none'
                                                />
                                                <button
                                                    onClick={() => copyToClipboard(embedCode)}
                                                    className='px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors'
                                                >
                                                    Copy
                                                </button>
                                            </div>
                                            <p className='text-sm text-gray-500 mt-2'>
                                                Embed this code in your website to display the flow directly on your page.
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )} */}

                    {/* Review Settings */}
                    <div className='bg-white border border-gray-200 rounded-xl p-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Review Request Settings</h3>
                        <div className='flex items-center justify-between mb-4'>
                            <div>
                                <h4 className='font-medium text-gray-900'>Allow Review Requests</h4>
                                <p className='text-sm text-gray-600'>Users can request expert feedback from you after completing their canvas.</p>
                            </div>
                            <button
                                onClick={handleReviewToggle}
                                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                                    flowData.allowReviews ? 'bg-blue-500' : 'bg-gray-300'
                                }`}
                            >
                                <span
                                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                                        flowData.allowReviews ? 'translate-x-6' : 'translate-x-1'
                                    }`}
                                />
                            </button>
                        </div>
                    </div>

                    {/* Post-Completion Action */}
                    <div className='bg-white border border-gray-200 rounded-xl p-6'>
                        <h3 className='text-lg font-semibold text-gray-900 mb-4'>Post-Completion Action</h3>
                        <div className='space-y-3'>
                            <label className='flex items-center space-x-3'>
                                <input
                                    type='radio'
                                    name='postCompletion'
                                    value='thank-you'
                                    defaultChecked
                                    className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                                />
                                <span className='text-gray-700'>Show default thank you message</span>
                            </label>
                            <label className='flex items-center space-x-3'>
                                <input
                                    type='radio'
                                    name='postCompletion'
                                    value='redirect'
                                    className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                                />
                                <span className='text-gray-700'>Redirect to custom URL</span>
                            </label>
                            <label className='flex items-center space-x-3'>
                                <input
                                    type='radio'
                                    name='postCompletion'
                                    value='custom-message'
                                    className='w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500'
                                />
                                <span className='text-gray-700'>Display custom message</span>
                            </label>
                        </div>
                    </div>

                    {/* Preview and Finish */}
                    {/* <div className='flex items-center justify-between pt-6'>
                        <button className='px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2'>
                            <Eye className='w-4 h-4' />
                            <span>Preview Flow</span>
                        </button>

                        <button className='px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-semibold'>
                            Save & Finish
                        </button>
                    </div> */}
                </div>
            </div>
        </div>
    );
}
