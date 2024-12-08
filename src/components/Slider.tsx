"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { useEffect, useState } from "react";
import Image from "next/image";

type Slide = {
  id: string;
  img: string;
  url: string;
};

const Slider = ({ files }: { files: any[] }) => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);

  // Chuyển đổi dữ liệu `files` thành dữ liệu `slides`
  useEffect(() => {
    const mappedSlides = files.map((file) => ({
      id: file._id || "unknown-id",
      img: file.url || "",
      url: "/", // URL mặc định
    }));
    setSlides(mappedSlides);
  }, [files]);

  // Hàm chuyển slide kế tiếp
  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Hàm quay về slide trước
  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Tự động chuyển slide mỗi 5 giây
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);

    return () => clearInterval(interval);
  }, [slides]);

  // Hiển thị Loading nếu chưa có slide
  if (slides.length === 0) return <p>Loading ...</p>;

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div
            className="relative w-screen h-full"
            key={slide.id}
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Image
              src={slide.img}
              alt={`Slide ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </div>
        ))}
      </div>

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
    </div>
  );
};

export default Slider;
