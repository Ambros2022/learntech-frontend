"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./EmblaCarousel.module.css";

interface EmblaCarouselProps {
  children: React.ReactNode[];

  showDots?: boolean;
  showArrows?: boolean;

  slidesToShowDesktop?: number;
  slidesToShowTablet?: number;
  slidesToShowMobile?: number;

  autoplay?: boolean;
  autoplayDelay?: number;

  loop?: boolean;
  containerRole?: string;
}

export default function EmblaCarousel({
  children,
  showDots = true,
  showArrows = true,

  slidesToShowDesktop = 4,
  slidesToShowTablet = 3,
  slidesToShowMobile = 1,

  autoplay = true,
  autoplayDelay = 3000,

  loop = true,
  containerRole,
}: EmblaCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop, align: "start" },
    autoplay ? [Autoplay({ delay: autoplayDelay })] : []
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [visibleDots, setVisibleDots] = useState<number[]>([]);
const [slidesToShow, setSlidesToShow] = useState(slidesToShowDesktop);
useEffect(() => {
  const updateSlides = () => {
    const width = window.innerWidth;

    if (width <= 576) {
      setSlidesToShow(slidesToShowMobile);
    } else if (width <= 991) {
      setSlidesToShow(slidesToShowTablet);
    } else {
      setSlidesToShow(slidesToShowDesktop);
    }
  };

  updateSlides();
  window.addEventListener("resize", updateSlides);
  return () => window.removeEventListener("resize", updateSlides);
}, [
  slidesToShowDesktop,
  slidesToShowTablet,
  slidesToShowMobile,
]);
  useEffect(() => {
    if (!emblaApi) return;

    const MAX_DOTS = 4;
    const totalSlides = children.length;
    const dotCount = Math.min(MAX_DOTS, totalSlides);

    const updateSelectedDot = () => {
      const snap = emblaApi.selectedScrollSnap();
      const perDot = Math.ceil(totalSlides / dotCount);
      setSelectedIndex(Math.floor(snap / perDot));
    };

    const initializeDots = () => {
      const dots = Array.from({ length: dotCount }, (_, i) => i);
      setVisibleDots(dots);
      updateSelectedDot();
    };

    initializeDots();

    emblaApi.on("select", updateSelectedDot);
    emblaApi.on("reInit", initializeDots);

    return () => {
      emblaApi.off("select", updateSelectedDot);
      emblaApi.off("reInit", initializeDots);
    };
  }, [emblaApi, children.length]);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container} role={containerRole}>
          {children.map((child, idx) => (
            <div
              key={idx}
              className={styles.embla__slide}
              style={{
                flex: `0 0 calc(${100 / slidesToShow}%)`,
              }}
              role={containerRole === 'tablist' ? 'presentation' : undefined}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* ARROWS */}
      {showArrows && (
        <>
          <button className={styles.embla__prev} onClick={() => emblaApi?.scrollPrev()}>
            ‹
          </button>
          <button className={styles.embla__next} onClick={() => emblaApi?.scrollNext()}>
            ›
          </button>
        </>
      )}

      {/* DOTS */}
      {showDots && (
        <div className={styles.embla__dots}>
          {visibleDots.map((dot, idx) => (
            <button
              key={idx}
              className={`${styles.embla__dot} ${
                selectedIndex === idx ? styles.isSelected : ""
              }`}
              aria-selected={selectedIndex === idx}
              onClick={() => {
                const maxDots = 4;
                const perDot = Math.ceil(children.length / maxDots);
                emblaApi?.scrollTo(idx * perDot);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
