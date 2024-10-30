import React from "react";
import Image from "next/image";
import { useCartStore } from "@/hooks/useCartStore";
import { media as wixMedia } from "@wix/sdk";
import { useWixClient } from "@/hooks/useWixClient";
import Link from "next/link";

const CartItem = (props: any) => {
  const { item } = props;
  const wixClient = useWixClient();
  const { isLoading, removeItem } = useCartStore();
  return (
    <div className="flex gap-4 items-center" key={item._id}>
      {item.image && (
        <Image
          src={wixMedia.getScaledToFillImageUrl(item.image, 72, 72, {})}
          alt=""
          width={72}
          height={72}
          className="object-cover rounded-md"
        />
      )}

      {/* TOP */}
      <div className="w-full">
        {/* TITLE */}
        <div className="flex justify-between gap-8">
          <Link href={item.url} className="font-semibold">
            {item.productName?.original}
          </Link>
          <span className="text-gray-500">Added quantity: {item.quantity}</span>
          
          <div className="flex justify-between text-sm">
            <button
              className="text-red-500 flex"
              style={{ cursor: isLoading ? "not-allowed" : "pointer" }}
              onClick={() => removeItem(wixClient, item._id!)}
            >
              <Image src="/trash.png" alt="Remove" width={26} height={20} />
            </button>
          </div>
          <div className="p-1 bg-gray-50 rounded-sm flex items-center gap-2">
            ${item.price?.amount * item.quantity}
          </div>
        </div>
      </div>
      {/* BOTTOM */}
    </div>
  );
};

export default CartItem;
