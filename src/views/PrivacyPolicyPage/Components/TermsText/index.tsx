import React from 'react'

const TermsText = ({ data }) => {
    return (
        <>
            <section className='bg-white pt-2 pb-5'>
                <div className="container text-center bs-editor-text">
                    <h2 className='text-blue fw-bold w-100 mt-2'>Welcome to Learntech Edu Solutions Pvt. Ltd.
                    </h2>
                    <div dangerouslySetInnerHTML={{ __html: data?.top_description }} />
                </div>
            </section>
        </>
    )
}

export default TermsText