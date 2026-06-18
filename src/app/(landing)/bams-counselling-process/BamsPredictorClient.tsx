'use client'

// Interactive client-side rank predictor component
import { useCallback, useState } from 'react'
import styles from './BamsPage.module.css'
import BamsPredictorModalClient from './BamsPredictorModalClient'

export default function BamsPredictorClient() {
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = useCallback(() => {
    setShowModal(true)
  }, [])

  return (
    <>
      <div className={styles.predictorBox} id='predictor'>
        <h2 className={styles.predictorTitle}>BAMS NEET-UG 2025 Rank Predictor</h2>
        <a className={styles.predictorLink} href='#'>
          Predict Your BAMS NEET-UG Rank Here.
        </a>

        <div className={styles.predictorInputs}>
          <input type='text' className='fw-bold text-center' placeholder='Out of 180 Questions' disabled />
          <input type='number' placeholder='No. of Questions Attempted' id='attempted' className='text-center' />
          <input type='number' placeholder='No. of Correct Answers' id='correct' className='text-center' />
        </div>

        <button className={styles.predictorButton} onClick={handleSubmit}>
          Submit
        </button>

        <p className={styles.predictorNote}>
          <strong>Note:</strong> The prediction will be based on the previous year&apos;s NEET-UG results and exam analysis.
        </p>
      </div>

      <BamsPredictorModalClient open={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
