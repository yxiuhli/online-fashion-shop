"use client";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import { Button, Carousel } from "antd";
import Image from "next/image";
import { useState } from "react";

const ProductImages = ({ items }: { items: any }) => {
  const [index, setIndex] = useState(0);
  console.log(items[0].image)

  return (
    <>
      <div className="h-[500px] w-full relative">
        <Image
          src={items[index].image?.url}
          alt=""
          fill
          sizes="50vw"
          className="object-cover rounded-md"
        />
        <LeftOutlined
          className="absolute top-1/2 left-4 hover:cursor-pointer"
          onClick={()=>{if(index>0) {setIndex(index-1)}}}
        />
        <RightOutlined
          className="absolute top-1/2 right-4 hover:cursor-pointer"
          onClick={()=>{if(index<4) {setIndex(index+1)}}}
        />
      </div>

      <div className="flex justify-between gap-4 mt-6">
        {items.map((item: any, i: number) => (
          <div
            className="w-24 h-24 relative gap-4 cursor-pointer"
            key={item._id}
            onClick={() => setIndex(i)}
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
    </>
  );
};

export default ProductImages;
