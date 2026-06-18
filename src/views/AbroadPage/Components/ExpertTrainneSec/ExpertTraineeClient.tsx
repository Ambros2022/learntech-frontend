'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { format } from 'date-fns'

const IMG_BASE = (process.env.NEXT_PUBLIC_IMG_URL || '').replace(/\/+$/, '')

interface Trainer {
  id: number
  name: string
  location: string
  experience: string
  description: string
  image: string
  info: string
}

interface Props {
  trainers: Trainer[]
  countryName?: string
}

function TrainerCard({ trainer, onViewProfile }: { trainer: Trainer; onViewProfile: () => void }) {
  return (
    <div className="card py-3 hover-card h-100 justify-content-around" style={{ border: '1px solid #274896' }}>
      <div className="row d-flex px-3">
        <div className="col-4 mb-lg-0 mb-md-3 mb-0 text-center align-content-center">
          <Image
            src={`${IMG_BASE}/${trainer.image}`}
            width={80}
            height={80}
            alt={trainer.name}
            className="img-fluid rounded-circle"
            loading="lazy"
          />
        </div>
        <div className="col-8 align-content-center counsellorText">
          <h5 className="text-blue">{trainer.name}</h5>
          <h6 className="fw-light">{trainer.location}</h6>
        </div>
      </div>
      <hr className="text-blue" />
      <div className="px-3">
        <h6 className="fw-light">Counsellor Since</h6>
        <h6 className="fw-light">{format(new Date(trainer.experience), 'dd-MMM-yyyy')}</h6>
        <button className="btn mb-4 text-blue trainingBtn"><small>{trainer.description}</small></button><br />
        <button className="btn viewMoreCollegeBtn" onClick={onViewProfile}>View Profile</button>
      </div>
    </div>
  )
}

export default function ExpertTraineeClient({ trainers, countryName }: Props) {
  const [selected, setSelected] = useState<Trainer | null>(null)
  const dialogRef = useRef<HTMLDialogElement>(null)

  const handleView = (trainer: Trainer) => {
    setSelected(trainer)
    dialogRef.current?.showModal()
  }

  const handleClose = () => {
    dialogRef.current?.close()
  }

  return (
    <section className='bg-light py-md-5 py-3'>
      <div className="container">
        <h2 className='text-center fw-bold text-blue pb-3'>
          We have Educational Experts to Provide Guidance for Study in {countryName}
        </h2>
        <p className="text-black">
          The counselors at Learntech Edu Solutions Pvt. Ltd. spark inspiration, helping students navigate their academic paths with clarity and confidence. They are experts in creating strategies based on student&apos;s preferences and interests to provide guidance for smooth admission process to colleges/ universities in India or abroad.
        </p>
        <div className='py-3'>
          <div className="row d-flex flex-wrap g-2 align-items-stretch">
            {trainers.map(trainer => (
              <div className="col-12 col-md-4 col-lg-4 col-xl-3" key={trainer.id}>
                <TrainerCard trainer={trainer} onViewProfile={() => handleView(trainer)} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <dialog
        ref={dialogRef}
        style={{
          border: 'none',
          borderRadius: '10px',
          padding: '2rem',
          maxWidth: '900px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
        }}
      >
        <button
          className="btn-close position-absolute top-0 end-0 m-3"
          aria-label="Close"
          onClick={handleClose}
        />
        {selected && (
          <div className="d-flex flex-column align-items-center text-center">
            <Image
              src={`${IMG_BASE}/${selected.image}`}
              width={120}
              height={120}
              alt={selected.name}
              className="rounded-circle mb-3"
            />
            <h2 className='fw-bold text-blue mb-3'>{selected.name}</h2>
            <div className='text-black text-start w-100' dangerouslySetInnerHTML={{ __html: selected.info }} />
            <button className="btn btn-primary mt-3" onClick={handleClose}>Close</button>
          </div>
        )}
      </dialog>
    </section>
  )
}
