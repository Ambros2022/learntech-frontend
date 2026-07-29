interface DisclaimerTextProps {
  data?: {
    top_description?: string
  } | null
}

const TermsText = ({ data }: DisclaimerTextProps) => {
    return (
        <>
            <section className='bg-white pt-2 pb-5'>
                <div className="container text-center bs-editor-text">
                    <h2 className='text-blue fw-bold w-100 mt-2'>Disclaimer
                    </h2>
                    {/* <div className="d-flex justify-content-center w-100"> */}
                        <div
                          suppressHydrationWarning
                          dangerouslySetInnerHTML={{ __html: data?.top_description ?? '' }}
                        />
                    {/* </div> */}
                </div>
            </section>
        </>
    )
}

export default TermsText