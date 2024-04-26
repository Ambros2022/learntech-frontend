import React, { useState } from 'react'
import Image from 'next/image';
import { Config } from 'src/configs/mainconfig';


function CollegeFilterSection() {


    const ImgUrl = Config.IMG_URL;

    type Option = {
        label: string;
        value: string;
    };

    type OptionGroup = {
        id: string;
        label: string;
        options: Option[];
    };
    const options: OptionGroup[] = [
        {
            id: 'collegeStates',
            label: 'States',
            options: [
                { label: 'Maharashtra', value: 'maharashtra' },
                { label: 'Tamil Nadu', value: 'tamil_nadu' },
                { label: 'Uttar Pradesh', value: 'uttar_pradesh' },
                { label: 'Karnataka', value: 'karnataka' }
            ]
        },
        {
            id: 'collegeCity',
            label: 'City',
            options: [
                { label: 'Pune', value: 'pune' },
                { label: 'Mumbai', value: 'mumbai' },
                { label: 'Delhi', value: 'delhi' },
                { label: 'Hyderabad', value: 'hyderabad' }
            ]
        },
        {
            id: 'collegeOwnership',
            label: 'Ownership',
            options: [
                { label: 'Private (2334)', value: 'private' },
                { label: 'Public (3265)', value: 'public' }
            ]
        },
        {
            id: 'collegeStreams',
            label: 'Streams',
            options: [
                { label: 'Management', value: 'management' },
                { label: 'Education', value: 'education' },
                { label: 'Arts', value: 'arts' },
                { label: 'Science', value: 'science' }
            ]
        },
        {
            id: 'collegeCourses',
            label: 'Courses',
            options: [
                { label: 'BSc (3233)', value: 'bsc' },
                { label: 'MBA (3233)', value: 'mba' },
                { label: 'B-Tech (3233)', value: 'b_tech' },
                { label: 'BA (3233)', value: 'ba' }
            ]
        },
        {
            id: 'collegeCourseType',
            label: 'Course Type',
            options: [
                { label: 'Bachelors (3233)', value: 'bachelors' },
                { label: 'Masters (3233)', value: 'masters' },
                { label: 'Diploma (3233)', value: 'diploma' },
                { label: 'Doctorate (3233)', value: 'doctorate' }
            ]
        }
    ];
    const colleges = [
        {
            id: 1,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 2,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 3,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 4,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 5,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 6,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 7,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 8,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 9,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 10,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 11,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 12,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 13,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 14,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 15,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 16,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 17,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
        {
            id: 18,
            name: 'Yenepoya Medical College',
            type: 'Private',
            rating: 4.5,
            location: 'Mangalore',
            state: 'Karnataka',
            ownership: 'Private',
            streams: ['Management', 'Education'],
            courses: ['BSc', 'MBA'],
            courseType: 'Bachelors',
            established: 1992,
            imageUrl: '/images/icons/filter-card.jpg'
        },
    ];

    const [visibleCards, setVisibleCards] = useState(6);

    const handleViewMore = () => {
        setVisibleCards(prevVisibleCards => prevVisibleCards + 6);
    };
    // State to store selected checkboxes
    const [selectedCheckboxes, setSelectedCheckboxes] = useState<Record<string, string[]>>({});

    // Check if any filters are selected
    const areFiltersSelected = Object.keys(selectedCheckboxes).some(group => selectedCheckboxes[group].length > 0);

    // Function to handle checkbox change
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

    // Function to remove a selected checkbox
    const removeSelectedCheckbox = (groupId: string, value: string) => {
        setSelectedCheckboxes(prevSelected => {
            const updatedSelected = { ...prevSelected };
            updatedSelected[groupId] = (updatedSelected[groupId] || []).filter(item => item !== value);
            return updatedSelected;
        });
    };

    function CollegeCard({ name, type, rating, location, state, established, imageUrl }) {
        return (
            <div className='mb-3'>
                <div className="row p-2 filterCardBorder">
                    <div className="col-md-4 text-md-start text-center col-lg-3 col-xl-3 col-12">
                        <img src={ImgUrl + imageUrl} alt="College Logo" />
                    </div>
                    <div className="col-md-8 col-lg-9 col-xl-9 col-12">
                        <div className="row d-flex justify-content-md-between justify-content-center filterCardText">
                            <div className="col-12 mb-2 col-md-6 col-xl-8 text-md-start text-center">
                                <h6 className='fw-bold text-black my-2'>{name}</h6>
                            </div>
                            <div className='col-12 mb-2 col-md-6 col-xl-4 d-flex gap-2 justify-content-md-end justify-content-center clgfilterCardBtn'>
                                <button className='btn bg-skyBlue text-blue fw-bold'>{type}</button>
                                <button className='btn bg-warning text-white'>{rating}</button>
                            </div>
                            <div className="col-12 mb-2 text-black text-md-start text-center">
                                <p className="m-0">{`${location}, ${state}`}</p>
                            </div>
                            <div className='col-12 mb-2 text-black text-md-start text-center'>
                                <p className="m-0">Est. Year {established}</p>
                            </div>
                            <div className="col-12 mb-2">
                                <div className="d-flex justify-content-md-end justify-content-center gap-2">
                                    <a href="#" className="activeBtn btn">Apply Now</a>
                                    <a href="#" className="viewMoreBtn btn">View More</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    function CollegeList({ selectedCheckboxes }: { selectedCheckboxes: Record<string, string[]> }) {
        // Filter the colleges based on selected checkboxes
        const filteredColleges = colleges.filter(college => {
            // Check if at least one filter matches for any option group
            return Object.keys(selectedCheckboxes).some(groupId => {
                const selectedValues = selectedCheckboxes[groupId];
                // If no values are selected for the current option group, return true to include the college
                if (!selectedValues || selectedValues.length === 0) {
                    return true;
                }
                // Check if the college has at least one of the selected values for the current option group
                return selectedValues.some(selectedValue => {
                    // Check if the college has the selected value
                    return options.find(optionGroup => optionGroup.id === groupId)?.options.find(option => option.value === selectedValue)?.value === college[groupId];
                });
            });
        });

        return (
            <div>
                {filteredColleges.map(college => (
                    <CollegeCard
                        key={college.id}
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


    // MultiSelectOptions component to display filter options
    const MultiSelectOptions: React.FC<{ options: OptionGroup[] }> = ({ options }) => {
        return (
            <div>
                {options.map((optionGroup, index) => (
                    <div key={index} className="row bg-white gx-0 p-3 my-3 mx-2">
                        <div className="col-10">
                            <a className='text-blue'>{optionGroup.label}</a>
                        </div>
                        <div className="col-2 text-center">
                            <a data-bs-toggle="collapse" href={`#${optionGroup.id}Collapse`} role="button" aria-expanded="false" aria-controls={`${optionGroup.id}Collapse`}>
                                &#11205;
                            </a>
                        </div>
                        <div className="collapse bg-white" id={`${optionGroup.id}Collapse`}>
                            <div className='my-3'>
                                <hr></hr>
                                <input type="search" placeholder="Search" className="icon-rtl form-control" id={`${optionGroup.id}Search`} aria-describedby={`${optionGroup.id}SearchHelp`} />
                                {optionGroup.options.map((option, index) => (
                                    <div key={index} className="form-check text-black searchCheckBox my-2">
                                        <input
                                            className="form-check-input"
                                            type="checkbox"
                                            value={option.value}
                                            id={`${optionGroup.id}-${option.value.replace(/\s+/g, '-')}`}
                                            checked={selectedCheckboxes[optionGroup.id]?.includes(option.value)}
                                            onChange={(e) => handleCheckboxChange(optionGroup.id, option.value, e.target.checked)}
                                        />
                                        <label className="form-check-label" htmlFor={`${optionGroup.id}-${option.value.replace(/\s+/g, '-')}`}>
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

    // Function to render selected checkboxes
    const renderSelectedCheckboxes = () => {
        const selectedOptions: JSX.Element[] = [];
        for (const groupId in selectedCheckboxes) {
            selectedCheckboxes[groupId].forEach((value, index) => {
                selectedOptions.push(
                    <button
                        key={`${groupId}-${value}`}
                        className="btn selectedFilterBtn me-2 mb-2"
                        onClick={() => removeSelectedCheckbox(groupId, value)}
                    >
                        {options.find(optionGroup => optionGroup.id === groupId)?.options.find(option => option.value === value)?.label}
                        <span className="ms-2">&times;</span>
                    </button>
                );
            });
        }
        return selectedOptions;
    };

    return (
        <>
            <section className="bg-white CollegeFilterSection">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-lg-3 col-5 pb-5 bg-skyBlue collegeSearchFilter">
                            <div>
                                <MultiSelectOptions options={options} />
                            </div>
                        </div>
                        <div className="col-7 col-md-8 col-lg-9 collegeFilterCards">
                            <div className='bg-skyBlue pb-3 text-black alert filterSelectedSec'>
                                {areFiltersSelected ? (
                                    // Render selected checkboxes if filters are selected
                                    renderSelectedCheckboxes()
                                ) : (
                                    // Render "No Filters Selected" if no filters are selected
                                    <p className='m-0'>No Filters Selected</p>
                                )}
                            </div>
                            <div className='filterCardCon container-fluid'>
                                <CollegeList selectedCheckboxes={selectedCheckboxes} />
                                {visibleCards < colleges.length && (
                                    <div className="text-center mt-3">
                                        <button className="btn viewMoreBtn" onClick={handleViewMore}>Load More</button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default CollegeFilterSection

