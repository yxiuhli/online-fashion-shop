"use client";

import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import { useEffect, useState } from "react";
import Image from "next/image";
import { wixClientServer } from "@/lib/wixClientServer";

type Slide = {
  id: string;
  title: string;
  img: string;
  url: string;
  bg: string;
};

const getFolders = async (): Promise<string | null> => {
  try {
    const wixClient = await wixClientServer();
    if (!wixClient) throw new Error("Không thể tạo Wix Client.");

    const response = await wixClient.folders.listFolders({
      parentFolderId: "media-root",
      paging: {
        limit: 50,
      },
    });

    if (!response.folders || response.folders.length === 0) {
      console.warn("Không có thư mục nào trong Media Manager.");
      return null;
    }

    const quangCaoFolder = response.folders.find(
      (folder) => folder.displayName === "QuangCao"
    );

    return quangCaoFolder?._id || null;
  } catch (error) {
    console.error("Lỗi khi lấy danh sách thư mục:", error);
    return null;
  }
};

const getMediaFiles = async (): Promise<Slide[]> => {
  try {
    const folderId = await getFolders(); 

    if (!folderId) {
      throw new Error("Không tìm thấy thư mục 'QuangCao'");
    }

    const wixClient = await wixClientServer(); 

    if (!wixClient) {
      throw new Error("Không thể tạo Wix Client. Vui lòng kiểm tra cấu hình.");
    }

    const response = await wixClient.files.listFiles({
      parentFolderId: folderId, 
      paging: {
        limit: 50, 
      },
    });

    const imageFiles = response.files?.filter(
      (file) =>
        file.mediaType === "IMAGE" || file.url?.endsWith(".jpg") || file.url?.endsWith(".png")
    );

    if (!imageFiles || imageFiles.length === 0) {
      console.warn("Không tìm thấy hình ảnh nào trong thư mục 'QuangCao'.");
      return [];
    }

    return imageFiles.map((file) => ({
      id: file._id || "unknown-id",
      title: file.displayName || "Untitled",
      img: file.url || "",
      url: "/", 
      bg: "bg-gray-800", 
    }));
  } catch (error) {
    console.error("Error fetching media files:", error);
    return [];
  }
};

const Slider = () => {
  const [slides, setSlides] = useState<Slide[]>([]);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const fetchSlides = async () => {
      const mediaSlides = await getMediaFiles();
      setSlides(mediaSlides);
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

  if (slides.length === 0) return <p>Loading ...</p>;

  return (
    <div className="relative h-[calc(100vh-80px)] overflow-hidden">
      <div
        className="w-max h-full flex transition-all ease-in-out duration-1000"
        style={{ transform: `translateX(-${current * 100}vw)` }}
      >
        {slides.map((slide, index) => (
          <div
            className={`relative w-screen h-full ${slide.bg}`}
            key={slide.id}
            style={{
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <Image
              src={slide.img}
              alt={slide.title}
              layout="fill"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white bg-black bg-opacity-50">
              <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{slide.title}</h2>
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
    </div>
  );
};

export default Slider;
