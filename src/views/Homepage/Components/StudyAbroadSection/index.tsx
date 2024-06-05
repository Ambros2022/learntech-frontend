import React, { useCallback, useEffect, useState } from 'react'
import MainCarousel from 'src/@core/components/main-carousel'
import axios1 from 'src/configs/axios';
import GlobalEnquiryForm from 'src/@core/components/popup/GlobalPopupEnquiry';
import Link from 'next/link';

function StudyAbroadSection() {

  const [activeCountry, setActiveCountry] = useState<number | null>(null);

  // const [StudyAbroadItems] = useState(usaItems);

  interface Country {
    id: number;
    name: string;
  }

  const [countries, setCountries] = useState<Country[]>([]);


  const getcountries = useCallback(async () => {
    try {
      // const roleparams = { page: 1, size: 10,};
      const roleparams = { page: 1, size: 10, india: false };
      const response = await axios1.get('api/website/country/get', { params: roleparams });
      const countriesData = response.data.data;
      setCountries(countriesData);

      // Automatically set the first country as the active one if countries exist
      if (countriesData.length > 0) {
        setActiveCountry(countriesData[0].id);
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {

    getcountries();
  }, [getcountries]);


  // Function to handle navbar item click
  const handleNavItemClick = (countryId: number) => {
    setActiveCountry(countryId);
  };

  // Function to get link class
  const getLinkClass = (countryId: number) => {
    return `mb-3 ${countryId === activeCountry ? 'active' : ''}`;
  };

  const [cardData, setCardData] = useState<any[]>([]);


  // Function to fetch card data from the backend API
  // const fetchCardData = useCallback(async () => {
  //   try {
  //     const response = await axios1.get('api/website/colleges/get');
  //     const responseData = response.data.data;
  //     setCardData(responseData);
  //   } catch (error) {
  //     console.error('Error fetching card data:', error);
  //   }
  // }, []);

  // useEffect to fetch card data when component mounts



  const fetchCardData = useCallback(async () => {
    try {
      // Construct params object with country_id if activeCountry is not null
      const params = activeCountry ? { country_id: activeCountry } : {};
      const response = await axios1.get('api/website/colleges/get', { params });
      const responseData = response.data.data;
      setCardData(responseData);
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  }, [activeCountry]);

  useEffect(() => {
    fetchCardData();
  }, [fetchCardData]);


  const renderCards = () => {
    return cardData.map((card) => (
      <div key={card.id} className="mx-xl-4 mx-lg-2 mx-md-2 mx-5  card featuredClgCard mb-5 h-100">
        <img src={`${process.env.NEXT_PUBLIC_IMG_URL}/${card.banner_image}`} width={300} height={200} className="card-img-top" alt={card.title} />
        <div className="card-body">
          <h5 className="card-title text-blue text-truncate" style={{ fontSize: '18px' }}>{card.name}</h5>
          <p className="card-text text-truncate">
            <img width={17} height={17} className="me-2 card-text-image" src="/images/icons/Location 2.svg" alt="location-icon" />
            {card.address}
          </p>
          <div className="d-flex justify-content-between">
            <GlobalEnquiryForm className="applyNowButton btn" />
            <Link href="/colleges" className="btn">View More</Link>
          </div>
        </div>
      </div>
    ));
  };

  // Render the buttons dynamically based on fetched countries
  const renderButtons = () => {
    return countries.map((country) => (
      <a
        key={country.id}
        className={getLinkClass(country.id)}
        id={country.id.toString()}
        type="button"
        aria-selected={activeCountry === country.id}
        onClick={() => handleNavItemClick(country.id)}
      >
        {country.name}
      </a>
    ));
  };

  return (
    <section className="StudyAbroadCon bg-white" id="animation7" data-aos="fade-up">
      <div className="container pt-5 position-relative">
        <h2 className="fw-bold text-blue text-center">Study Abroad</h2>
        <p className="text-black">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        <div className="d-flex justify-content-center flex-wrap studyAbroadNav py-3 rounded" >
          {renderButtons()}
        </div>
        <div id="studyCardContainer">
          <MainCarousel items={renderCards()} />
        </div>
      </div>
    </section >
  )
}

export default StudyAbroadSection
