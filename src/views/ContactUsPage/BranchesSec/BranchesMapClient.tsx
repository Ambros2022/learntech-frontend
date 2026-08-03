'use client'

import { useState } from 'react'

interface Branch {
  name: string
  address: string
  phone: string
  mapUrl: string
  addressUrl?: string
}

interface BranchesMapClientProps {
  branches: Branch[]
}

export default function BranchesMapClient({ branches }: BranchesMapClientProps) {
  const [selectedBranch, setSelectedBranch] = useState<Branch | null>(null)

  return (
    <div className="row pt-3">
      <div className="col-md-6">
        {branches.map((branch, index) => (
          <div
            key={index}
            className="card mb-3 p-3 bg-skyBlue"
            onClick={() => setSelectedBranch(branch)}
            style={{ cursor: 'pointer' }}
          >
            <div className="row">
              <div className="col-md-12 mx-auto col-xl-2 col-lg-2 text-center ">
                <img src='/images/icons/Locationicon.svg' width={70} height={70} alt="location icon" className='p-3 rounded clr-red mx-auto' />
              </div>
              <div className="col-md-12 text-md-center text-lg-start mt-md-2 col-xl-10 col-lg-10">
                <h3 className='text-blue fw-bold ms-lg-2 pt-1'>{branch.name}</h3>
              </div>
            </div>
            <div className="row ">
              <div className="col-lg-10 ms-auto">
                <h6 className="d-flex align-items-start ms-lg-2">
                  <i className="bi bi-geo-alt-fill text-blue me-1" style={{ marginTop: '2px' }}></i>
                  <button
                    type="button"
                    onClick={() => setSelectedBranch(branch)}
                    className="ms-1 btn btn-link p-0 text-start text-decoration-none"
                    style={{ color: 'inherit', fontSize: 'inherit', fontFamily: 'inherit' }}
                  >
                    <span className="fw-bold">Address: </span> {branch.address}
                  </button>
                </h6>
                <h6 className='d-flex align-items-center ms-lg-2'>
                  <i className='bi bi-telephone-fill text-blue me-1'></i>
                  <a href={`tel:${branch.phone.replace(/ /g, '')}`}>
                    {branch.phone}
                  </a>
                </h6>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="col-md-6">
        <div className='p-2 h-100 bg-blue rounded'>
          <iframe
            width="100%"
            height="100%"
            loading="lazy"
            allowFullScreen
            src={selectedBranch ? selectedBranch.mapUrl : branches[0].mapUrl}
            className='rounded'
            title={selectedBranch ? `${selectedBranch.name} map` : `${branches[0].name} map`}
          ></iframe>
        </div>
      </div>
    </div>
  )
}
