"use client";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

// Định nghĩa kiểu dữ liệu cho mỗi slide
type Slide = {
  id: number;
  title: string;
  description?: string;
  img: string;
  url: string;
  bg: string;
};

const Slider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);

  // Gọi API để lấy dữ liệu slide
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await axios.get("https://025f017a-81ec-41f8-86a2-c4cd3905a15a.mock.pstmn.io"); // Thay URL với URL của Mock Server
        setSlides(response.data);
      } catch (error) {
        console.error("Error fetching slides:", error);
      }
    };

    fetchSlides();
  }, []);

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
  }, [slides]);

  if (slides.length === 0) return <p>Loading slides...</p>;

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide) => (
          <div
            className={`w-screen h-full ${slide.bg}`}
            key={slide.id}
            style={{
              backgroundImage: `url(${slide.img})`,
              backgroundSize: "cover",
              backgroundPosition: "center"
            }}
          >
            <div className={`h-full flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50` }>
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.description}</h2>
              <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold text-white">
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

      <div className="absolute top-1/2 left-3 transform -translate-y-1/2 cursor-pointer z-10">
        <RiArrowLeftSLine className="text-8xl text-gray-500" onClick={prevSlide} />
      </div>
      <div className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer z-10">
        <RiArrowRightSLine className="text-8xl text-gray-500" onClick={nextSlide} />
      </div>

      <div className="absolute m-auto left-1/2 bottom-8 flex gap-4">
        {slides.map((slide, index) => (
          <div
            className={`w-3 h-3 rounded-full ring-1 ring-gray-600 cursor-pointer flex items-center justify-center ${
              current === index ? "scale-150" : ""
            }`}
            key={slide.id}
            onClick={() => setCurrent(index)}
          >
            {current === index && <div className="w-[6px] h-[6px] bg-gray-600 rounded-full"></div>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
