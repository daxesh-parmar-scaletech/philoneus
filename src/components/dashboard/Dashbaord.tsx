import { useCallback, useEffect, useState } from 'react';
import { Users, Activity, Gift, Handshake, UserCircle, Briefcase, Share2, CreditCard, TrendingUp } from 'lucide-react';

import HttpService from '../../shared/services/http.service';
import { CanvasSection } from './CanvasSection-temp';
import { Spinner } from 'shared/spinner';
import { SuggestionData, useSuggestionContext } from 'contexts/useSuggestion';
import { API_CONFIG } from 'shared/constants/api';
import { notify } from 'shared/components/notification/notification';
import { useUserFlow } from 'contexts/userFlowContext';

export function Dashboard() {
    const { canvasData } = useUserFlow();
    console.log(' canvasData:', canvasData);

    const [loading, setLoading] = useState(false);
    const [ID, setID] = useState('');
    const { suggestionData, setSuggestionData } = useSuggestionContext();

    const [sections, setSections] = useState([
        {
            id: 'key-partners',
            title: 'Key Partners',
            content: [''],
            icon: <Users className='size-5 text-blue-600' />,
            className: 'h-full bg-white border border-blue-200 shadow-sm rounded-lg',
        },
        {
            id: 'key-activities',
            title: 'Key Activities',
            content: [],
            icon: <Activity className='size-5 text-green-600' />,
            className: 'h-1/2 bg-white border border-green-200 shadow-sm rounded-lg',
        },
        {
            id: 'value-propositions',
            title: 'Value Propositions',
            content: [],
            icon: <Gift className='size-5 text-purple-600' />,
            className: 'h-full bg-white border border-yellow-200 shadow-sm rounded-lg',
        },
        {
            id: 'customer-relationships',
            title: 'Customer Relationships',
            content: [],
            icon: <Handshake className='size-5 text-pink-600' />,
            className: 'h-1/2 bg-white border border-pink-200 shadow-sm rounded-lg',
        },
        {
            id: 'customer-segments',
            title: 'Customer Segments',
            content: [],
            icon: <UserCircle className='size-5 text-orange-600' />,
            className: 'h-full bg-white border border-orange-200 shadow-sm rounded-lg',
        },
        {
            id: 'key-resources',
            title: 'Key Resources',
            content: [],
            icon: <Briefcase className='size-5 text-teal-600' />,
            className: 'h-1/2 bg-white border border-purple-200 shadow-sm rounded-lg',
        },
        {
            id: 'channels',
            title: 'Channels',
            content: [],
            icon: <Share2 className='size-5 text-indigo-600' />,
            className: 'h-1/2 bg-white border border-indigo-200 shadow-sm rounded-lg',
        },
        {
            id: 'cost-structure',
            title: 'Cost Structure',
            content: [],
            icon: <CreditCard className='size-5 text-red-600' />,
            className: 'h-full w-1/2 bg-white border border-red-200 shadow-sm rounded-lg',
        },
        {
            id: 'revenue-streams',
            title: 'Revenue Streams',
            content: [],
            icon: <TrendingUp className='size-5 text-yellow-600' />,
            className: 'h-full w-1/2 bg-white border border-teal-200 shadow-sm rounded-lg',
        },
    ]);

    const [lastEditedId, setLastEditedId] = useState('');

    // const fetchDashboard = useCallback(async () => {
    //     try {
    //         // const res = await HttpService.get(API_CONFIG.bmc);
    //         // const data = res.data;
    //         // if (data && data.length > 0) {
    //         const res = {
    //             data: [
    //                 {
    //                     sectionId: 'key-partners',
    //                     content: [
    //                         'Strategic **alliances** with industry-leading suppliers to ensure high-quality raw materials and reduce production costs',
    //                         'Partnership with **technology firms** for advanced R&D capabilities and co-development of innovative products',
    //                         'Collaboration with **logistics providers** to optimize supply chain efficiency and enhance delivery speed',
    //                         'Engagement with **marketing agencies** to expand brand reach and effectively target new customer segments',
    //                         'Agreements with **financial institutions** for flexible financing solutions and favorable credit terms',
    //                         'Cooperation with **regulatory bodies** to stay compliant with industry standards and facilitate smoother market entry',
    //                         'Networking with **industry associations** to gain insights into market trends and foster community relationships',
    //                         'Joint ventures with **complementary businesses** to enter new markets and diversify product offerings',
    //                     ],
    //                 },
    //                 {
    //                     sectionId: 'key-resources',
    //                     content: [
    //                         'Physical infrastructure including **office space** and **manufacturing facilities**',
    //                         'Intellectual property such as **patents**, **trademarks**, and **proprietary algorithms**',
    //                         'Human resources comprising **experienced engineers**, **sales professionals**, and **customer service teams**',
    //                         'Financial resources including **venture capital funding** and **operating cash flow**',
    //                         'Strategic partnerships with **key suppliers** and **technology partners**',
    //                         'Advanced **technology platforms** and **software tools** for product development',
    //                         'Strong **brand reputation** and **market presence**',
    //                         'Robust **distribution network** and **logistics capabilities**',
    //                     ],
    //                 },
    //                 {
    //                     sectionId: 'key-activities',
    //                     content: [
    //                         'Develop and refine **innovative products** that align with customer needs and market trends',
    //                         'Implement **scalable marketing strategies** to drive customer acquisition and brand awareness',
    //                         'Optimize **operations and logistics** to ensure efficient delivery and product availability',
    //                         'Cultivate **strategic partnerships** to enhance market reach and resource sharing',
    //                         'Enhance the **customer experience** through personalized service and support',
    //                         'Leverage **data analytics** to make informed business decisions and improve product offerings',
    //                         'Foster a culture of **continuous improvement** to maintain a competitive edge',
    //                         'Expand **sales channels** by exploring new markets and distribution networks',
    //                     ],
    //                 },
    //                 {
    //                     sectionId: 'revenue-streams',
    //                     content: [
    //                         'Subscription-based model offering tiered **membership plans** for recurring revenue',
    //                         'One-time **purchase fees** for premium product features and add-ons',
    //                         'Commission-based revenue from **affiliate partnerships** and collaborations',
    //                         'In-app **advertising** targeting niche customer segments for additional income',
    //                         '**Licensing fees** for third-party usage of proprietary technology or content',
    //                         'Event-based revenue through **workshops, webinars,** and live demonstrations',
    //                         'Offering **consultation services** as a value-added package for premium clients',
    //                         '**Freemium model** with upsell opportunities to paid versions offering advanced capabilities',
    //                         'Revenue from **merchandise sales** linked to the brand identity and community',
    //                         '**Data monetization** through insights and analytics services to external partners',
    //                     ],
    //                 },
    //                 {
    //                     sectionId: 'value-propositions',
    //                     content: [
    //                         '**Innovative solutions** that address unmet needs in the market, delivering unique value to customers.',
    //                         '**Cost-effectiveness** through competitive pricing without compromising on quality, enhancing customer satisfaction.',
    //                         '**High-quality products** with superior features that provide a distinct advantage over competitors.',
    //                         '**Personalized services** tailored to individual customer preferences, fostering loyalty and repeat business.',
    //                         '**Sustainability-focused offerings** that appeal to environmentally-conscious consumers and support eco-friendly practices.',
    //                         '**Fast and reliable delivery** ensuring that customers receive products on time, increasing trust and reliability.',
    //                         '**Exceptional customer support** that resolves issues promptly, creating a positive customer experience.',
    //                         '**Technological innovation** that enhances product performance and user experience, setting the brand apart.',
    //                         '**Comprehensive product range** that meets a wide array of customer needs, encouraging one-stop shopping.',
    //                         '**Strong brand reputation** built on trust and quality, attracting and retaining a loyal customer base.',
    //                     ],
    //                 },
    //                 {
    //                     sectionId: 'customer-relationships',
    //                     content: [
    //                         '**Personalized Support** to enhance customer satisfaction and foster loyalty',
    //                         '**Community Engagement** through social media and forums to build a sense of belonging',
    //                         '**Feedback Loops** to continuously improve products and address customer needs',
    //                         '**Loyalty Programs** that offer exclusive benefits and incentives',
    //                         '**Self-Service Options** to empower customers and streamline support processes',
    //                         '**Proactive Communication** to keep customers informed and engaged',
    //                         '**Co-creation Opportunities** allowing customers to contribute to product development',
    //                         '**VIP Access** to events and early product releases for high-value customers',
    //                     ],
    //                 },
    //                 {
    //                     sectionId: 'customer-segments',
    //                     content: [
    //                         '**Tech-savvy millennials** seeking innovative AI-driven solutions for everyday challenges',
    //                         '**Small to medium enterprises (SMEs)** looking to enhance operational efficiency with AI tools',
    //                         '**Healthcare providers** interested in AI applications for improved patient care and diagnostics',
    //                         '**Educational institutions** aiming to integrate AI technology into their curriculum and operations',
    //                         '**E-commerce platforms** seeking personalized AI-driven customer experiences and analytics',
    //                         '**Financial services firms** needing advanced AI algorithms for risk assessment and fraud detection',
    //                         '**Urban planners** and **smart city developers** using AI for sustainable city management solutions',
    //                         '**Content creators** and **media companies** leveraging AI for content customization and audience engagement',
    //                         '**Retailers** looking to implement AI for inventory management and customer service enhancements',
    //                         '**Developers** and **AI enthusiasts** seeking cutting-edge AI frameworks and tools for innovation',
    //                     ],
    //                 },
    //                 {
    //                     sectionId: 'channels',
    //                     content: [
    //                         'Direct sales through an **online platform** to reach a global audience effectively',
    //                         'Partnerships with **influencer networks** to enhance brand visibility and credibility',
    //                         'Utilization of **social media platforms** like Instagram and TikTok for targeted marketing campaigns',
    //                         'Collaboration with **e-commerce marketplaces** such as Amazon and eBay to increase product accessibility',
    //                         'Engagement through **email marketing** for personalized offers and updates to customers',
    //                         'Presence at **industry trade shows** and events to build direct relationships with potential clients',
    //                         'Utilizing **affiliate marketing** programs to incentivize third-party promotions',
    //                         'Offering **webinars and virtual workshops** to educate and engage the target audience',
    //                         "Building a robust **SEO strategy** to drive organic traffic to the company's website",
    //                     ],
    //                 },
    //             ],
    //             message: 'Canvas content generated successfully',
    //             statusCode: 201,
    //             success: true,
    //         };
    //         setSectionsData(res.data);
    //         // }
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         console.error('Error fetching dashboard:', error);
    //     }
    // }, []);

    const handleEdit = useCallback(
        async (id: string, newContent: string[], animate?: boolean = false) => {
            // setLoading(true);
            if (animate) {
                setLastEditedId(id);
                setTimeout(() => {
                    setLastEditedId('');
                }, 2000);
            }
            setSections((pre) => pre.map((section) => (section.id === id ? { ...section, content: newContent } : section)));
            try {
                const res = await HttpService.patch(`${API_CONFIG.bmc}${ID}/`, { [id]: newContent });
                // setLoading(false);
                console.log('res:', res);
            } catch (error) {
                // setLoading(false);
                console.error('Error fetching dashboard:', error);
            }
        },
        [ID]
    );

    useEffect(() => {
        if (suggestionData && typeof suggestionData === 'object' && 'title' in suggestionData && 'items' in suggestionData) {
            handleEdit(suggestionData.title.toLowerCase().replace(/\s+/g, '_'), suggestionData.items, true);
            notify('Suggestion applied successfully', 'success');
            setSuggestionData({} as SuggestionData);
        }
    }, [handleEdit, setSuggestionData, suggestionData]);

    useEffect(() => {
        setSectionsData(canvasData || []);
    }, [canvasData]);

    const setSectionsData = (sections: any) => {
        console.log(' sections:', sections);
        setID(sections.id);
        setSections((prevSections) =>
            prevSections.map((section) => {
                const matchedResponse = sections.find((item: any) => item.sectionId === section.id);
                return {
                    ...section,
                    content: (matchedResponse ? matchedResponse.content : section.content).map((line: string) =>
                        line.trim().startsWith('-') ? line : `- ${line.trim()}`
                    ),
                };
            })
        );
    };

    const getCanvas = useCallback(
        (index: number, isLongHeight?: boolean) => {
            const { id, icon, title, content, className } = sections[index];
            return (
                <CanvasSection
                    icon={icon}
                    title={title}
                    content={content}
                    onEdit={(content) => handleEdit(id, content)}
                    className={className}
                    isLongHeight={isLongHeight}
                    highlight={id === lastEditedId}
                />
            );
        },
        [handleEdit, sections, lastEditedId]
    );

    return (
        <>
            {loading && <Spinner />}
            {!loading && (
                <div className='h-full p-6 bg-gray-50 rounded-lg'>
                    <div className='grid grid-cols-5 gap-4 h-full'>
                        {/* Column 1 - Key Partners */}
                        <div className='col-span-1'>{getCanvas(0, true)}</div>

                        {/* Column 2 - Key Activities & Key Resources */}
                        <div className='col-span-1 flex flex-col gap-4'>
                            {getCanvas(1)}
                            {getCanvas(5)}
                        </div>

                        {/* Column 3 - Value Propositions (center) */}
                        <div className='col-span-1'>{getCanvas(2, true)}</div>

                        {/* Column 4 - Customer Relationships & Channels */}
                        <div className='col-span-1 flex flex-col gap-4'>
                            {getCanvas(3)}
                            {getCanvas(6)}
                        </div>

                        {/* Column 5 - Customer Segments */}
                        <div className='col-span-1'>{getCanvas(4, true)}</div>

                        {/* Bottom row - Cost Structure & Revenue Streams */}
                        <div className='gap-4 col-span-5 flex flex-row'>
                            {getCanvas(7)}
                            {getCanvas(8)}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
