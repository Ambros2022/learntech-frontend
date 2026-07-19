'use client'

import { useState } from 'react'
import Image from 'next/image'

interface JobLocation {
  jobpositionslocation: { name: string }
}

interface Job {
  name: string
  job_description: string
  exp_required: string
  total_positions: number
  jobpositionlocation: JobLocation[]
}

export default function CurrentOpeningSec({ jobData }: { jobData: Job[] }) {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null)

  const handleClose = () => setSelectedJob(null)

  const handleApply = () => {
    document.getElementById('contactForm')?.scrollIntoView({ behavior: 'smooth' })
    handleClose()
  }

  return (
    <section className="bg-white py-3 innercourse_height" id="currentOpeningSection">
      <div className="container">
        <h2 className="fw-bold text-center text-blue pb-3">Current Openings</h2>
        <div className="row">
          {jobData.map((job, index) => (
            <div className="col-lg-6" key={index}>
              <div
                className="card mb-3 bg-skyBlue border-0"
                onClick={() => setSelectedJob(job)}
                style={{ cursor: 'pointer' }}
              >
                <div className="row g-0">
                  <div className="col-md-4 d-flex justify-content-center">
                    <Image src="/images/icons/suitcase-lg-fill.svg" className="mt-md-0 mt-3 align-self-center img-style" width={100} height={100} alt="job" />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body text-md-start text-center">
                      <h5 className="card-title fw-bold text-black text-truncate">{job.name}</h5>
                      {job.jobpositionlocation?.length > 0 && (
                        <div className="d-flex align-items-center">
                          <Image src="/images/icons/Locationicon.svg" width={20} height={20} alt="location" className="me-2" />
                          <span className="card-text text-truncate">
                            {job.jobpositionlocation.map(l => l.jobpositionslocation.name).join(', ')}
                          </span>
                        </div>
                      )}
                      <p className="card-text text-truncate mt-3 d-flex align-items-center gap-2">
                        <Image src="/images/icons/calendor-filled.png" width={20} height={20} alt="experience" />
                        {job.exp_required}
                      </p>
                      <p className="card-text d-flex align-items-center gap-2">
                        <Image src="/images/icons/chair-icon.png" width={20} height={20} alt="positions" />
                        {job.total_positions}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Native modal — no react-bootstrap */}
      {selectedJob && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          onClick={handleClose}
        >
          <div
            className="modal-dialog modal-xl modal-dialog-scrollable"
            onClick={e => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-blue">{selectedJob.name}</h5>
                <button type="button" className="btn-close" onClick={handleClose} aria-label="Close" />
              </div>
              <div className="modal-body bs-editor-text">
                <div className="text-black" dangerouslySetInnerHTML={{ __html: selectedJob.job_description }} />
                <button className="btn viewMoreClgBtn mt-3" onClick={handleApply}>Apply Now</button>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={handleClose}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
