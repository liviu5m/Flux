"use client";

import React, { useCallback } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faX,
} from "@fortawesome/free-solid-svg-icons";

const Carousel = ({ slides }: { slides: string[] }) => {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true });

  const scrollNext = useCallback(() => {
    if (embla) embla.scrollNext();
  }, [embla]);

  const scrollPrev = useCallback(() => {
    if (embla) embla.scrollPrev();
  }, [embla]);

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-full relative z-40">
        <div className="relative w-full overflow-hidden">
          <div className="w-full overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {slides.map((slide, index) => (
                <div
                  key={index}
                  className="relative flex items-center justify-center w-full p-4"
                  style={{ flex: "0 0 100%" }}
                >
                  <img
                    src={slide}
                    alt={`Slide ${index + 1}`}
                    className="rounded-lg w-[100%] h-[500px] object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
          <button
            className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 hover:bg-gray-700 focus:outline-none cursor-pointer"
            onClick={scrollPrev}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <button
            className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full w-10 h-10 hover:bg-gray-700 focus:outline-none cursor-pointer"
            onClick={scrollNext}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
