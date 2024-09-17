import React from 'react'

const OrganizationSection = () => {

    const cardData = [
        {
            "title": "1. Consult",
            "icon": "bi-person-fill",
            "description": "We begin by understanding your challenges, and objectives and take a consultative approach for suggesting training solutions"
        },
        {
            "title": "2. Plan",
            "icon": "bi-send-fill",
            "description": "Crafting a comprehensive strategy, we lay down a clear roadmap for the training solution."
        },
        {
            "title": "3. Align",
            "icon": "bi-gear-fill",
            "description": "We align an expert trainer with your team to ensure the training objectives are in-line with your business goals."
        },
        {
            "title": "4. Customize",
            "icon": "bi-tools",
            "description": "We customize the training courses as per the needs of your team."
        },
        {
            "title": "5. Execute",
            "icon": "bi bi-rocket-takeoff-fill",
            "description": "With meticulous planning in place, we roll out the training sessions, ensuring engagement, interactivity, and real-time learning."
        },
        {
            "title": "6. Evaluate",
            "icon": "bi bi-trophy-fill",
            "description": "After training, we assess the tangible impact of our training interventions based on a combination of feedback, analytics, and business"
        }
    ]

    return (
        <>
            <section className='bg-white py-3'>
                <div className="container">
                    <h2 className='text-center fw-bold text-blue mb-3'>Edstellar Approach to Organizational Management Training</h2>
                    <p className='text-black'>
                        Edstellar is a leading management training company that takes a holistic approach to delivering training solutions. Starting from expert consultation, training customization, training delivery and post-training support, our clients get ongoing assistance at every stage of their learning journey.

                        Our commitment to client success extends beyond the training sessions. We provide guidance to ensure that your team continues to excel and apply their newly acquired skills effectively in their roles.

                        The training methods include corporate live interactive sessions, and hands-on exercises designed for professionals. Edstellar’s Management training for teams offer significant flexibility in terms of scheduling and delivery options, catering to the diverse needs of organizations.
                    </p>
                    <div className="d-flex py-md-5 py-3 flex-wrap justify-content-center gap-3">
                        {
                            cardData.map((data, index) => (
                                <>
                                    <div className='card rounded-0 p-3 organizationalCard'>
                                        <div className='text-center'>
                                            <i className={`fs-1 bi text-blue ${data.icon}`}></i>
                                            <i className='bi text-blue bi-chevron-right right-arrow-orgazinational'></i>
                                            <h5 className='text-blue'>{data.title}</h5>
                                            <p>{data.description}</p>
                                        </div>
                                    </div>
                                </>
                            ))
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default OrganizationSection