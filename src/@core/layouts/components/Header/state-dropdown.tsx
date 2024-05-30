import { useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';

const DropdownMenu = React.memo(({ states, type }: any) => {
    const [visibleStates, setVisibleStates] = useState(10); // Initially show 10 states
    const [isExpanded, setIsExpanded] = useState(false); // Track whether the list is expanded

    const handleViewMore = useCallback(() => {
        setVisibleStates(prev => Math.min(prev + 5, states.length));
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
                        <p style={{ fontWeight: 'bold', color: '#274896' }}>{type} by location</p>
                    </div>
                    {states.slice(0, visibleStates).map(item => (
                        <li key={item.id}>
                            <Link
                                href={{
                                    pathname: type === "College" ? "/colleges" : "/universities",
                                    query: { state_id: item.id }
                                }}
                                className="dropdown-item"
                            >
                                <div className="d-flex justify-content-between">
                                    {item.name}
                                    {item.city.length > 0 && (
                                        <Image className="ms-auto" src="/images/icons/right arrow.svg" width={20} height={25} alt="arrow-img" />
                                    )}
                                </div>
                            </Link>
                            {item.city.length > 0 && (
                                <ul className="dropdown-menu dropdown-submenu menu-icon">
                                    {item.city.map(city => (
                                        <li key={city.id}>
                                            <Link
                                                className="dropdown-item"
                                                href={{
                                                    pathname: type === "College" ? "/colleges" : "/universities",
                                                    query: { city_id: city.id }
                                                }}
                                            >
                                                {city.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            )}
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
