import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { BiArrowBack } from "react-icons/bi";
import Img1 from "../Components/Images/slide-1.png";
import Img2 from "../Components/Images/slide-2.png";
import Img3 from "../Components/Images/slide-3.png";
import { Link } from "react-router-dom";

const slides = [
  { src: Img1, alt: "Slide 1" },
  { src: Img2, alt: "Slide 2" },
  { src: Img3, alt: "Slide 3" },
];

export default function HeroBanner() {
  return (
    <div className="relative text-white text-[20px] w-full max-w-[1600px] mx-auto">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        showIndicators={false}
        showStatus={false}
        renderArrowPrev={(clickHandler, hasPrev) => (
          <div
            onClick={clickHandler}
            className="absolute right-[31px] md:right-[51px] bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="text-sm md:text-lg" />
          </div>
        )}
        renderArrowNext={(clickHandler, hasNext) => (
          <div
            onClick={clickHandler}
            className="absolute right-0 bottom-0 w-[30px] md:w-[50px] h-[30px] md:h-[50px] bg-black z-10 flex items-center justify-center cursor-pointer hover:opacity-90"
          >
            <BiArrowBack className="rotate-180 text-sm md:text-lg" />
          </div>
        )}
      >
        {slides.map((slide, index) => (
          <div key={index}>
            <img
              src={slide.src}
              className="h-[350px] max-h-[350px] aspect-[16/10] md:aspect-auto object-cover"
              alt={slide.alt}
            />
            <div className="px-[10px] md:px-[15px] py-[10px] md:py-[15px] font-oswald bg-white absolute bottom-[25px] md:bottom-[75px] left-0 text-black/[0.9] text-[15px] md:text-[20px] uppercase font-medium cursor-pointer hover:opacity-90">
              <Link to="/shop">Shop Now</Link>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
}
