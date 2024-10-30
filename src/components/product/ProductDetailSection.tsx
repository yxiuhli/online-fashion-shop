"use client";
import { MutableRefObject, useRef, useState } from "react";

import { Suspense } from "react";
import { Badge, Descriptions, Button, Menu } from "antd";
import type { MenuProps } from "antd";

import Reviews from "@/components/Reviews";
import useVisible from "@/hooks/useVisible";
import PinnedProduct from "./PinnedProduct";

type MenuItem = Required<MenuProps>["items"][number];

const items: MenuItem[] = [
  {
    label: "User reviews",
    key: "reviews",
  },
  {
    label: "Detail parameters",
    key: "parameters",
  },
  {
    label: "Product description",
    key: "description",
  },
];

const ProductDetailSection = ({ product }: { product: any }) => {
  const stepperRef = useRef(null);
  const reviewRef = useRef(null);
  const paramsRef = useRef(null);
  const descriptionRef = useRef(null);
  const isVisible = useVisible(stepperRef);
  const executeScroll = (ref: MutableRefObject<any>) => {
    if(ref.current){
    ref.current.scrollIntoView({
      behavior: "smooth",
      inline: "start"
    });}
  }

  const parameterItems = product?.additionalInfoSections?.map((item: any) => ({
    key: item.title,
    label: item.title,
    children: item.description,
  }));
  return (
    <div className="w-3/5 flex flex-col relative">
      <div className="flex flex-col" ref={stepperRef}>
        <div className="flex gap-4">
          <button onClick={() => executeScroll(reviewRef)}>User reviews</button>
          <button onClick={() => executeScroll(paramsRef)}>Detail parameters</button>
          <button onClick={() => executeScroll(descriptionRef)}>Product description</button>
        </div>
      </div>
      {/* <PinnedProduct display={isVisible}/> */}
      <h1 ref={reviewRef} className="text-2xl pt-2 pb-6">User Reviews</h1>
      <Suspense fallback="Loading...">
        <Reviews productId={product._id!} />
      </Suspense>
      <h1 ref={paramsRef} className="text-2xl pt-2 pb-6">Detail parameters</h1>
      <Descriptions bordered items={parameterItems} />
      <h1 ref={descriptionRef} className="text-2xl pt-8 pb-6" >Product description</h1>
      {product.description}
    </div>
  );
};

export default ProductDetailSection;
