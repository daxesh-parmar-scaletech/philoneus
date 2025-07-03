import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';
import tippy from 'tippy.js';

import { useEffect, useRef, ReactNode } from 'react';
interface TooltipProps {
    children: ReactNode;
    content: string;
    placement?: 'top' | 'bottom' | 'left' | 'right';
}

export default function Tooltip({ children, content, placement = 'top' }: TooltipProps) {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        if (ref.current) {
            tippy(ref.current, {
                content,
                placement,
                animation: 'scale',
                arrow: true,
                delay: [50, 0], // Delay before showing
            });
        }
    }, [content, placement]);

    return (
        <span ref={ref} className='inline-block'>
            {children}
        </span>
    );
}
