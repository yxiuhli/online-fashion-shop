"use client"
import { Card } from "antd";
import RatingInfo from "@/components/feedback/RatingInfo";
import Image from "next/image";
import FavoriteButton from "../FavoriteButton";

const FavoriteProductCard = ({ product }: { product: any }) => {
  return (
    <>
      <Card className="w-[21rem] drop-shadow-md">
        <div className="w-full flex flex-col gap-2 font-[Monaco]">
          <div className="flex gap-6">
            <div className="h-32">
              <Image
                src={product.media?.items[0].image?.url}
                alt=""
                height={1280}
                width={1280}
                className="object-cover w-full h-full rounded-md"
              />
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="text-lg font-bold">{product.name}</h1>
              <RatingInfo productId={product._id!} mode="pinned" />

              {product.priceData?.price ===
              product.priceData?.discountedPrice ? (
                <h2 className="font-medium text-2xl ">
                  ${product.priceData?.price}
                </h2>
              ) : (
                <div className="flex items-center gap-4">
                  <h3 className="text-xl text-gray-500 line-through">
                    ${product.priceData?.price}
                  </h3>
                  <h2 className="font-medium text-2xl">
                    ${product.priceData?.discountedPrice}
                  </h2>
                </div>
              )}
            </div>
          </div>
          <div className=" flex-col flex gap-2">
            <h2 className="font-semibold">Description</h2>
            <p className="min-h-[136px] overflow-hidden line-clamp-6">
              {product.description}
            </p>
          </div>
          <div className="flex gap-4">
            <button 
            onClick={() => window.location.href = `/${product.slug}`}
            className="w-full rounded-lg ring-1 ring-dark text-white bg-stone-900 py-2 px-4 hover:drop-shadow-lg">
              View details
            </button>
            <FavoriteButton productId={product._id}/>
          </div>
        </div>
      </Card>
    </>
  );
};

export default FavoriteProductCard;
