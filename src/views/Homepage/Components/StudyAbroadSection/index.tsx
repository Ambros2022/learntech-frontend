import React, { useCallback, useEffect, useState } from 'react'
import MainCarousel from 'src/@core/components/main-carousel'
import axios1 from 'src/configs/axios';
import Link from 'next/link';
import dynamic from 'next/dynamic';
const CollegeCard = dynamic(() => import('src/@core/components/college-card'), { ssr: false });

function StudyAbroadSection() {

  const [activeCountry, setActiveCountry] = useState<number | null>(null);

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
    return `${countryId === activeCountry ? 'active' : ''}`;
  };

  const [cardData, setCardData] = useState<any[]>([]);


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
      <CollegeCard key={card.id} college={card} />
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
        <div className="d-flex justify-content-center flex-wrap gap-3 studyAbroadNav py-3 rounded" >
          {renderButtons()}
        </div>
        <div id="studyCardContainer">
          <MainCarousel items={renderCards()} />
          <div className="d-flex justify-content-center pb-5">
            <Link href='/study-in-usa' className='btn viewMoreClgBtn'>Load More</Link>
          </div>
        </div>
      </div>
    </section >
  )
}

export default StudyAbroadSection
