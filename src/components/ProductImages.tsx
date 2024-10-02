"use client";

import { Carousel } from "antd";
import Image from "next/image";
import { createRef, useRef, useState } from "react";

// const images = [
//   {
//     id: 1,
//     url: "https://images.pexels.com/photos/19036832/pexels-photo-19036832/free-photo-of-mountain-reflection-in-lake.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     id: 2,
//     url: "https://images.pexels.com/photos/17867705/pexels-photo-17867705/free-photo-of-crowd-of-hikers-on-the-mountain-ridge-at-dusk.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     id: 3,
//     url: "https://images.pexels.com/photos/21812160/pexels-photo-21812160/free-photo-of-puerta-colonial-color-rojo-de-guanajuato-mexico.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
//   {
//     id: 4,
//     url: "https://images.pexels.com/photos/20832069/pexels-photo-20832069/free-photo-of-a-narrow-street-with-buildings-and-cars.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load",
//   },
// ];

const ProductImages = ({ items }: { items: any }) => {
  const carouselRef = useRef<any>(null);


  return (
    <div className="">
      <Carousel className="h-[500px]" arrows ref={carouselRef}>
        {items.map((item: any, i: number) => (
          <div className="h-[500px]" key ={ item._id}>
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
            onClick={() =>{ carouselRef.current?.goTo(i);}}
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
