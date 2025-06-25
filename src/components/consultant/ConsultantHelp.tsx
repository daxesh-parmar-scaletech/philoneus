import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, HelpCircle, Book, MessageCircle, Video, ChevronDown, ChevronRight, Search, Mail, Phone } from 'lucide-react';

export default function ConsultantHelp() {
    const [searchQuery, setSearchQuery] = useState('');
    const [expandedSection, setExpandedSection] = useState<string | null>('getting-started');

    const helpSections = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            icon: Book,
            articles: [
                { title: 'Creating Your First Event', content: 'Learn how to build your first AI-powered business canvas event from scratch.' },
                { title: 'Understanding Canvas Types', content: 'Explore different canvas templates and when to use each one.' },
                { title: 'Setting Up Your Profile', content: 'Customize your consultant profile and branding.' },
            ],
        },
        {
            id: 'flow-builder',
            title: 'Event Builder',
            icon: HelpCircle,
            articles: [
                { title: 'Designing Effective Questions', content: 'Best practices for creating questions that generate valuable insights.' },
                { title: 'Configuring AI Instructions', content: 'How to write effective AI prompts for canvas generation.' },
                { title: 'Canvas Section Mapping', content: 'Link questions to specific canvas sections for optimal AI output.' },
            ],
        },
        {
            id: 'ai-features',
            title: 'AI Features',
            icon: Video,
            articles: [
                { title: 'AI Drafting Instructions', content: 'Guide the AI to generate content that matches your consulting style.' },
                { title: 'Feedback Rules', content: 'Set up intelligent feedback for when users edit their canvas.' },
                { title: 'Prompt Engineering Tips', content: 'Advanced techniques for better AI responses.' },
            ],
        },
        {
            id: 'sharing',
            title: 'Sharing & Publishing',
            icon: MessageCircle,
            articles: [
                { title: 'Publishing Your Event', content: 'Make your event available to clients and track engagement.' },
                { title: 'Share Options', content: 'Different ways to distribute your event to clients.' },
                { title: 'Review Requests', content: 'Manage and respond to client review requests.' },
            ],
        },
    ];

    const toggleSection = (sectionId: string) => {
        setExpandedSection(expandedSection === sectionId ? null : sectionId);
    };

    const filteredSections = helpSections
        .map((section) => ({
            ...section,
            articles: section.articles.filter(
                (article) =>
                    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    article.content.toLowerCase().includes(searchQuery.toLowerCase())
            ),
        }))
        .filter((section) => section.articles.length > 0 || searchQuery === '');

    return (
        <div className='min-h-screen bg-gradient-to-br from-gray-50 to-gray-100'>
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
                                    <HelpCircle className='w-4 h-4 text-white' />
                                </div>
                                <h1 className='text-lg font-semibold text-gray-900'>Help & Support</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
                <div className='grid grid-cols-1 lg:grid-cols-4 gap-8'>
                    {/* Sidebar */}
                    <div className='lg:col-span-1'>
                        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-8'>
                            <h3 className='font-semibold text-gray-900 mb-4'>Quick Actions</h3>
                            <div className='space-y-3'>
                                <button className='w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2'>
                                    <Video className='w-4 h-4' />
                                    <span>Watch Tutorial</span>
                                </button>
                                <button className='w-full px-4 py-3 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center space-x-2'>
                                    <MessageCircle className='w-4 h-4' />
                                    <span>Contact Support</span>
                                </button>
                                <Link
                                    to='/consultant/flow/new'
                                    className='w-full px-4 py-3 text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors flex items-center space-x-2'
                                >
                                    <Book className='w-4 h-4' />
                                    <span>Create New Event</span>
                                </Link>
                            </div>

                            {/* Contact Info */}
                            <div className='mt-8 pt-6 border-t border-gray-200'>
                                <h4 className='font-medium text-gray-900 mb-3'>Need More Help?</h4>
                                <div className='space-y-2 text-sm text-gray-600'>
                                    <div className='flex items-center space-x-2'>
                                        <Mail className='w-4 h-4' />
                                        <span>support@deltax.ai</span>
                                    </div>
                                    <div className='flex items-center space-x-2'>
                                        <Phone className='w-4 h-4' />
                                        <span>+1 (555) 123-4567</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Help Content */}
                    <div className='lg:col-span-3'>
                        {/* Search */}
                        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8'>
                            <div className='relative'>
                                <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400' />
                                <input
                                    type='text'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder='Search help articles...'
                                    className='w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                />
                            </div>
                        </div>

                        {/* Help Sections */}
                        <div className='space-y-6'>
                            {filteredSections.map((section) => (
                                <div key={section.id} className='bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden'>
                                    <button
                                        onClick={() => toggleSection(section.id)}
                                        className='w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors'
                                    >
                                        <div className='flex items-center space-x-3'>
                                            <div className='w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center'>
                                                <section.icon className='w-4 h-4 text-blue-600' />
                                            </div>
                                            <h3 className='text-lg font-semibold text-gray-900'>{section.title}</h3>
                                            <span className='text-sm text-gray-500'>({section.articles.length} articles)</span>
                                        </div>
                                        {expandedSection === section.id ? (
                                            <ChevronDown className='w-5 h-5 text-gray-400' />
                                        ) : (
                                            <ChevronRight className='w-5 h-5 text-gray-400' />
                                        )}
                                    </button>

                                    {expandedSection === section.id && (
                                        <div className='border-t border-gray-200'>
                                            {section.articles.map((article, index) => (
                                                <div key={index} className='px-6 py-4 border-b border-gray-100 last:border-b-0'>
                                                    <h4 className='font-medium text-gray-900 mb-2'>{article.title}</h4>
                                                    <p className='text-gray-600 text-sm leading-relaxed'>{article.content}</p>
                                                    <button className='mt-2 text-blue-600 hover:text-blue-700 text-sm font-medium'>
                                                        Read More →
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Video Tutorials */}
                        <div className='bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-8'>
                            <h3 className='text-lg font-semibold text-gray-900 mb-4'>Video Tutorials</h3>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                                <div className='bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors cursor-pointer'>
                                    <div className='w-full h-32 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center mb-3'>
                                        <Video className='w-8 h-8 text-white' />
                                    </div>
                                    <h4 className='font-medium text-gray-900 mb-1'>Getting Started with Delta X</h4>
                                    <p className='text-sm text-gray-600'>5 min tutorial</p>
                                </div>
                                <div className='bg-gray-100 rounded-lg p-4 hover:bg-gray-200 transition-colors cursor-pointer'>
                                    <div className='w-full h-32 bg-gradient-to-br from-green-500 to-green-600 rounded-lg flex items-center justify-center mb-3'>
                                        <Video className='w-8 h-8 text-white' />
                                    </div>
                                    <h4 className='font-medium text-gray-900 mb-1'>Advanced AI Configuration</h4>
                                    <p className='text-sm text-gray-600'>12 min tutorial</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
