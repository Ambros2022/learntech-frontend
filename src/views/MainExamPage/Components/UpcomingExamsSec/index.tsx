import React from 'react'
import MainCarousel2 from 'src/@core/components/carousel2';

function PopularCourses() {

    const items = [
        { id: 1, title: 'CMAT', date: '4th May 2024' },
        { id: 2, title: 'CMAT', date: '4th May 2024' },
        { id: 3, title: 'CMAT', date: '4th May 2024' },
        { id: 4, title: 'CMAT', date: '4th May 2024' },
        { id: 5, title: 'CMAT', date: '4th May 2024' },
        { id: 6, title: 'CMAT', date: '4th May 2024' },
        { id: 7, title: 'CMAT', date: '4th May 2024' },
        { id: 8, title: 'CMAT', date: '4th May 2024' },
        { id: 9, title: 'CMAT', date: '4th May 2024' },
        { id: 10, title: 'CMAT', date: '4th May 2024' },
        { id: 20, title: 'CMAT', date: '4th May 2024' },
    ]

    // Function to create card components
    function createCards() {
        return items.map(card => (
            <CardComponent
                key={card.id}
                title={card.title}
                date={card.date}
            />
        ));
    }

    // CardComponent function
    function CardComponent({ title, date }) {
        return (
            <div className='topCourseConCarousel'>
                <div className="card text-center d-flex mx-2 border-0">
                    <div className="row flex-fill">
                        <div className="col-12 text-start px-0">
                            <div className="ms-2 card-body">
                                <h4 className="card-title fw-bold text-blue">{title}</h4>
                                <small className="card-title flex-fill">{date}</small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className=''>
            <div className="topCarouselCardsCon bg-examsCarouselCr examsCardCarousel px-5 pt-3 pb-3 position-relative">
                <MainCarousel2 items={createCards()} />
            </div>
        </section>
    )
}

export default PopularCourses;
