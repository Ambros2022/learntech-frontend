import Image from 'next/image'
import React from 'react'
import ContactForm from 'src/@core/components/popup/ContactForm'

// Define an array of course objects
const courses = [
    {
        id: 1,
        icon: '/images/icons/Medical.svg',
        title: 'Medical Courses'
    },
    {
        id: 2,
        icon: '/images/icons/Dental.svg',
        title: 'Dental Courses'
    },
    {
        id: 3,
        icon: '/images/icons/Architecture.svg',
        title: 'Architecture Courses'
    },
    {
        id: 4,
        icon: '/images/icons/Engineering.svg',
        title: 'Engineering Courses'
    },
    {
        id: 5,
        icon: '/images/icons/Science.svg',
        title: 'Science Courses'
    },
    {
        id: 6,
        icon: '/images/icons/Design.svg',
        title: 'Design Courses'
    },
    {
        id: 7,
        icon: '/images/icons/Law.svg',
        title: 'Law Courses'
    },
    {
        id: 8,
        icon: '/images/icons/Veterinary.svg',
        title: 'Veterinary Courses'
    }
];

const OverviewSec = () => {
    return (
        <>
            <section className='bg-white pt-2 pb-5'>
                <div className="container">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-7 col-10 mx-auto">
                            {/* Your existing content */}
                            <p className='text-black'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis blanditiis saepe ad, consequatur consectetur a! Inventore nobis expedita iure debitis ipsum rem necessitatibus ut. Accusamus voluptate recusandae earum quo consequuntur cupiditate, deleniti magnam assumenda atque necessitatibus repellendus laborum sed voluptas dicta, officia laboriosam ex minima quaerat perspiciatis. Cumque aliquid asperiores ad. Temporibus omnis iusto ab architecto adipisci, reiciendis dolorum a impedit officia sapiente quasi ipsam explicabo debitis fugiat fuga placeat dolores similique cupiditate tenetur? Omnis veritatis vitae quae incidunt, consequatur id blanditiis ullam voluptate porro dolores voluptatum eveniet adipisci similique quam, magni officia repellat mollitia impedit quos ratione. Assumenda quod consectetur illo quam in, voluptates modi quae perspiciatis dolore temporibus hic quas cum explicabo rem magnam facere voluptatum numquam saepe at recusandae eum. Fugit doloremque ullam rerum, iusto distinctio ad error. Tempore vel esse deleniti aliquam, veniam rerum impedit possimus magni quisquam odit repellat sed laborum sunt nulla totam beatae! Ea fuga fugiat quaerat nisi quasi. Vero autem id veniam sint dicta natus! Vitae culpa consequuntur accusamus est voluptas maiores harum inventore ea et necessitatibus corrupti impedit voluptatibus reiciendis, dolore placeat dignissimos, error soluta nemo commodi consequatur beatae laboriosam. Cupiditate error omnis possimus illo eaque ut voluptates numquam officia laudantium.
                            </p>
                            <p className='text-black'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis blanditiis saepe ad, consequatur consectetur a! Inventore nobis expedita iure debitis ipsum rem necessitatibus ut. Accusamus voluptate recusandae earum quo consequuntur cupiditate, deleniti magnam assumenda atque necessitatibus repellendus laborum sed voluptas dicta, officia laboriosam ex minima quaerat perspiciatis. Cumque aliquid asperiores ad. Temporibus omnis iusto ab architecto adipisci, reiciendis dolorum a impedit officia sapiente quasi ipsam explicabo debitis fugiat fuga placeat dolores similique cupiditate tenetur? Omnis veritatis vitae quae incidunt, consequatur id blanditiis ullam voluptate porro dolores voluptatum eveniet adipisci similique quam, magni officia repellat mollitia impedit quos ratione. Assumenda quod consectetur illo quam in, voluptates modi quae perspiciatis dolore temporibus hic quas cum explicabo rem magnam facere voluptatum numquam saepe at recusandae eum. Fugit doloremque ullam rerum, iusto distinctio ad error. Tempore vel esse deleniti aliquam, veniam rerum impedit possimus magni quisquam odit repellat sed laborum sunt nulla totam beatae! Ea fuga fugiat quaerat nisi quasi. Vero autem id veniam sint dicta natus! Vitae culpa consequuntur accusamus est voluptas maiores harum inventore ea et necessitatibus corrupti impedit voluptatibus reiciendis, dolore placeat dignissimos, error soluta nemo commodi consequatur beatae laboriosam. Cupiditate error omnis possimus illo eaque ut voluptates numquam officia laudantium.
                            </p>
                            <p className='text-black'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis blanditiis saepe ad, consequatur consectetur a! Inventore nobis expedita iure debitis ipsum rem necessitatibus ut. Accusamus voluptate recusandae earum quo consequuntur cupiditate, deleniti magnam assumenda atque necessitatibus repellendus laborum sed voluptas dicta, officia laboriosam ex minima quaerat perspiciatis. Cumque aliquid asperiores ad. Temporibus omnis iusto ab architecto adipisci, reiciendis dolorum a impedit officia sapiente quasi ipsam explicabo debitis fugiat fuga placeat dolores similique cupiditate tenetur? Omnis veritatis vitae quae incidunt, consequatur id blanditiis ullam voluptate porro dolores voluptatum eveniet adipisci similique quam, magni officia repellat mollitia impedit quos ratione. Assumenda quod consectetur illo quam in, voluptates modi quae perspiciatis dolore temporibus hic quas cum explicabo rem magnam facere voluptatum numquam saepe at recusandae eum. Fugit doloremque ullam rerum, iusto distinctio ad error. Tempore vel esse deleniti aliquam, veniam rerum impedit possimus magni quisquam odit repellat sed laborum sunt nulla totam beatae! Ea fuga fugiat quaerat nisi quasi. Vero autem id veniam sint dicta natus! Vitae culpa consequuntur accusamus est voluptas maiores harum inventore ea et necessitatibus corrupti impedit voluptatibus reiciendis, dolore placeat dignissimos, error soluta nemo commodi consequatur beatae laboriosam. Cupiditate error omnis possimus illo eaque ut voluptates numquam officia laudantium.
                            </p>
                            <p className='text-black'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis blanditiis saepe ad, consequatur consectetur a! Inventore nobis expedita iure debitis ipsum rem necessitatibus ut. Accusamus voluptate recusandae earum quo consequuntur cupiditate, deleniti magnam assumenda atque necessitatibus repellendus laborum sed voluptas dicta, officia laboriosam ex minima quaerat perspiciatis. Cumque aliquid asperiores ad. Temporibus omnis iusto ab architecto adipisci, reiciendis dolorum a impedit officia sapiente quasi ipsam explicabo debitis fugiat fuga placeat dolores similique cupiditate tenetur? Omnis veritatis vitae quae incidunt, consequatur id blanditiis ullam voluptate porro dolores voluptatum eveniet adipisci similique quam, magni officia repellat mollitia impedit quos ratione. Assumenda quod consectetur illo quam in, voluptates modi quae perspiciatis dolore temporibus hic quas cum explicabo rem magnam facere voluptatum numquam saepe at recusandae eum. Fugit doloremque ullam rerum, iusto distinctio ad error. Tempore vel esse deleniti aliquam, veniam rerum impedit possimus magni quisquam odit repellat sed laborum sunt nulla totam beatae! Ea fuga fugiat quaerat nisi quasi. Vero autem id veniam sint dicta natus! Vitae culpa consequuntur accusamus est voluptas maiores harum inventore ea et necessitatibus corrupti impedit voluptatibus reiciendis, dolore placeat dignissimos, error soluta nemo commodi consequatur beatae laboriosam. Cupiditate error omnis possimus illo eaque ut voluptates numquam officia laudantium.
                            </p>
                            <p className='text-black'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis blanditiis saepe ad, consequatur consectetur a! Inventore nobis expedita iure debitis ipsum rem necessitatibus ut. Accusamus voluptate recusandae earum quo consequuntur cupiditate, deleniti magnam assumenda atque necessitatibus repellendus laborum sed voluptas dicta, officia laboriosam ex minima quaerat perspiciatis. Cumque aliquid asperiores ad. Temporibus omnis iusto ab architecto adipisci, reiciendis dolorum a impedit officia sapiente quasi ipsam explicabo debitis fugiat fuga placeat dolores similique cupiditate tenetur? Omnis veritatis vitae quae incidunt, consequatur id blanditiis ullam voluptate porro dolores voluptatum eveniet adipisci similique quam, magni officia repellat mollitia impedit quos ratione. Assumenda quod consectetur illo quam in, voluptates modi quae perspiciatis dolore temporibus hic quas cum explicabo rem magnam facere voluptatum numquam saepe at recusandae eum. Fugit doloremque ullam rerum, iusto distinctio ad error. Tempore vel esse deleniti aliquam, veniam rerum impedit possimus magni quisquam odit repellat sed laborum sunt nulla totam beatae! Ea fuga fugiat quaerat nisi quasi. Vero autem id veniam sint dicta natus! Vitae culpa consequuntur accusamus est voluptas maiores harum inventore ea et necessitatibus corrupti impedit voluptatibus reiciendis, dolore placeat dignissimos, error soluta nemo commodi consequatur beatae laboriosam. Cupiditate error omnis possimus illo eaque ut voluptates numquam officia laudantium.
                            </p>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-5 col-10 mx-auto">
                            {/* Contact form */}
                            <ContactForm heading={'Get More Details'} />

                            {/* Trending courses */}
                            <div className='p-3 border mt-3 rounded bg-skyBlue'>
                                <h4 className='fw-bold text-blue text-center mb-3'>Top Trending Courses</h4>
                                <div className='overflow-y-scroll' style={{ minHeight: '500px', maxHeight: "500px" }}>
                                    {/* Render course cards dynamically */}
                                    {courses.map(course => (
                                        <div className="card p-3 mb-3" key={course.id}>
                                            <div className="row">
                                                <div className="col-md-3 col-xl-2 mb-md-0 mb-3 text-md-start text-center">
                                                    <Image src={course.icon} alt={`${course.title}-logo`} width={50} height={50} />
                                                </div>
                                                <div className="col-md-9 col-xl-10 d-flex justify-content-md-start justify-content-center">
                                                    <h4 className='ms-2 text-blue align-self-center fw-bold text-md-start text-center'>{course.title}</h4>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='row g-2 p-3 bg-skyBlue mt-3 rounded'>
                                <div className="col-md-12 col-10 mx-auto">
                                    <Image src='/images/icons/advertisement.png' height={500} width={500} className='img-fluid' alt='advertisement-logo' />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default OverviewSec;
