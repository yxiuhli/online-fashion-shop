"use client";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    id: 1,
    title: "New Arrival in Toys",
    description: "",
    img: "/ToysBanner.png", // Hình nền cho toàn bộ slide ToyBanner
    url: "/",
    bg: "bg-cover bg-center", // Sử dụng lớp background CSS
  },
  {
    id: 2,
    title: "Shop deals in Fashion",
    description: "Sale! Up to 50% off!",
    img: "https://images.pexels.com/photos/1021693/pexels-photo-1021693.jpeg?auto=compress&cs=tinysrgb&w=800",
    url: "/",
    bg: "bg-gradient-to-r from-pink-50 to-blue-50",
  },
  {
    id: 3,
    title: "Best Sellers in Beauty & Personal Care",
    img: "/SkinCareBanner.png",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
  {
    id: 4,
    title: "Gaming Store",
    description: "Update your gaming gear",
    img: "/GamingBanner.png",
    url: "/",
    bg: "bg-gradient-to-r from-blue-50 to-yellow-50",
  },
];

const Slider = () => {
  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      {/* SLIDE CONTAINER */}
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`w-screen h-full ${slide.bg}`}
            key={slide.id}
            style={{ backgroundImage: `url(${slide.img})`, backgroundSize: 'cover', backgroundPosition: 'center' }} // Sử dụng toàn bộ hình nền
          >
            {/* TEXT CONTAINER */}
            <div className={`h-full flex flex-col items-center justify-center text-center text-white ${slide.id === 4  || slide.id === 1 ? '' : 'bg-black bg-opacity-50'}`}>
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">
                {slide.description}
              </h2>
              <h1 className={`text-5xl lg:text-6xl 2xl:text-8xl font-semibold ${slide.id === 1 ? 'text-black' : 'text-white'}`}>
               {slide.title}
              </h1>
              <Link href={slide.url}>
                <button className="rounded-md bg-white font-bold text-black py-3 px-4 mt-4">
                  SHOP NOW
                </button>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* LEFT & RIGHT ARROW CONTROLS */}
      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer z-10">
        <RiArrowLeftSLine
          className="text-8xl text-gray-500"
          onClick={prevSlide}
        />
      </div>
      <div className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-10">
        <RiArrowRightSLine
          className="text-8xl text-gray-500"
          onClick={nextSlide}
        />
      </div>

      {/* DOTS NAVIGATION */}
      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && (
              <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
