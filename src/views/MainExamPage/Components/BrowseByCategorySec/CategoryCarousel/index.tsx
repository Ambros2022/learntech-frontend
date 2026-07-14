'use client'
import React, { useCallback } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const arrowStyle = {
    stroke: '#254692',
    border: '1px solid rgba(39, 72, 150, .2)',
    padding: '5px',
    borderRadius: '5px',
    boxSizing: 'content-box' as const,
    display: 'inline-block'
};

interface Item {
    id: string | number;
    title: string;
}

interface Props {
    items: Item[];
    handleTabClick: (id: string | number) => void;
    activeTab: string | number;
}

const CategoryCarousel = ({ items, handleTabClick, activeTab }: Props) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
        align: 'start',
        dragFree: true,
        loop: false,
    });


    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    return (
        <div className="category-carousel-container d-flex align-items-center gap-3">
            {/* LEFT ARROW */}
            <span className='fi-left' onClick={scrollPrev} style={{ cursor: 'pointer', flexShrink: 0 }}>
                <ChevronLeft style={arrowStyle} />
            </span>

            {/* EMBLA VIEWPORT */}
            <div style={{ overflow: 'hidden', flex: 1, padding: '4px 0' }} ref={emblaRef}>
                <div style={{ display: 'flex', gap: '10px' }}>
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="exam-tab-slide examSecItems d-flex justify-content-center text-center"
                            style={{ flex: '0 0 auto' }}
                        >
                            <button
                                className={`text-truncate categoryTextHide btn nav-link ${activeTab === item.id ? 'active' : ''}`}
                                id={`pills-${item.id}-tab`}
                                type="button"
                                onClick={() => handleTabClick(item.id)}
                                style={{
                                    color: '#7d91c0',
                                    border: '1px solid #d4daea',
                                    padding: '10px 12px',
                                    borderRadius: '5px',
                                    fontSize: '14px',
                                    cursor: 'pointer',
                                }}
                            >
                                {item.title}
                            </button>
                        </div>
                    ))}
                </div>
            </div>

            {/* RIGHT ARROW */}
            <span className='fi-right' onClick={scrollNext} style={{ cursor: 'pointer', flexShrink: 0 }}>
                <ChevronRight style={arrowStyle} />
            </span>
        </div>
    );
};

export default CategoryCarousel;
