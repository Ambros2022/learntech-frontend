import React from 'react'

const StudentsText = ({ data }) => {
    return (
        <>
            <section className='bg-white'>
                <div className="container pt-2 pb-5">
                    <h1 className='fw-bold text-blue'>For Students</h1>
                    <div dangerouslySetInnerHTML={{ __html: data?.top_description }} />
                </div>
            </section>
        </>
    )
}

export default StudentsText