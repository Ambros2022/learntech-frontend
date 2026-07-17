'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { LazySignupForm as SignupForm, LazySignInForm as SignInForm } from 'src/app/components/ClientWrappers'
import styles from './ConditionalModal.module.css'

interface Props {
    showModal: boolean
    closeModal: () => void
}

export default function ConditionalModal({ showModal, closeModal }: Props) {
    const router = useRouter()
    const modalRef = useRef<HTMLDivElement>(null)

    // If already logged in, skip modal and go straight to write-review.
    useEffect(() => {
        if (typeof window !== 'undefined' && localStorage.getItem('UserData')) {
            closeModal()
            router.push('/write-review')
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // Close on outside click.
    useEffect(() => {
        if (!showModal) return
        const handler = (e: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
                closeModal()
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [showModal, closeModal])

    if (!showModal) return null

    return (
        <div
            className={`modal ${styles.fadeModal} show`}
            id='exampleModal'
            aria-labelledby='exampleModalLabel'
            aria-modal='true'
            role='dialog'
            style={{ display: 'block' }}
        >
            <div className={`modal-dialog position-relative modal-dialog-centered modal-lg modal-md ${styles.wSmForm}`}>
                <div className='modal-content' ref={modalRef}>
                    <h4 className='z-3 position-absolute text-white'>Please Sign In to write a review</h4>
                    <div className='row gx-0'>
                        <div className={`col-md-6 ${styles.formImgCon} ${styles.formImage} d-none d-md-flex justify-content-center px-0 mx-0 py-5`}>
                            <div className='align-content-center'>
                                <Image src='/images/icons/form-img.png' width={300} height={200} alt='Sign in illustration' />
                            </div>
                        </div>
                        <div className={`col-md-6 ${styles.signForm}`}>
                            <div className='text-end pt-3 pe-3'>
                                <button type='button' className='btn-close' aria-label='Close' onClick={closeModal} />
                            </div>
                            <div className='d-flex justify-content-center gap-4 pt-2 mb-1' role='tablist'>
                                <a href='#' className='nav-link' id='pills-SignUp-tab' data-bs-toggle='pill' data-bs-target='#pills-SignUp' role='tab' aria-controls='pills-SignUp' aria-selected='false'>
                                    Sign Up
                                </a>
                                <a href='#' className='nav-link active' id='pills-SignIn-tab' data-bs-toggle='pill' data-bs-target='#pills-SignIn' role='tab' aria-controls='pills-SignIn' aria-selected='true'>
                                    Log In
                                </a>
                            </div>
                            <div className='tab-content' id='pills-tabContent'>
                                <div className='tab-pane fade' id='pills-SignUp' role='tabpanel' aria-labelledby='pills-SignUp-tab'>
                                    <SignupForm closeModal={closeModal} />
                                </div>
                                <div className='tab-pane fade show active' id='pills-SignIn' role='tabpanel' aria-labelledby='pills-SignIn-tab'>
                                    <SignInForm closeModal={closeModal} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
