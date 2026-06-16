'use client'
import { useState } from 'react'
import { LazyConditionalModal } from 'src/app/components/ClientWrappers'

export default function WriteReviewButton() {
  const [show, setShow] = useState(false)
  return (
    <>
      <button onClick={() => setShow(true)} className='ms-2 btn reviewBtn'>
        Write a Review
      </button>
      {show && <LazyConditionalModal showModal={show} closeModal={() => setShow(false)} />}
    </>
  )
}
