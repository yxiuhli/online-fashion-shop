"use client";
import { Carousel } from "antd";
import Image from "next/image";
import {  useRef } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const carouselRef = useRef<any>(null);

  return (
    <div className="">
      <Carousel className="h-[500px]" arrows ref={carouselRef}>
        {items.map((item: any, i: number) => (
          <div className="h-[500px]" key={item._id}>
            <Image
              src={item.image?.url}
              alt=""
              height={1280}
              width={1280}
              className="object-cover w-full h-full rounded-md"
            />
          </div>
        ))}
      </Carousel>
      <div className="flex justify-between gap-4 mt-6">
        {items.map((item: any, i: number) => (
          <div
            className="w-24 h-24 relative gap-4 cursor-pointer"
            key={item._id}
            onClick={() => {
              carouselRef.current?.goTo(i);
            }}
          >
            <Image
              src={item.image?.url}
              alt=""
              fill
              sizes="20vw"
              className="object-cover rounded-md"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
