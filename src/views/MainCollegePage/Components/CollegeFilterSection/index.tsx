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
import useIsMountedRef from 'src/hooks/useIsMountedRef';


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
    const isMountedRef = useIsMountedRef();

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
    const [streams, setStreams] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);

    // console.log(states, "states")


    const getstreamdata = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/website/stream/get');
            if (response.data.status === 1) {
                const streamData = response.data.data.map((stream: any) => ({
                    label: stream.name,
                    value: stream.id.toString()
                }));
                setStreams(streamData);
            } else {
                console.error('Failed to fetch states');
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }, [isMountedRef]);


    const getcoursesdata = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/website/allcourses/get');
            if (response.data.status === 1) {
                const courseData = response.data.data.map((course: any) => ({
                    label: course.slug,
                    value: course.id.toString()
                }));
                setCourses(courseData);
            } else {
                console.error('Failed to fetch states');
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }, [isMountedRef]);


    const fetchStatesData = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('api/website/states/get');
            if (response.data.status === 1) {
                const statesData = response.data.data.map((state: any) => ({
                    label: state.name,
                    value: state.id.toString()
                }));
                setStates(statesData);
            } else {
                console.error('Failed to fetch states');
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }, [isMountedRef]);

    //get all banners
    const getcollegedata = useCallback(async (stateId?: number, courseId?: number) => {
        try {
            const params: any = {
                page: 1,
                size: 10000
            };
            if (stateId) params['state_id'] = `[${stateId}]`;
            if (courseId) params['course_id'] = `[${courseId}]`;
            const response = await axios1.get('api/website/colleges/get', { params });
            setColleges(response.data.data);
        } catch (err) {
            console.error(err);
        }
    }, [isMountedRef]);

    useEffect(() => {
        fetchStatesData();
        getcollegedata();
        getstreamdata();
        getcoursesdata();

    }, []);


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
                { label: 'Public', value: 'Public' },
                { label: 'Deemed', value: 'Deemed' },
                { label: 'Private', value: 'Private' },
                { label: 'Government', value: 'Government' }
            ]
        },
        {
            id: 'streams',
            label: 'Streams',
            options: streams
        },
        {
            id: 'courses',
            label: 'Courses',
            options: courses
        },
        {
            id: 'courseType',
            label: 'Course Type',
            options: [
                { label: 'UG', value: 'UG' },
                { label: 'PG', value: 'PG' },
                { label: 'Diploma', value: 'Diploma' },
                { label: 'Doctorate', value: 'Doctorate' },
                { label: 'Default', value: 'Default' }
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

        // console.log('Filtered Colleges:', filteredColleges);
        // console.log('Visible Cards:', visibleCards);

        // If there are more filtered colleges to show, increment visibleCards
        if (visibleCards < filteredColleges.length) {
            setVisibleCards(prevVisibleCards => prevVisibleCards + 6);
        }
        // console.log('Updated Visible Cards:', visibleCards);
    };

    const handleCheckboxChange = async (groupId: string, value: string, isChecked: boolean) => {
        const collegeFiltersSection = document.getElementById('collegeFiltersSection');
        if (collegeFiltersSection) {
            collegeFiltersSection.scrollIntoView({ behavior: 'smooth' });
        }

        setSelectedCheckboxes((prevSelected) => {
            const updatedSelected = { ...prevSelected };
            if (isChecked) {
                updatedSelected[groupId] = [value]; // Set the selected state(s)
            } else {
                delete updatedSelected[groupId]; // Remove the selected state(s)
            }

            // Make API call here with selected state ID
            const selectedStateId = parseInt(value); // Assuming the value is the state ID
            getcollegedata(selectedStateId); // Pass the selected state ID to the API call function
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
                                <Image width={180} height={200} src={`${process.env.NEXT_PUBLIC_IMG_URL}/${imageUrl}`} className="img-fluid card-Image-top" alt="College Logo" style={{ objectFit: 'cover' }} />
                            </div>
                            <div className="col-md-9 col-xl-9">
                                <div className="row">
                                    <div className="col-md-7 col-xl-7">
                                        <div className="card-title">
                                            <h6 className='fw-bold text-black my-2'>{name}</h6>
                                        </div>
                                        <div className="card-text text-black">
                                            <p className="mb-2 text-truncate"><Image src='/images/icons/Location Icon.svg' width={20} height={20} alt='location-icon' /> {`${location}, ${state.name}`}</p>
                                            <p className="mb-3 "><Image src='/images/icons/calendor-filled.png' width={20} height={20} alt='calendor Icon' />  Est. Year {established}  <button className='ms-2 btn typeBtn'>{type}</button></p>
                                        </div>
                                    </div>
                                    <div className="col-md-2 col-xl-2 col-lg-2 text-end mb-md-0 mb-3">
                                        {rating && (
                                            <button className='btn ratingBtn d-flex justify-content-center'>
                                                <Image
                                                    src='/images/icons/star-24.png'
                                                    width={20}
                                                    height={20}
                                                    alt='star-icon'
                                                />
                                                <span className='align-content-center'>{rating}</span>
                                            </button>
                                        )}
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
            if (!selectedCheckboxes.stateId || selectedCheckboxes.stateId.length === 0) {
                return true; // Return true if no state is selected
            }
            return selectedCheckboxes.stateId.includes(college.state.toString().toLowerCase().replace(' ', '_')); // Convert to string and filter based on selected state(s)
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

    // useEffect(() => {
    //     const collegeFilterSection = document.getElementById('collegeFilterSection');
    //     if (collegeFilterSection) {
    //         collegeFilterSection.scrollIntoView({ behavior: 'smooth' });
    //     }
    // }, [visibleCards, selectedCheckboxes]);

    const [accordionOpen, setAccordionOpen] = useState<string | null>(null);

    const toggleAccordion = (groupId: string) => {
        setAccordionOpen(groupId === accordionOpen ? null : groupId);
    };



    const StateButtons: React.FC<{ options: Option[]; setSelectedCheckboxes: React.Dispatch<React.SetStateAction<Record<string, string[]>>> }> = ({ options, setSelectedCheckboxes }) => {
        const handleStateButtonClick = (state: string) => {
            setSelectedCheckboxes({ state: [state] });
            const collegeFiltersSection = document.getElementById('collegeFiltersSection');
            if (collegeFiltersSection) {
                collegeFiltersSection.scrollIntoView({ behavior: 'smooth' });
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
                    <div key={index} className="row bg-white gx-0 p-3 my-3 mx-2"
                        onClick={() => toggleAccordion(optionGroup.id)}
                        aria-expanded={accordionOpen === optionGroup.id}
                        aria-controls={`${optionGroup.id}Collapse`}
                    >
                        <div className="col-10">
                            <a className='text-blue'
                            >{optionGroup.label}</a>
                        </div>
                        <div className="col-2 text-center">
                            <a
                                className='text-blue'
                                style={{ cursor: "pointer" }}
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
            <div id="collegeFiltersSection" className="row bg-skyBlue gx-0 px-3 py-2 mb-3 mx-2">
                <div className="col-12">
                    <h6 className='text-black'>Selected Filters</h6>
                </div>
                <div className='my-2'>
                    {Object.entries(selectedCheckboxes).map(([groupId, values]) => (
                        values.map(value => (
                            <div key={value} className="btn d-inline-flex align-items-center filterItemBtn rounded m-1 p-2">
                                <span className="me-2">{getLabelForValue(groupId, value)}</span>
                                <button
                                    className="btn"
                                    onClick={() => removeSelectedCheckbox(groupId, value)}
                                ><Image src="/images/icons/close-icon-white.png" width={18} height={18} alt='close-white' /></button>
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
            <div className='bg-white py-3'>
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

