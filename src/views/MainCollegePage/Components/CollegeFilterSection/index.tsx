import React, { useEffect, useRef, useState } from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import emailjs from 'emailjs-com';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

function CollegeFilterSection() {
    type Option = {
        label: string;
        value: string;
    };

    type OptionGroup = {
        id: string;
        label: string;
        options: Option[];
    };

    const [showScrollButton, setShowScrollButton] = useState(false);


    // const [showModal, setShowModal] = useState(false);
    // const handleShowModal = () => setShowModal(true);
    // const handleCloseModal = () => setShowModal(false);

    // const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    // const emailRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    // const validationSchema = Yup.object().shape({
    //     name: Yup.string().required('Name is required'),
    //     email: Yup.string().matches(emailRegExp, 'Email is not valid').required('Email is required'),
    //     phoneNumber: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Phone Number is required"),
    //     course: Yup.string().required('Course is required'),
    //     location: Yup.string().required('Location is required'),
    // });

    // const handleSubmit = async (values, { resetForm }) => {
    //     try {
    //         toast.loading('Processing'); // Display loading toast while processing
    //         setShowModal(false); // Assuming setShowModal is a state setter for hiding modal
    //         await emailjs.send("service_lrx8r36", "template_fsa8zp6", values, "8xItMn8QYmHOyfncY");
    //         toast.dismiss();
    //         toast.success('Message sent successfully!'); // Display success toast if email is sent successfully
    //         resetForm(); // Reset the form
    //         // Close the modal here if needed
    //     } catch (error) {
    //         toast.error('Failed!'); // Display error toast if sending email fails
    //         console.error('Error sending email:', error);
    //         alert("Error sending email. Please try again later."); // Fall back to alert if toast is not available
    //     }
    // };


    const colleges = [
        {
            id: 1,
            name: 'CHRIST (DEEMED-TO-BE) UNIVERSITY',
            slug: 'CHRIST (DEEMED-TO-BE) UNIVERSITY',
            type: 'Private',
            rating: 4.5,
            location: 'Bangalore',
            state: 'karnataka',
            ownership: 'private',
            streams: ['management', 'education'],
            courses: ['bsc', 'mba'],
            courseType: 'bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 2,
            name: 'R.V. COLLEGE OF ENGINEERING (RVCE)',
            slug: 'R.V. COLLEGE OF ENGINEERING (RVCE)',
            type: 'Public',
            rating: 4.0,
            location: 'Vidyaniketan',
            state: 'Bangalore',
            ownership: 'public',
            streams: ['science', 'arts'],
            courses: ['b_tech', 'ba'],
            courseType: 'masters',
            established: 1985,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 3,
            name: 'YENEPOYA (DEEMED-TO-BE UNIVERSITY)',
            slug: 'YENEPOYA (DEEMED-TO-BE UNIVERSITY)',
            type: 'Public',
            rating: 4.0,
            location: 'Bangalore',
            state: 'karnataka',
            ownership: 'public',
            streams: ['science', 'arts'],
            courses: ['b_tech', 'ba'],
            courseType: 'masters',
            established: 1985,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 4,
            name: 'MANIPAL ACADEMY OF HIGHER EDUCATION (MAHE)',
            slug: 'MANIPAL ACADEMY OF HIGHER EDUCATION (MAHE)',
            type: 'Public',
            rating: 4.0,
            location: 'Manipal',
            state: 'India',
            ownership: 'public',
            streams: ['science', 'arts'],
            courses: ['b_tech', 'ba'],
            courseType: 'masters',
            established: 1985,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 5,
            name: "ST. JOSEPH'S UNIVERSITY",
            slug: "ST. JOSEPH'S UNIVERSITY",
            type: 'Public',
            rating: 4.0,
            location: 'Bangalore',
            state: 'India',
            ownership: 'public',
            streams: ['science', 'arts'],
            courses: ['b_tech', 'ba'],
            courseType: 'masters',
            established: 1985,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 6,
            name: 'M.S RAMAIAH DENTAL COLLEGE (MSRDC)',
            slug: 'M.S RAMAIAH DENTAL COLLEGE (MSRDC)',
            type: 'Public',
            rating: 4.0,
            location: 'Bangalore',
            state: 'India',
            ownership: 'public',
            streams: ['science', 'arts'],
            courses: ['b_tech', 'ba'],
            courseType: 'masters',
            established: 1985,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 7,
            name: 'M.S RAMAIAH DENTAL COLLEGE (MSRDC)',
            slug: 'M.S RAMAIAH DENTAL COLLEGE (MSRDC)',
            type: 'Public',
            rating: 4.0,
            location: 'Bangalore',
            state: 'India',
            ownership: 'public',
            streams: ['science', 'arts'],
            courses: ['b_tech', 'ba'],
            courseType: 'masters',
            established: 1985,
            imageUrl: '/images/icons/filter-card.jpg'
        },

        // Add more college objects as needed
    ];


    // const stateOptions: Option[] = Array.from(new Set(colleges.map(college => college.state))).map(state => ({ label: state, value: state }));
    // const locationOptions: Option[] = Array.from(new Set(colleges.map(college => college.location))).map(location => ({ label: location, value: location }));
    // const ownershipOptions: Option[] = Array.from(new Set(colleges.map(college => college.ownership))).map(ownership => ({ label: ownership, value: ownership }));

    // const options: OptionGroup[] = [
    //     {
    //         id: 'state',
    //         label: 'States',
    //         options: options
    //     },
    //     {
    //         id: 'location',
    //         label: 'City',
    //         options: locationOptions
    //     },
    //     {
    //         id: 'ownership',
    //         label: 'Ownership',
    //         options: ownershipOptions
    //     },
    //     // Add other filter options...
    // ];

    const options: OptionGroup[] = [
        {
            id: 'state',
            label: 'States',
            options: [
                { label: 'Maharashtra', value: 'maharashtra' },
                { label: 'Tamil Nadu', value: 'tamil_nadu' },
                { label: 'Uttar Pradesh', value: 'uttar_pradesh' },
                { label: 'Karnataka', value: 'karnataka' }
            ]
        },
        {
            id: 'location',
            label: 'City',
            options: [
                { label: 'Pune', value: 'pune' },
                { label: 'Mumbai', value: 'mumbai' },
                { label: 'Delhi', value: 'delhi' },
                { label: 'Hyderabad', value: 'hyderabad' }
            ]
        },
        {
            id: 'ownership',
            label: 'Ownership',
            options: [
                { label: 'Private (2334)', value: 'private' },
                { label: 'Public (3265)', value: 'public' }
            ]
        },
        {
            id: 'streams',
            label: 'Streams',
            options: [
                { label: 'Management', value: 'management' },
                { label: 'Education', value: 'education' },
                { label: 'Arts', value: 'arts' },
                { label: 'Science', value: 'science' }
            ]
        },
        {
            id: 'courses',
            label: 'Courses',
            options: [
                { label: 'BSc (3233)', value: 'bsc' },
                { label: 'MBA (3233)', value: 'mba' },
                { label: 'B-Tech (3233)', value: 'b_tech' },
                { label: 'BA (3233)', value: 'ba' }
            ]
        },
        {
            id: 'courseType',
            label: 'Course Type',
            options: [
                { label: 'Bachelors (3233)', value: 'bachelors' },
                { label: 'Masters (3233)', value: 'masters' },
                { label: 'Diploma (3233)', value: 'diploma' },
                { label: 'Doctorate (3233)', value: 'doctorate' }
            ]
        }
    ];

    const [visibleCards, setVisibleCards] = useState(6);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, string[]>>({});


    const handleViewMore = () => {
        // Check if there are any filtered colleges left to display
        const filteredColleges = colleges.filter(college => {
            return Object.keys(selectedCheckboxes).every(groupId => {
                const selectedValues = selectedCheckboxes[groupId];
                if (!selectedValues || selectedValues.length === 0) {
                    return true;
                }

                if (Array.isArray(college[groupId])) {
                    return selectedValues.some(value => college[groupId].includes(value));
                }

                return selectedValues.includes(college[groupId]);
            });
        });

        console.log('Filtered Colleges:', filteredColleges);
        console.log('Visible Cards:', visibleCards);

        // If there are more filtered colleges to show, increment visibleCards
        if (visibleCards < filteredColleges.length) {
            setVisibleCards(prevVisibleCards => prevVisibleCards + 6);
        }

        console.log('Updated Visible Cards:', visibleCards);
    };




    const handleCheckboxChange = (groupId: string, value: string, isChecked: boolean) => {
        setSelectedCheckboxes(prevSelected => {
            const updatedSelected = { ...prevSelected };
            if (isChecked) {
                updatedSelected[groupId] = [...(updatedSelected[groupId] || []), value];
            } else {
                updatedSelected[groupId] = (updatedSelected[groupId] || []).filter(item => item !== value);
            }
            return updatedSelected;
        });
    };

    const removeSelectedCheckbox = (groupId: string, value: string) => {
        setSelectedCheckboxes(prevSelected => {
            const updatedSelected = { ...prevSelected };
            updatedSelected[groupId] = (updatedSelected[groupId] || []).filter(item => item !== value);
            return updatedSelected;
        });
    };


    const CollegeCard = ({ id, slug, name, type, rating, location, state, established, imageUrl }: any) => {

        return (
            <div className='col-md-12 mb-3'>
                <div className="mx-2 filterCardBorder">
                    <div className="p-2">
                        <div className="row">
                            <div className="col-md-3 col-xl-3 clgCardImg">
                                <Image width={180} height={200} src={imageUrl} className="img-fluid card-Image-top" alt="College Logo" style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="col-md-9 col-xl-9">
                                <div className="row">
                                    <div className="col-md-7 col-xl-7">
                                        <div className="card-title">
                                            <h6 className='fw-bold text-black my-2'>{name}</h6>
                                        </div>
                                        <div className="card-text text-black">
                                            <p className="m-0"><Image src='/images/icons/Location Icon.svg' width={20} height={20} alt='location-icon' /> {`${location}, ${state}`}</p>
                                            <p className="mb-3 "><Image src='/images/icons/calendor-filled.png' width={20} height={20} alt='calendor Icon' />  Est. Year {established}  <button className='ms-2 btn typeBtn'>{type}</button></p>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-xl-2 col-lg-2 text-end mb-md-0 mb-3">
                                        <button className='btn ratingBtn d-flex justify-content-center'><Image src='/images/icons/star-24.png' width={20} height={20} alt='star-icon' /><span className='align-content-center'>{rating}</span></button>
                                    </div>
                                    <div className="col-md-3 col-xl-3 col-lg-3 text-xl-end text-end d-xl-grid">
                                        <a className="activeBtn btn mb-3 d-flex justify-content-center"
                                        // onClick={handleShowModal}
                                        ><span className='align-content-center'>Apply Now</span></a>
                                        <Link href={`/college/${id}/${slug}`} className="mb-3 viewMoreBtn btn d-flex justify-content-center"><span className='align-content-center'>View More</span></Link>
                                    </div>
                                </div>


                                {/* <button className='btn bg-warning text-white' style={{ minWidth: '50px', minHeight: '20px' }}>{rating}</button> */}

                                <div className='d-flex gap-2 btns'>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }



    function CollegeList({ selectedCheckboxes }: { selectedCheckboxes: Record<string, string[]> }) {
        const filteredColleges = colleges.filter(college => {
            return Object.keys(selectedCheckboxes).every(groupId => {
                const selectedValues = selectedCheckboxes[groupId];
                if (!selectedValues || selectedValues.length === 0) {
                    return true;
                }

                if (Array.isArray(college[groupId])) {
                    return selectedValues.some(value => college[groupId].includes(value));
                }

                return selectedValues.includes(college[groupId]);
            });
        });

        if (filteredColleges.length === 0) {
            return (
                <div className="text-center my-5">
                    <p>No colleges found for the selected filters.</p>
                </div>
            );
        }

        if (filteredColleges.length > 0 && filteredColleges.slice(0, visibleCards).length === 0) {
            return (
                <div className="text-center my-5">
                    <p>No more colleges to display.</p>
                </div>
            );
        }


        return (
            <div className='row'>
                {filteredColleges.slice(0, visibleCards).map(college => (
                    <CollegeCard
                        key={college.id}
                        id={college.id}
                        slug={college.name}
                        name={college.name}
                        type={college.type}
                        rating={college.rating}
                        location={college.location}
                        state={college.state}
                        established={college.established}
                        imageUrl={college.imageUrl}
                    />
                ))}
            </div>
        );
    }

    useEffect(() => {
        collegeFilterRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [visibleCards, selectedCheckboxes]);

    const [accordionOpen, setAccordionOpen] = useState<string | null>(null);

    const toggleAccordion = (groupId: string) => {
        setAccordionOpen(groupId === accordionOpen ? null : groupId);
    };

    const collegeFilterRef = useRef<HTMLDivElement>(null); // Specify the type of ref


    const StateButtons: React.FC<{ options: Option[]; setSelectedCheckboxes: React.Dispatch<React.SetStateAction<Record<string, string[]>>> }> = ({ options, setSelectedCheckboxes }) => {
        const handleStateButtonClick = (state: string) => {
            setSelectedCheckboxes({ state: [state] });
            if (collegeFilterRef.current) {
                collegeFilterRef.current.scrollIntoView({ behavior: 'smooth' });
            }
        };

        return (
            <div className="row bg-skyBlue gx-0 p-3 my-3 mx-2">
                <div className="col-12">
                    <h6 className="text-black">Filters By Location</h6>
                    <div className="btn-group d-flex flex-wrap">
                        {options.map((option, index) => (
                            <button key={index} className="btn text-center rounded m-1 p-2 filterItemBtn" onClick={() => handleStateButtonClick(option.value)}>
                                {option.label}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    const MultiSelectOptions: React.FC<{ options: OptionGroup[] }> = ({ options }) => {
        return (
            <div>
                {options.map((optionGroup, index) => (
                    <div key={index} className="row bg-white gx-0 p-3 my-3 mx-2">
                        <div className="col-10">
                            <a className='text-blue'
                            >{optionGroup.label}</a>
                        </div>
                        <div className="col-2 text-center">
                            <a
                                className='text-blue'
                                onClick={() => toggleAccordion(optionGroup.id)}
                                aria-expanded={accordionOpen === optionGroup.id}
                                aria-controls={`${optionGroup.id}Collapse`}
                            >
                                &#11205;
                            </a>
                        </div>
                        <div className={`collapse ${accordionOpen === optionGroup.id ? 'show' : ''}`} id={`${optionGroup.id}Collapse`}>
                            <div className='my-3'>
                                <hr></hr>
                                <input type="search" placeholder="Search" className="icon-rtl form-control" id={`${optionGroup.id}Search`} aria-describedby={`${optionGroup.id}SearchHelp`} />
                                {optionGroup.options.map((option, index) => (
                                    <div key={index} className="form-check text-black searchCheckBox my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={option.value}
                                            id={`${optionGroup.id}-${index}`}
                                            onChange={(e) =>
                                                handleCheckboxChange(
                                                    optionGroup.id,
                                                    option.value,
                                                    e.target.checked
                                                )
                                            }
                                            checked={selectedCheckboxes[optionGroup.id]?.includes(option.value)}
                                        />
                                        <label className="form-check-label" htmlFor={`${optionGroup.id}-${index}`}>
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
                }
            </div >
        );
    };

    const SelectedFilters: React.FC<{ selectedCheckboxes: Record<string, string[]> }> = ({ selectedCheckboxes }) => {
        const getLabelForValue = (groupId: string, value: string) => {
            const group = options.find(optionGroup => optionGroup.id === groupId);
            const option = group?.options.find(option => option.value === value);
            return option ? option.label : value;
        };

        return (
            <div className="row bg-skyBlue gx-0 px-3 py-2 mb-3 mx-2">
                <div className="col-12">
                    <h6 className='text-black'>Selected Filters</h6>
                </div>
                <div className='my-2'>
                    {Object.entries(selectedCheckboxes).map(([groupId, values]) => (
                        values.map(value => (
                            <div key={value} className="btn d-inline-flex align-items-center filterItemBtn rounded m-1 p-2">
                                <span className="me-2">{getLabelForValue(groupId, value)}</span>
                                <button
                                    className="btn-close"
                                    onClick={() => removeSelectedCheckbox(groupId, value)}
                                />
                            </div>
                        ))
                    ))}
                </div>
            </div>
        );
    };

    // Calculate filtered colleges outside of handleViewMore
    const filteredColleges = colleges.filter(college => {
        return Object.keys(selectedCheckboxes).every(groupId => {
            const selectedValues = selectedCheckboxes[groupId];
            if (!selectedValues || selectedValues.length === 0) {
                return true;
            }

            if (Array.isArray(college[groupId])) {
                return selectedValues.some(value => college[groupId].includes(value));
            }

            return selectedValues.includes(college[groupId]);
        });
    });


    return (
        <>
            <div ref={collegeFilterRef} className='bg-white py-3'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 mb-3 mb-lg-0 bg-skyBlue">
                            <MultiSelectOptions options={options} />
                        </div>
                        <div className="col-lg-9">
                            <SelectedFilters selectedCheckboxes={selectedCheckboxes} />
                            <CollegeList selectedCheckboxes={selectedCheckboxes} />
                            {filteredColleges.length > visibleCards && (
                                <div className="text-center my-3">
                                    <button className="btn viewMoreCardBtn"
                                        onClick={handleViewMore}
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                            <StateButtons options={options.find(option => option.id === 'state')?.options || []} setSelectedCheckboxes={setSelectedCheckboxes} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal

            <Modal className="modal fade px-3" id="exampleModal" show={showModal} onHide={handleCloseModal}>
                <div className="modal-content">
                    <div className="searchForm">
                        <h5 className="pb-3 fw-bold text-center text-blue">Let’s build a better future for you</h5>
                        <Formik
                            initialValues={{
                                name: '',
                                email: '',
                                phoneNumber: '',
                                course: '',
                                location: '',
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                            resetForm
                        >
                            <Form>
                                <div className="mb-3">
                                    <Field type="text" name="name" placeholder="Enter Name" className="form-control" />
                                    <ErrorMessage name="name" component="div" className="error text-danger" />
                                </div>
                                <div className="mb-3">
                                    <Field type="email" name="email" placeholder="Enter Email" className="form-control" />
                                    <ErrorMessage name="email" component="div" className="error text-danger" />
                                </div>
                                <div className="mb-3">
                                    <Field type="text" name="phoneNumber" placeholder="Enter Phone Number" className="form-control" />
                                    <ErrorMessage name="phoneNumber" component="div" className="error text-danger" />
                                </div>
                                <div className="mb-3">
                                    <Field type="text" name="course" placeholder="Enter Course" className="form-control" />
                                    <ErrorMessage name="course" component="div" className="error text-danger" />
                                </div>
                                <div className="mb-3">
                                    <Field type="text" name="location" placeholder="Enter Location" className="form-control" />
                                    <ErrorMessage name="location" component="div" className="error text-danger" />
                                </div>

                                <div className="d-grid">
                                    <button type="submit" className="submitBtn btn-xl btn-block btn submitBtn">Submit</button>
                                </div>
                            </Form>
                        </Formik>
                    </div>
                </div>
            </Modal> */}
        </>

    );
}

export default CollegeFilterSection;