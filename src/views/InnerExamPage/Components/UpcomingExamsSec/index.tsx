import React from 'react'
import Carousel3 from 'src/@core/components/carousel3';

function PopularCourses() {

    const items = [
        { id: 1, title: '1st Latest MDS News Title', },
        { id: 2, title: '1st Latest MDS News Title', },
        { id: 3, title: '1st Latest MDS News Title', },
        { id: 4, title: '1st Latest MDS News Title', },
        { id: 5, title: '1st Latest MDS News Title', },
        { id: 6, title: '1st Latest MDS News Title', },
        { id: 7, title: '1st Latest MDS News Title', },
        { id: 8, title: '1st Latest MDS News Title', },
        { id: 9, title: '1st Latest MDS News Title', },
        { id: 10, title: '1st Latest MDS News Title', },
        { id: 20, title: '1st Latest MDS News Title', },
    ]

    // Function to create card components
    function createCards() {
        return items.map(card => (
            <CardComponent
                key={card.id}
                title={card.title}
            />
        ));
    }

    // CardComponent function
    function CardComponent({ title }) {
        return (
            <div className='topCourseConCarousel'>
                <div className="card text-center d-flex mx-2 border-0 mx-md-4">
                    <div className="row flex-fill">
                        <div className="col-12 text-start px-0">
                            <div className="ms-2 card-body d-flex justify-content-center">
                                <div className="align-content-center">
                                    <h6 className="card-title fw-bold text-blue">{title}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className=''>
            <div className="topCarouselCardsCon bg-examsCarouselCr examCardCarousel px-5 pt-3 pb-3 position-relative">
                <Carousel3 items={createCards()} />
            </div>
        </section>
    )
}

export default PopularCourses;
