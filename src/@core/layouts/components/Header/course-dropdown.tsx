import { useState, useCallback } from 'react';
import Link from 'next/link';
import React from 'react';

const DropdownMenu = React.memo(({ states, type, onClose }: any) => {
    const [visibleStates, setVisibleStates] = useState(10); // Initially show 10 states
    const [isExpanded, setIsExpanded] = useState(false); // Track whether the list is expanded

    const handleViewMore = useCallback(() => {
        setVisibleStates((prev) => Math.min(prev + 5, states.length));
        setIsExpanded(true); // Set to expanded when viewing more
    }, [states.length]);

    const handleShowLess = useCallback(() => {
        setVisibleStates(10); // Reset to initial number of visible states
        setIsExpanded(false); // Set to collapsed
    }, []);

    return (
        <>
            {states.length > 0 && (
                <ul className="dropdown-menu menu-icon" aria-labelledby="navbarDropdownMenuLink">
                    <div className="text-center">
                        <p style={{ fontWeight: 'bold', color: '#274896' }}>Popular Courses</p>
                    </div>
                    {states.slice(0, visibleStates).map((item) => (
                        <li key={item.id}>
                            <Link
                                href={`/course/${item.id}/${item.slug}`}
                                className="dropdown-item"
                                onClick={onClose} // Close the dropdown on link click
                            >
                                <div className="d-flex justify-content-between text-truncate">
                                    {item.name}
                                </div>
                            </Link>
                        </li>
                    ))}
                    <div className="text-center text-blue dropdownBtn">
                        {visibleStates < states.length && (
                            <button className="btn" onClick={handleViewMore}>
                                View More
                            </button>
                        )}
                        {isExpanded && (
                            <button className="btn" onClick={handleShowLess}>
                                Show Less
                            </button>
                        )}
                    </div>
                </ul>
            )}
        </>
    );
});

export default DropdownMenu;