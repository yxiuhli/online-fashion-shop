"use client";

import { useCartStore } from "@/hooks/useCartStore";
import { useWixClient } from "@/hooks/useWixClient";
import { checkFavorite, setFavorite } from "@/lib/action";
import { notification } from "antd";
import Image from "next/image";
import { useEffect, useState } from "react";

const Add = ({
  productId,
  variantId,
  stockNumber,
}: {
  productId: string;
  variantId: string;
  stockNumber: number;
}) => {
  const [quantity, setQuantity] = useState(1);

  const [isFavorite, setIsFavorite] = useState(false);
  const wixClient = useWixClient();

  useEffect(() => {
    if (wixClient.auth.loggedIn()) {
      try {
        checkFavorite(productId).then((data) => {
          setIsFavorite(data);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const toggleFavorite = async () => {
    if (!wixClient.auth.loggedIn()) {
      notification.warning({message: "Please login to use this feature"});
      return;
    }
    setFavorite(productId);
    setIsFavorite(!isFavorite);
  }

  // // TEMPORARY
  // const stock = 4;

  const handleQuantity = (type: "i" | "d") => {
    if (type === "d" && quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
    if (type === "i" && quantity < stockNumber) {
      setQuantity((prev) => prev + 1);
    }
  };

  const { addItem, isLoading } = useCartStore();

  return (
    <div className="flex flex-col gap-4">
      <h4 className="font-medium">Quantity</h4>
      <div className="flex items-center gap-4 ">
        <div className="bg-gray-100 py-2 px-4 rounded-3xl flex items-center justify-between w-32">
          <button
            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
            onClick={() => handleQuantity("d")}
            disabled={quantity === 1}
          >
            -
          </button>
          {quantity}
          <button
            className="cursor-pointer text-xl disabled:cursor-not-allowed disabled:opacity-20"
            onClick={() => handleQuantity("i")}
            disabled={quantity === stockNumber}
          >
            +
          </button>
        </div>
        {stockNumber < 1 ? (
          <div className="text-sm">Product is out of stock</div>
        ) : (
          <div className="text-sm">
            Only <span className="text-orange-500">{stockNumber} items</span>{" "}
            left! Don&apos;t miss it
          </div>
        )}
      </div>
      <div className="flex justify-between gap-4 h-12 mt-4">
        <button
          onClick={() => addItem(wixClient, productId, variantId, quantity)}
          disabled={isLoading}
          className="w-full rounded-lg ring-1 ring-dark text-white bg-stone-900 py-2 px-4 hover:drop-shadow-lg disabled:cursor-not-allowed disabled:bg-gray-500 disabled:ring-0 disabled:text-white disabled:ring-none"
        >
          Add to cart
        </button>

        <Image
          src={isFavorite ? "/heart2.png" : "/heart.png"}
          alt=""
          width={20}
          height={20}
          onClick={toggleFavorite}
          className="w-12 p-4 h-full rounded-lg bg-[#f2f0ea] hover:drop-shadow-lg"
        />
      </div>
      <div className="flex gap-2">
        <Image src="/delivery.png" alt="" width={20} height={12} />
        <h6 className="text-sm">Free delivery on orders overs 30$</h6>
      </div>
    </div>
  );
};

export default Add;
