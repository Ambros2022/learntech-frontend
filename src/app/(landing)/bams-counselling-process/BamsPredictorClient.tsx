'use client'

import { useCallback, useState } from 'react'
import styles from './BamsPage.module.css'
import BamsPredictorModalClient from './BamsPredictorModalClient'

const STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jammu & Kashmir',
  'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra',
  'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha',
  'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Tripura',
  'Telangana', 'Uttarakhand', 'Uttar Pradesh', 'West Bengal',
  'Andaman & Nicobar', 'Chandigarh', 'Dadra and Nagar Haveli',
  'Daman & Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
]

export default function BamsPredictorClient() {
  const [showModal, setShowModal] = useState(false)

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    setShowModal(true)
  }, [])

  return (
    <>
      <div className={styles.predictorPanel} id='predictor'>
        <div className={styles.predictorGrid}>
          {/* Left: Copy */}
          <div className={styles.predictorCopy}>
            <h3>BAMS NEET UG 2026 Rank Predictor</h3>
            <div className={styles.predictorSubheader}>
              <span>Estimate Your Expected Rank for Admissions</span>
              <span className={styles.badgeRed}>Based on 180 Questions</span>
            </div>
            <p>
              Estimate your probable NEET UG 2026 rank based on your exam performance. The
              predictor gives you an early understanding of where you may stand among other
              aspirants and helps you evaluate your BAMS admission opportunities. A reliable rank
              estimate can help you prepare for the counselling process in advance. Use it to
              explore suitable colleges, prioritise your preferences, and build a well informed
              counselling strategy for AACCC and State AYUSH admissions.
            </p>
            <div className={styles.predictorNoteBox}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '2px' }}>
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
              <div>
                <strong>Note:</strong> This prediction is generated using previous years&apos; NEET UG data
                and exam trends. The final NEET UG 2026 rank may differ from the
                estimated result.
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className={styles.predictorForm}>
            <h4 className={styles.formTitle}>
              Calculate Your Expected NEET UG 2026 Rank Using the NTA Provisional Answer Key
            </h4>
            <form onSubmit={handleSubmit}>
              <div className={styles.predRow}>
                <div className={`${styles.predictorField} ${styles.field}`}>
                  <label>Questions Attempted <span className={styles.req}>*</span></label>
                  <input
                    type='number'
                    placeholder='e.g. 170'
                    id='attempted'
                    required
                  />
                </div>
                <div className={`${styles.predictorField} ${styles.field}`}>
                  <label>Correct Answers <span className={styles.req}>*</span></label>
                  <input
                    type='number'
                    placeholder='e.g. 150'
                    id='correct'
                    required
                  />
                </div>
              </div>

              <div style={{ marginTop: '14px' }}>
                <div className={`${styles.predictorField} ${styles.field}`}>
                  <label>Category <span className={styles.req}>*</span></label>
                  <select required>
                    <option value=''>Select category</option>
                    <option value='General'>General</option>
                    <option value='EWS'>EWS</option>
                    <option value='OBC-NCL'>OBC-NCL</option>
                    <option value='SC'>SC</option>
                    <option value='ST'>ST</option>
                    <option value='PWD'>PWD</option>
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '14px' }}>
                <div className={`${styles.predictorField} ${styles.field}`}>
                  <label>Domicile State <span className={styles.req}>*</span></label>
                  <select required>
                    <option value=''>Select State of Eligibility</option>
                    {STATES.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div style={{ marginTop: '14px' }}>
                <div className={`${styles.predictorField} ${styles.field}`}>
                  <label>Quota Preference <span className={styles.req}>*</span></label>
                  <select required>
                    <option value='AIQ'>All India quota (AACCC)</option>
                    <option value='State'>State quota (KEA/etc.)</option>
                    <option value='Management'>Management quota</option>
                  </select>
                </div>
              </div>

              <button
                type='submit'
                className={styles.predictorSubmit}
              >
                Predict My Score
              </button>
            </form>
          </div>
        </div>
      </div>

      <BamsPredictorModalClient open={showModal} onClose={() => setShowModal(false)} />
    </>
  )
}
