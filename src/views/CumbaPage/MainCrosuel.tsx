"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Head from "next/head";

const data = [
  {
    title: 'Strategic Decision-Making Mastery',
    desc: `Online MBA Chandigarh University equips graduates with advanced analytical skills for
                                    complex business decisions through data-driven case studies and simulations.​
                                    Students learn to evaluate risks, and formulate strategies that drive organizational
                                    success. Real-world projects enhance problem-solving abilities, enabling confident
                                    leadership in high-stakes environments.​ Enrolling in a CU online MBA admission
                                    prepares professionals to navigate uncertainties and seize growth opportunities
                                    effectively.​`,
    img: '/images/cumba/planning.webp'
  },
  {
    title: 'Leadership and Managerial Proficiency',
    desc: `Being one of the best online MBA in India the program develops essential leadership
                                    qualities, including team motivation, ethical decision-making, and conflict
                                    resolution.​ Interactive sessions and Harvard faculty modules build emotional
                                    intelligence and visionary thinking for senior roles.​ CU online MBA graduates
                                    emerge as influential managers capable of inspiring diverse teams toward shared
                                    goals.​`,
    img: '/images/cumba/closeup.webp'
  },
  {
    title: 'Global Business Acumen',
    desc: `Learners gain a comprehensive understanding of international markets, cross-cultural
                                    dynamics, and globalization impacts.​ Chandigarh University online programs provide
                                    exposure to global case studies and Harvard collaborations broadens perspectives for
                                    multinational operations.​ Graduates are equipped to handle international trade,
                                    supply chains, and diverse regulatory environments confidently.`,
    img: '/images/cumba/chess.webp'
  },
  {
    title: 'Career Advancement and Employability',
    desc: `The curriculum aligns with industry demands, boosting employability through
                                    specialized skills and placement support.​ Graduates from CU online MBA secure roles
                                    in top firms like Deloitte, Amazon, and Infosys with higher salary potential and
                                    promotions.​ Networking opportunities and certifications from Harvard enhance
                                    professional profiles significantly.​ Strong ROI comes from rapid career growth,
                                    leadership positions, and entrepreneurial readiness.​ Chandigarh University distance
                                    MBA alumni achieve sustained success in management, finance, marketing, and
                                    operations sectors.`,
    img: '/images/cumba/businnespeople.webp'
  }
]

const MainCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "start",
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  return (
    <>
      <Head>
        <link rel="stylesheet" href="/css/carosuel.css" />
      </Head>

      <div className="mba-feature-carousel outcomes-container">
        <div className="embla" ref={emblaRef}>
          <div className="embla__container">
            {data.map((item, i) => (
              <div className="embla__slide" key={i}>
                <div className="outcome-card">
                  <div
                    className="bg-layer"
                    style={{ backgroundImage: `url(${item.img})` }}
                  ></div>
                  <div className="news-overlay"></div>

                  <div className="outcome-content">
                    <h3 className="outcome-title">{item.title}</h3>
                    <p>{item.desc}</p>
                    <div className="hover-line"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CUSTOM ARROWS */}
        <button className="custom-arrow custom-left-arrow" onClick={scrollPrev}>
          ❮
        </button>

        <button className="custom-arrow custom-right-arrow" onClick={scrollNext}>
          ❯
        </button>
      </div>
    </>
  );
};

export default MainCarousel;
