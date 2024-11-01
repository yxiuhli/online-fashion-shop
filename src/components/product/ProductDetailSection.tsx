"use client";
import { MutableRefObject, useRef, useState, useEffect } from "react";

import { Suspense } from "react";
import { Badge, Descriptions, Button } from "antd";
import type { MenuProps } from "antd";

import Reviews from "@/components/feedback/Reviews";
import PinnedProduct from "./PinnedProduct";
import Script from "next/script";

declare global {
  interface Window {
    drift: {
      openChat: () => void;
    };
  }
}

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
  const stepperRef = useRef<HTMLDivElement>(null);
  const reviewRef = useRef(null);
  const paramsRef = useRef(null);
  const descriptionRef = useRef(null);
  const [showStickyCard, setShowStickyCard] = useState(false);

  const executeScroll = (ref: MutableRefObject<any>) => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    }
  };

  const parameterItems = product?.additionalInfoSections?.map((item: any) => ({
    key: item.title,
    label: item.title,
    children: item.description,
  }));

  useEffect(() => {
    const handleScroll = () => {
      if (stepperRef.current) {
        const detailRect = stepperRef.current.getBoundingClientRect();
        setShowStickyCard(detailRect.top <= 0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Check initial position

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="w-full flex flex-col">
      <div className="flex flex-col" ref={stepperRef}>
        <div className="flex gap-4">
          <button onClick={() => executeScroll(reviewRef)}>User reviews</button>
          <button onClick={() => executeScroll(paramsRef)}>
            Detail parameters
          </button>
          <button onClick={() => executeScroll(descriptionRef)}>
            Product description
          </button>
        </div>
      </div>
      <hr />
      <div className="grid grid-cols-3 gap-16">
        <div className="col-span-2">
          <h1 ref={reviewRef} className="text-2xl pt-2 pb-6">
            User Reviews
          </h1>
          <Reviews productId={product._id!} />

          <h1 ref={paramsRef} className="text-2xl pt-2 pb-6">
            Detail parameters
          </h1>
          <Descriptions bordered items={parameterItems} />
          <h1 ref={descriptionRef} className="text-2xl pt-8 pb-6">
            Product description
          </h1>
          {product.description}
        </div>
        <div className="col-span-1">
          <PinnedProduct display={showStickyCard} product={product} />
        </div>
        <Script src="/drift.js" />
      </div>
    </div>
  );
};

export default ProductDetailSection;
