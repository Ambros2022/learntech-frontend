import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import emailjs from 'emailjs-com';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios1 from 'src/configs/axios'

interface College {
    id: number;
    name: string;
    state: number;
    address: string;
    banner_image: string;
    established: string;
    avg_rating: number;
    college_type: string;
   
}

function CollegeFilterSection() {


    const [colleges, setColleges] = useState<College[]>([]);

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
    const [states, setStates] = useState<Option[]>([]);

    console.log(states, "states")

    


    const fetchStatesData = useCallback(async () => {
        try {
            const response = await axios1.get('api/website/states/get');
            if (response.data.status === 1) {
                const statesData = response.data.data.map((state: any) => ({
                    label: state.name,
                    value: state.name.toLowerCase().replace(' ', '_')
                }));
                setStates(statesData);
            } else {
                console.error('Failed to fetch states');
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }, []);

    

    //get all banners
    const getcollegedata = useCallback(async () => {
        try {
        const roleparams: any = {};
        roleparams['page'] = 1;
        roleparams['size'] = 10000;
        const response = await axios1.get('api/website/colleges/get', { params: roleparams });

        setColleges(response.data.data);
        } catch (err) {
        console.error(err);
        }
    }, []);

  


    useEffect(() => {
        fetchStatesData();
        getcollegedata();
        
    }, []);

    // const colleges = [
    //     {
    //         id: 1,
    //         name: 'CHRIST (DEEMED-TO-BE) UNIVERSITY',
    //         slug: 'CHRIST (DEEMED-TO-BE) UNIVERSITY',
    //         type: 'Private',
    //         rating: 4.5,
    //         location: 'Bangalore',
    //         state: 'karnataka',
    //         ownership: 'private',
    //         streams: ['management', 'education'],
    //         courses: ['bsc', 'mba'],
    //         courseType: 'bachelors',
    //         established: 1992,
    //         imageUrl: '/images/icons/filter-card.jpg'
    //     },
    //     {
    //         id: 2,
    //         name: 'R.V. COLLEGE OF ENGINEERING (RVCE)',
    //         slug: 'R.V. COLLEGE OF ENGINEERING (RVCE)',
    //         type: 'Public',
    //         rating: 4.0,
    //         location: 'Vidyaniketan',
    //         state: 'Bangalore',
    //         ownership: 'public',
    //         streams: ['science', 'arts'],
    //         courses: ['b_tech', 'ba'],
    //         courseType: 'masters',
    //         established: 1985,
    //         imageUrl: '/images/icons/filter-card.jpg'
    //     },
    //     {
    //         id: 3,
    //         name: 'YENEPOYA (DEEMED-TO-BE UNIVERSITY)',
    //         slug: 'YENEPOYA (DEEMED-TO-BE UNIVERSITY)',
    //         type: 'Public',
    //         rating: 4.0,
    //         location: 'Bangalore',
    //         state: 'karnataka',
    //         ownership: 'public',
    //         streams: ['science', 'arts'],
    //         courses: ['b_tech', 'ba'],
    //         courseType: 'masters',
    //         established: 1985,
    //         imageUrl: '/images/icons/filter-card.jpg'
    //     },
    //     {
    //         id: 4,
    //         name: 'MANIPAL ACADEMY OF HIGHER EDUCATION (MAHE)',
    //         slug: 'MANIPAL ACADEMY OF HIGHER EDUCATION (MAHE)',
    //         type: 'Public',
    //         rating: 4.0,
    //         location: 'Manipal',
    //         state: 'India',
    //         ownership: 'public',
    //         streams: ['science', 'arts'],
    //         courses: ['b_tech', 'ba'],
    //         courseType: 'masters',
    //         established: 1985,
    //         imageUrl: '/images/icons/filter-card.jpg'
    //     },
    //     {
    //         id: 5,
    //         name: "ST. JOSEPH'S UNIVERSITY",
    //         slug: "ST. JOSEPH'S UNIVERSITY",
    //         type: 'Public',
    //         rating: 4.0,
    //         location: 'Bangalore',
    //         state: 'India',
    //         ownership: 'public',
    //         streams: ['science', 'arts'],
    //         courses: ['b_tech', 'ba'],
    //         courseType: 'masters',
    //         established: 1985,
    //         imageUrl: '/images/icons/filter-card.jpg'
    //     },
    //     {
    //         id: 6,
    //         name: 'M.S RAMAIAH DENTAL COLLEGE (MSRDC)',
    //         slug: 'M.S RAMAIAH DENTAL COLLEGE (MSRDC)',
    //         type: 'Public',
    //         rating: 4.0,
    //         location: 'Bangalore',
    //         state: 'India',
    //         ownership: 'public',
    //         streams: ['science', 'arts'],
    //         courses: ['b_tech', 'ba'],
    //         courseType: 'masters',
    //         established: 1985,
    //         imageUrl: '/images/icons/filter-card.jpg'
    //     },
    //     {
    //         id: 7,
    //         name: 'M.S RAMAIAH DENTAL COLLEGE (MSRDC)',
    //         slug: 'M.S RAMAIAH DENTAL COLLEGE (MSRDC)',
    //         type: 'Public',
    //         rating: 4.0,
    //         location: 'Bangalore',
    //         state: 'India',
    //         ownership: 'public',
    //         streams: ['science', 'arts'],
    //         courses: ['b_tech', 'ba'],
    //         courseType: 'masters',
    //         established: 1985,
    //         imageUrl: '/images/icons/filter-card.jpg'
    //     },

    //     // Add more college objects as needed
    // ];


   
    const options: OptionGroup[] = [
        {
            id: 'state',
            label: 'States',
            options: states
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
                                <Image width={180} height={200} src={`${process.env.NEXT_PUBLIC_API_URI}/${imageUrl}`} className="img-fluid card-Image-top" alt="College Logo" style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="col-md-9 col-xl-9">
                                <div className="row">
                                    <div className="col-md-7 col-xl-7">
                                        <div className="card-title">
                                            <h6 className='fw-bold text-black my-2'>{name}</h6>
                                        </div>
                                        <div className="card-text text-black">
                                            <p className="m-0"><Image src='/images/icons/Location Icon.svg' width={20} height={20} alt='location-icon' /> {`${location}, ${state.name}`}</p>
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
                        name={college.name}
                        type={college.college_type}
                        rating={college.avg_rating}
                        location={college.address}
                        state={college.state}
                        established={college.established}
                        imageUrl={college.banner_image}
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

  
        </>

    );
}

export default CollegeFilterSection;