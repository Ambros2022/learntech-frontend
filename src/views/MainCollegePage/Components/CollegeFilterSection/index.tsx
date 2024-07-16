import React, { useCallback, useEffect, useRef, useState } from 'react'
import * as Yup from 'yup';
import { debounce } from 'lodash'; // Import debounce function from lodash library
import { Formik, Form, Field, ErrorMessage } from 'formik';
// import emailjs from 'emailjs-com';
import { Modal } from 'react-bootstrap';
import { toast } from 'react-hot-toast'
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import axios1 from 'src/configs/axios'
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import { useAuth } from 'src/hooks/useAuth';


interface City {
    id: number;
    name: string;
}

interface College {
    id: number;
    name: string;
    state: number;
    address: string;
    banner_image: string;
    established: string;
    avg_rating: number;
    college_type: string;
    course_type: string;
    slug: string;

}

const CollegeCard = ({ id, slug, name, type, rating, location, state, established, imageUrl }: any) => {
    return (
        <div className='col-md-10 col-lg-12 col-10 mx-auto mb-3 '>
            <div className="mx-2 filterCardBorder hover-card bg-skyBlue">
                <div className="p-2">
                    <div className="row d-flex">
                        <div className="align-content-start col-md-12 col-lg-4 col-xl-3 clgCardImg">
                            <Image width={500} height={500} src={`${process.env.NEXT_PUBLIC_IMG_URL}/${imageUrl}`} className="img-fluid rounded card-Image-top me-auto" alt="College Logo" style={{ objectFit: 'cover' }} />
                        </div>
                        <div className="col-md-12 col-lg-8 col-xl-9">
                            <div className="row pt-3">
                                <div className="col-md-12 col-lg-12 col-xl-6">
                                    <div className="card-title">
                                        <h5 className='fw-bold text-black mb-3'>{name}</h5>
                                    </div>
                                    <div className="card-text text-black">
                                        <p className="mb-3 text-truncate"><Image src='/images/icons/Locationicon.svg' width={20} height={20} alt='location-icon ' /> {`${location}`}</p>
                                        <p className="mb-3"><Image src='/images/icons/calendor-filled.png' width={20} height={20} alt='calendor Icon' />  Est. Year {established}  <button className='ms-2 mt-md-0 mt-3 btn typeBtn'>{type}</button></p>
                                    </div>
                                </div>
                                <div className="col-md-12 col-xl-3 mb-lg-3 mb-3 mb-md-0 col-lg-12 text-end">
                                    {rating && (
                                        <div className="d-flex gap-2 justify-content-start justify-content-md-start">

                                            <i className={`bi bi-star-fill ${rating >= 1 ? "text-warning" : "text-gray"} `}></i>
                                            <i className={`bi bi-star-fill ${rating >= 2 ? "text-warning" : "text-gray"} `}></i>
                                            <i className={`bi bi-star-fill ${rating >= 3 ? "text-warning" : "text-gray"} `}></i>
                                            <i className={`bi bi-star-fill ${rating >= 4 ? "text-warning" : "text-gray"} `}></i>
                                            <i className={`bi bi-star-fill ${rating >= 5 ? "text-warning" : "text-gray"} `}></i>

                                            {/* <h6 className='mb-0 text-white align-self-center'>{rating}/5 Review</h6> */}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-md-3 mt-lg-0 col-md-10 col-10 col-xl-3 col-lg-12 text-xl-end text-end flex-md-row flex-column d-flex flex-lg-row flex-xl-column gap-3 mb-3">
                                    <GlobalEnquiryForm className="activeBtn  btn d-flex justify-content-center" />

                                    <Link href={`/college/${id}/${slug}`} className=" viewMoreBtn btn d-flex justify-content-center"><span className='align-content-center'>View More</span></Link>
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
function CollegeFilterSection({ data }) {


    const router = useRouter();
    const { city_id } = router.query;
    // let state_id = 92;
    // console.log(state_id, "state_id");
    const [colleges, setColleges] = useState<College[]>([]);
    const isMountedRef = useIsMountedRef();
    const [loading, setLoading] = useState<boolean>(false)
    const [visibleCards, setVisibleCards] = useState(6);
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, string[]>>({});


    const [states, setStates] = useState<Option[]>([]);
    const [streams, setStreams] = useState<any[]>([]);
    const [courses, setCourses] = useState<any[]>([]);
    const [promoban, setPromoban] = useState<any[]>([]);

    const [selectedOptions, setSelectedOptions] = useState({});
    const [selectedStateIds, setSelectedStateIds] = useState<string[]>([]);
    const [selectedCityIds, setSelectedCityIds] = useState<string[]>([]);

    const [accordionOpen, setAccordionOpen] = useState<{ [groupId: string]: boolean }>({
        state: true,
        city: true,
        streams: true,
        courses: true,
        ownership: true,
        courseType: true
    });
    const [checkboxState, setCheckboxState] = useState<{ [groupId: string]: { [value: string]: boolean } }>({});

    const { stateId, setStateId, cityId, setCityId } = useAuth();


    type Option = {
        label: string;
        value: string;
        cities?: Option[];
    };

    type OptionGroup = {
        id: string;
        label: string;
        options: Option[];
    };


    const getPromobanner = useCallback(async () => {
        try {
            const response = await axios1.get('api/website/banner/get?promo_banner=All_college_page');
            if (isMountedRef.current) {

                setPromoban(response.data.data);
            }
        } catch (error) {
            console.error('Failed to fetch trending courses:', error);
        }
    }, [isMountedRef]);

    const getstreamdata = useCallback(async () => {
        try {
            const roleparams: any = {};
            roleparams['page'] = 1;
            roleparams['size'] = 10000;
            const response = await axios1.get('/api/website/stream/get');
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
            const response = await axios1.get('api/website/generalcourse/get');
            if (response.data.status === 1) {
                const courseData = response.data.data.map((course: any) => ({
                    label: course.short_name,
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
            const response = await axios1.get('api/website/states/get');
            if (response.data.status === 1) {
                const statesData = response.data.data.map((state: any) => ({
                    label: state.name,
                    value: state.id.toString(),
                    cities: state.city.map((city: any) => ({
                        label: city.name,
                        value: city.id.toString()
                    }))
                }));
                setStates(statesData);
            } else {
                console.error('Failed to fetch states');
            }
        } catch (error) {
            console.error('Error fetching states:', error);
        }
    }, [isMountedRef]);

    const getcollegedata = useCallback(async (stateIds?: string[], courseIds?: string[], streamIds?: string[], ownership?: string[], courseType?: string[], cityIds?: string[]) => {
        try {
            const params: any = {
                page: 1,
                size: 10000
            };


            if (stateIds && stateIds.length > 0) params['state_id'] = `[${stateIds.join(',')}]`;
            if (cityIds && cityIds.length > 0) params['city_id'] = `[${cityIds.join(',')}]`;
            if (courseIds && courseIds.length > 0) params['general_course_id'] = `[${courseIds.join(',')}]`;
            if (streamIds && streamIds.length > 0) params['stream_id'] = `[${streamIds.join(',')}]`;
            if (ownership) params['college_type'] = ownership;
            if (courseType && courseType.length > 0) params['course_type'] = JSON.stringify(courseType);
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
        getPromobanner();

    }, []);




    const options: OptionGroup[] = [
        { id: 'state', label: 'States', options: states },
        { id: 'city', label: 'Cities', options: states.flatMap(state => state.cities) },
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
        { id: 'streams', label: 'Streams', options: streams },
        { id: 'courses', label: 'Courses', options: courses },


        {
            id: 'courseType',
            label: 'Course Type',
            options: [
                { label: 'UG', value: 'UG' },
                { label: 'PG', value: 'PG' },
                { label: 'Diploma', value: 'Diploma' },
                { label: 'Doctorate', value: 'Doctorate' },
                // { label: 'Default', value: 'Default' },
            ],
        },
    ];



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



        // If there are more filtered colleges to show, increment visibleCards
        if (visibleCards < filteredColleges.length) {
            setVisibleCards(prevVisibleCards => prevVisibleCards + 6);
        }

    };



    // Define a debounced version of handleCheckboxChange
    const debouncedHandleCheckboxChange = debounce((groupId: string, value: any, isChecked: boolean) => {

        console.log("debounce", groupId, value, isChecked);
        const collegeFiltersSection = document.getElementById('collegeFiltersSection');
        if (collegeFiltersSection) {
            collegeFiltersSection.scrollIntoView({ behavior: 'smooth' });
        }

        setSelectedCheckboxes(prevSelected => {
            const updatedSelected = { ...prevSelected };
            if (isChecked) {
                updatedSelected[groupId] = [...(updatedSelected[groupId] || []), value];
            } else {
                updatedSelected[groupId] = (updatedSelected[groupId] || []).filter(item => item !== value);
            }

            // Extract selected filter values
            const { state: selectedStateIds = [], courses: selectedCourseIds = [], streams: selectedStreamIds = [],
                ownership: selectedOwnership = [], courseType: selectedCourseType = [], city: selectedCityIds = [] } = updatedSelected;



            // Perform API call with selected filter values
            getcollegedata(selectedStateIds, selectedCourseIds, selectedStreamIds, selectedOwnership, selectedCourseType, selectedCityIds);

            console.log(updatedSelected, "updatedSelected");
            return updatedSelected;
        });
    }, 300); // Debounce for 300 milliseconds


    const handleCheckboxChange = (groupId, value, isChecked) => {

        console.log("handleCheckboxChange", groupId, value, isChecked);
        debouncedHandleCheckboxChange(groupId, value, isChecked);
        setCheckboxState(prevState => ({
            ...prevState,
            [groupId]: {
                ...prevState[groupId],
                [value]: isChecked
            }
        }));

        if (groupId === 'state') {
            const updatedStateIds = isChecked
                ? [...selectedStateIds, value]
                : selectedStateIds.filter(id => id !== value);

            // handleFilterChange(updatedStateIds.join(','), selectedCityIds.join(','), true);
        }

        // if (groupId === 'city') {
        //     const updatedCityIds = isChecked
        //         ? [...selectedCityIds, value]
        //         : selectedCityIds.filter(id => id !== value);

        //     handleFilterChange(selectedStateIds.join(','), updatedCityIds.join(','), false);
        // }
    };

    useEffect(() => {
        if (stateId) {
            let text = stateId.toString();
            debouncedHandleCheckboxChange("state", text, true);
            setCheckboxState(prevState => ({
                ...prevState,
                ["state"]: {
                    ...prevState["state"],
                    //@ts-ignore
                    [text]: true
                }
            }));
            setStateId(null)
        }
        console.log("checkboxState", checkboxState);
        if (cityId) {
            let text = cityId.toString();
            debouncedHandleCheckboxChange("city", text, true);
            setCheckboxState(prevState => ({
                ...prevState,
                ["city"]: {
                    ...prevState["city"],
                    //@ts-ignore
                    [text]: true
                }
            }));
            setCityId(null)
        }
    }, [router, router.isReady]);

    const removeSelectedCheckbox = (groupId: string, value: string) => {
        console.log("removeSelectedCheckbox", groupId, value)
        debouncedHandleCheckboxChange(groupId, value, false);
        setCheckboxState(prevState => ({
            ...prevState,
            [groupId]: {
                ...prevState[groupId],
                [value]: false
            }
        }));

        setSelectedCheckboxes(prevSelected => {
            const updatedSelected = { ...prevSelected };
            updatedSelected[groupId] = (updatedSelected[groupId] || []).filter(item => item !== value);

            // Make API call here with updated selected state ID
            const selectedStateIds = updatedSelected['state'] || [];
            const selectedCourseIds = updatedSelected['courses'] || [];
            const selectedStreamIds = updatedSelected['streams'] || [];
            getcollegedata(selectedStateIds, selectedCourseIds, selectedStreamIds);


            return updatedSelected;
        });
    };





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
                        slug={college.slug}
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


    const toggleAccordion = (groupId: string) => {
        setAccordionOpen(prevState => ({
            ...prevState,
            [groupId]: !prevState[groupId]
        }));

    };


    const StateButtons: React.FC<{
        options: Option[];
        setSelectedCheckboxes: React.Dispatch<React.SetStateAction<Record<string, string[]>>>;
        selectedCheckboxes: Record<string, string[]>;
    }> =
        ({ options, setSelectedCheckboxes, selectedCheckboxes }) => {


            const handleStateButtonClick = (state: string) => {

                window.scrollTo({ top: 650, behavior: 'smooth' });
                setCheckboxState(prevState => ({
                    ...prevState,
                    ["state"]: {
                        ...prevState["state"],
                        [state]: false
                    }
                }));
                setSelectedCheckboxes(prevSelected => {
                    const stateSelections = prevSelected.state || [];
                    const updatedSelections = stateSelections.includes(state)
                        ? stateSelections.filter(s => s !== state)
                        : [...stateSelections, state];

                    const updatedSelected = { ...prevSelected, state: updatedSelections };
                    // Call the API with the selected state IDs
                    getcollegedata(updatedSelected.state);
                    return updatedSelected;
                });
            };

            return (
                <div className="row bg-skyBlue gx-0 p-3 my-3 mx-2 rounded">
                    <div className="col-12">
                        <h6 className="text-black">Filters By Location</h6>
                        <div className="d-flex flex-wrap">
                            {options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`btn text-center rounded m-1 p-2 filterItemBtn  ${selectedCheckboxes.state?.includes(option.value) ? 'active' : ''}`}
                                    onClick={() => handleStateButtonClick(option.value)}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            );
        };

    const MultiSelectOptions: React.FC<{ options: OptionGroup[] }> = ({ options }) => {
        const [searchTexts, setSearchTexts] = useState<Record<string, string>>({});
        const handleSearchChange = (groupId: string, searchText: string) => {
            setSearchTexts(prev => ({ ...prev, [groupId]: searchText }));
        };

        const filteredOptions = (optionGroup: OptionGroup) => {
            const searchText = searchTexts[optionGroup.id] || '';
            return optionGroup.options.filter(option =>
                option.label.toLowerCase().includes(searchText.toLowerCase())
            );
        };


        return (
            <div>
                {options.map((optionGroup, index) => (
                    <div key={index} style={{ cursor: 'pointer' }} className="row bg-white gx-0 p-3 my-3 mx-2">

                        <div className="col-10" onClick={() => toggleAccordion(optionGroup.id)}>
                            <h5 className='text-blue'>
                                {optionGroup.label}
                            </h5>
                        </div>
                        <div className="col-2 text-center " onClick={() => toggleAccordion(optionGroup.id)}>
                            <h5 className='text-blue'>
                                {accordionOpen[optionGroup.id] ? '▲' : '▼'}
                            </h5>

                        </div>
                        <div className={`showingCards collapse ${accordionOpen[optionGroup.id] ? 'show' : ''}`} id={`${optionGroup.id}Collapse`}>
                            <div className='my-3 options-container'>
                                <hr />
                                <input
                                    type="search"
                                    placeholder="Search"
                                    className="icon-rtl form-control"
                                    value={searchTexts[optionGroup.id] || ''}
                                    onChange={(e) => handleSearchChange(optionGroup.id, e.target.value)}
                                    id={`${optionGroup.id}Search`}
                                    aria-describedby={`${optionGroup.id}SearchHelp`}
                                />
                                {filteredOptions(optionGroup).map((option, index) => (
                                    <div key={index} className="form-check text-black searchCheckBox my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={option.value}
                                            id={`${optionGroup.id}-${index}`}
                                            onChange={(e) => handleCheckboxChange(optionGroup.id, option.value, e.target.checked)}
                                            checked={checkboxState[optionGroup.id]?.[option.value]}
                                        />

                                        <label className="form-check-label" htmlFor={`${optionGroup.id}-${index}`}>
                                            {option.label}
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };



    const SelectedFilters: React.FC<{ selectedCheckboxes: Record<string, string[]> }> = ({ selectedCheckboxes }) => {
        const getLabelForValue = (groupId: string, value: string) => {
            const group = options.find(optionGroup => optionGroup.id === groupId);
            const option = group?.options.find(option => option.value === value);
            return option ? option.label : value;
        };

        // Check if there are any selected filters
        const hasSelectedFilters = Object.keys(selectedCheckboxes).some(groupId => selectedCheckboxes[groupId].length > 0);

        // Render the filter card only if there are selected filters
        return (
            <>
                {hasSelectedFilters && (
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
                )}
            </>
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

    const PromoAddBanner = ({ url }) => {

        return (
            <>
                <section className='bg-skyBlue addBanner rounded'>
                    <div className="container p-5">
                        <div className="card">
                            <div className="row g-0">
                                <div className="col-md-4 addImgClg position-relative">
                                    <Image src={`${process.env.NEXT_PUBLIC_IMG_URL}/${url}`} width={200} height={200} className="img-fluid rounded-start" alt="clg-img" />
                                    <div className="position-absolute iconsPosition">
                                        {/* <div className="d-flex flex-column">
                                            <h6 className='btn bg-gray text-white text-center d-flex'><i className="bi bi-info-circle"></i></h6>
                                            <h6 className='btn bg-gray text-white text-center d-flex'><i className="bi bi-x-circle"></i></h6>
                                        </div> */}
                                    </div>
                                    <h2 className='position-absolute text-white' style={{ backgroundColor: 'rgba(0,0,0,0.3)', borderRadius: '10px', padding: '10px', zIndex: '3000', top: '50%', left: '50%', color: "white" }}>Ad</h2>
                                </div>
                                <div className="col-md-8">
                                    <div className="card-body" style={{ zIndex: '200' }}>
                                        <h5 className="card-text">PES University</h5>
                                        <h3 className="card-title fw-bold">B.Tech 2024 - Admissions Open</h3>
                                        <Link href='/colleges' className='btn openAddBtn'>Open <i className="bi bi-chevron-right"></i></Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>

        );
    }


    return (
        <>
            <div className='bg-white py-3'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-3 col-xl-3 col-md-4 mb-3 mb-lg-0 bg-skyBlue">
                            <h5 className='text-blue fw-bold text-md-start text-center px-3 pt-3'>Found {data.totalItems} Colleges</h5>
                            <MultiSelectOptions options={options} />
                        </div>
                        <div className="col-lg-9 col-xl-9 col-md-8">
                            <SelectedFilters selectedCheckboxes={selectedCheckboxes} />
                            <CollegeList selectedCheckboxes={selectedCheckboxes} />
                            {filteredColleges.length > visibleCards && (
                                <div className="text-center my-3">
                                    <button className="btn viewMoreCollegeBtn"
                                        onClick={handleViewMore}
                                    >
                                        Load More
                                    </button>
                                </div>
                            )}
                            {promoban.length > 0 && <PromoAddBanner url={promoban[0].image} />}
                            <StateButtons
                                options={options.find(option => option.id === 'state')?.options || []}
                                setSelectedCheckboxes={setSelectedCheckboxes}
                                selectedCheckboxes={selectedCheckboxes}
                            />

                        </div>
                    </div>
                </div>
            </div>


        </>

    );
}

export default CollegeFilterSection;