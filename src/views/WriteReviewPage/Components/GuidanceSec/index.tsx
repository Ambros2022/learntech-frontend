import React from 'react'

function GuidanceSec() {
  return (
    <>
      <section className='guidanceSec bg-skyBlue'>
        <div className="container py-5">
          <div className='p-3 rounded guidanceCon'>
            <h4 className='text-blue fw-bold'>Guidance</h4>
            <h6 className='text-black fw-bold'>We will reject your review if:</h6>
            <ul className='text-black'>
              <li><small>It is too short and vague, without any useful information</small></li>
              <li><small>You have copied text from anywhere on the internet</small></li>
              <li><small>You have used junk characters, SMS language, slang or abusive words in your review</small></li>
            </ul>
          </div>
        </div>
      </section>
    </>
  )
}

export default GuidanceSec
