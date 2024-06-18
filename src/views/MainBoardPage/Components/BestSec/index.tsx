import React from 'react'
import ContactForm from 'src/@core/components/popup/ContactForm'

const BestSec = () => {
    return (
        <>
            <section className='bg-white pt-2 pb-5'>
                <div className="container">
                    <h2 className='text-center fw-bold text-blue'>Best Education Boards in India</h2>
                    <div className="row py-2">
                        <div className="col-lg-8 col-md-7">
                            <p className='text-black'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam inventore molestiae doloremque nihil earum rerum odio exercitationem accusantium nesciunt libero pariatur incidunt iste ipsa numquam, voluptatibus excepturi aut beatae atque vero eos doloribus fugiat. Quae id ad neque deserunt aliquid qui tempora accusantium blanditiis magnam ipsum. Quos cumque dignissimos, dolore natus, quisquam tenetur repudiandae, accusantium consequatur ducimus ipsum quas? Odio consequatur aliquam ipsum facilis suscipit, veniam ad quibusdam, officiis ab id illum voluptatum nostrum animi voluptas expedita saepe nisi debitis optio provident tempora numquam. Omnis maiores cum eligendi aperiam eos voluptate odio magni, repellat exercitationem, in optio adipisci similique mollitia.
                            </p>
                            <p className='text-black'>
                                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam inventore molestiae doloremque nihil earum rerum odio exercitationem accusantium nesciunt libero pariatur incidunt iste ipsa numquam.
                            </p>
                        </div>
                        <div className="col-lg-4 col-md-5 col-10 mx-auto">
                            <ContactForm heading={'Contact Us'} />
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default BestSec