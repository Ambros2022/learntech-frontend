"use client";

import React, { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import styles from "./EmblaTabCarousal.module.css";

interface EmblaCarouselProps {
  children: React.ReactNode[];
  variant?: "default" | "tabs";

  showDots?: boolean;
  showArrows?: boolean;

  slidesToShowDesktop?: number;
  slidesToShowTablet?: number;
  slidesToShowMobile?: number;

  autoplay?: boolean;
  autoplayDelay?: number;
  loop?: boolean;
  slidePadding?: number;
}

export default function EmblaCarousel({
  children,
  variant = "default",

  showDots = true,
  showArrows = true,

  slidesToShowDesktop = 4,
  slidesToShowTablet = 3,
  slidesToShowMobile = 1,

  autoplay = true,
  autoplayDelay = 3000,
  loop = true,
  slidePadding,
}: EmblaCarouselProps) {
  const isTabs = variant === "tabs";

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: isTabs ? false : loop,
      align: "start",
      dragFree: isTabs,
    },
    autoplay && !isTabs ? [Autoplay({ delay: autoplayDelay })] : []
  );

  const [slidesToShow, setSlidesToShow] = useState(slidesToShowDesktop);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  /* ---------- RESPONSIVE ---------- */
  useEffect(() => {
    const updateSlides = () => {
      const w = window.innerWidth;
      if (w <= 576) setSlidesToShow(slidesToShowMobile);
      else if (w <= 991) setSlidesToShow(slidesToShowTablet);
      else setSlidesToShow(slidesToShowDesktop);
    };
    updateSlides();
    window.addEventListener("resize", updateSlides);
    return () => window.removeEventListener("resize", updateSlides);
  }, [slidesToShowDesktop, slidesToShowTablet, slidesToShowMobile]);

  /* ---------- RE-MEASURE WHEN SLIDE COUNT CHANGES ---------- */
  useEffect(() => {
    emblaApi?.reInit();
  }, [emblaApi, slidesToShow]);

  /* ---------- ARROWS STATE ---------- */
  useEffect(() => {
    if (!emblaApi) return;

    const update = () => {
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };

    update();
    emblaApi.on("select", update);
    emblaApi.on("reInit", update);

    return () => {
      emblaApi.off("select", update);
      emblaApi.off("reInit", update);
    };
  }, [emblaApi]);

  return (
    <div className={`${styles.embla} ${isTabs ? styles.tabsWrapper : ""}`}>
      {/* LEFT ARROW */}
      {showArrows && canScrollPrev && (
        <button
          className={`${styles.sideArrow} ${styles.left}`}
          onClick={() => emblaApi?.scrollPrev()}
          aria-label="Previous"
        >
          ←
        </button>
      )}

      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {children.map((child, idx) => (
            <div
              key={idx}
              className={styles.embla__slide}
              style={{
                flex: `0 0 ${100 / slidesToShow}%`,
                ...(slidePadding !== undefined ? { padding: `0 ${slidePadding}px` } : {}),
              }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT ARROW */}
      {showArrows && canScrollNext && (
        <button
          className={`${styles.sideArrow} ${styles.right}`}
          onClick={() => emblaApi?.scrollNext()}
          aria-label="Next"
        >
          →
        </button>
      )}
    </div>
  );
}
