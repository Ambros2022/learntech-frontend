import Link from 'next/link';
import React from 'react';

interface CardComponentProps {
    title: any;
    imageSrc: string;
    count: number;
    link: string;
    activeTab: string;
}

const CardComponent: React.FC<CardComponentProps> = React.memo(({ title, imageSrc, count, link, activeTab }) => {
    return (
        <div className="col-md-4 col-lg-2 mb-3">
            <div className="card text-center exploreCardHover">
                <Link href={link}>
                    <div className="row">
                        <div className="col-md-12 col-4 col-sm-3">
                            <img
                                width={70}
                                height={30}
                                src={imageSrc}
                                className="img-fluid mx-auto mt-3"
                                alt={`${title}-logo`}
                            />
                        </div>
                        <div className="col-md-12 col-6 col-sm-7 text-md-center text-start">
                            <div className="card-body">
                                <p className="card-text m-0 text-black">{count} {activeTab}</p>
                                <h6 className="card-title text-truncate text-blue">{title}</h6>
                            </div>
                        </div>
                        <div className="col-2 cardArrow">
                            <span>
                                <a href="#">
                                    <img
                                        width={27}
                                        height={27}
                                        src="/images/icons/right arrow.svg"
                                        alt="right-arrow"
                                    />
                                </a>
                            </span>
                        </div>
                    </div>
                </Link>
            </div >
        </div >
    );
});

export default CardComponent;
