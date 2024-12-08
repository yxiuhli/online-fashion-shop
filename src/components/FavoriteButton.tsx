"use client";
import { useWixClient } from "@/hooks/useWixClient";
import { checkFavorite, setFavorite } from "@/lib/action";
import { notification } from "antd";
import Image from "next/image";
import { useState, useEffect } from "react";

const FavoriteButton = ({ productId }: { productId: string }) => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [loading, setLoading] = useState(true);

  const wixClient = useWixClient();

  useEffect(() => {
    if (wixClient.auth.loggedIn()) {
      try {
        checkFavorite(productId).then((data) => {
          setIsFavorite(data);
          setLoading(false);
        });
      } catch (err) {
        console.log(err);
      }
    }
  }, []);

  const toggleFavorite = async () => {
    if (!wixClient.auth.loggedIn()) {
      notification.warning({ message: "Please login to use this feature" });
      return;
    }
    setFavorite(productId);
    setIsFavorite(!isFavorite);
  };
  return (
    <Image
      src={isFavorite ? "/heart2.png" : "/heart.png"}
      alt=""
      width={20}
      height={20}
      onClick={!loading ? toggleFavorite : undefined} // Disable onClick if loading is true
      className={`w-12 p-4 h-full rounded-lg bg-[#f2f0ea] ${
        loading ? "opacity-50 cursor-not-allowed" : "hover:drop-shadow-lg"
      }`}
    />
  );
};

export default FavoriteButton;
